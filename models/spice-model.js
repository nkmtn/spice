class SpiceModel {
    
    #dbm
    
    constructor(dbm) {
        this.dbm = dbm;
    } 
    
    getConnection() {
        return this.dbm.getConnection()
    }
    
    /*
     * SPICE
     */
    
    // function to add a spice
    addSpice(title, description, brand_id, tag_ids, callback){
        this.getConnection().then((conn) => {
            console.log('--- in add')
            var spice_id = 0;
            var sql = "insert into spice (spice_title, spice_description, brand_id, user_id) values(? ,? ,? ,'1') ;"
            var sql_data = [title, description, brand_id];
            conn.query(sql, sql_data, (err, results, fields) => {
                if (err) throw err;
                spice_id = results.insertId;
                console.log(spice_id)
                console.log('--- results after insert in spice')
                console.log(results)
                if (tag_ids.length > 0) {
                    sql = "insert into spice_tag (spice_id, tag_id, user_id) values ";
                    if (tag_ids.length == 1) { 
                        sql += "('"+ spice_id + "', '" + tag_ids[0] + "', '1')"
                    } else {
                        for (var i = 0; i < tag_ids.length - 1; i++){
                            sql += "('" + spice_id + "', '" + tag_ids[i] + "', '1'),"
                        }
                        sql += "('" + spice_id + "', '"+tag_ids[tag_ids.length - 1] + "', '1')"
                    }
                    sql += ";"
                    conn.query(sql, (err, results, fields) => {
                        if (err) throw err;
                        var sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, " +
                            "brand.brand_title, spice_tag.tag_id, tag.tag_title from spice, spice_tag, tag, brand " +
                            "where spice.spice_id=spice_tag.spice_id and tag.tag_id=spice_tag.tag_id and " + 
                            "brand.brand_id=spice.brand_id and spice.spice_id='" + spice_id+ "';";
                        conn.query(sql, (err, result, fields) => {
                            var data = {
                                spice_id: result[0].spice_id,
                                spice_title: result[0].spice_title,
                                spice_description: result[0].spice_description,
                                brand_id: result[0].brand_id,
                                brand_title: result[0].brand_title,
                                tag_ids: [],
                                tag_titles: []
                            };
                            for (var i = 0; i < result.length; i++){
                                data.tag_ids.push(result[i].tag_id);
                                data.tag_titles.push(result[i].tag_title);
                            }
                            data.tag_ids = data.tag_ids.join(',');
                            data.tag_titles = data.tag_titles.join(',');
                            callback(data);
                            conn.release();
                        });
                    });
                } else {
                    console.log(spice_id)
                    var sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, " +
                        "brand.brand_title from spice, brand where brand.brand_id=spice.brand_id and spice.spice_id='" + spice_id + "';";
                    conn.query(sql, (err, result, fields) => {
                        console.log('--- result after select')
                        console.log(result)
                        var data = {
                            spice_id: result[0].spice_id,
                            spice_title: result[0].spice_title,
                            spice_description: result[0].spice_description,
                            brand_id: result[0].brand_id,
                            brand_title: result[0].brand_title,
                            tag_ids: [],
                            tag_titles: []
                        };
                        callback(data);
                        conn.release();
                    });
                }
            });
        })
    }
    
    // function for select all spice without connection releace
    selectAllSpice(result) {
        var data = []
        var current_spice = {
            spice_id: result[0].spice_id,
            spice_title: result[0].spice_title,
            spice_description: result[0].spice_description,
            brand_id: result[0].brand_id,
            brand_title: result[0].brand_title,
            tag_ids: [],
            tag_titles: []
        }
        for (var i = 0; i < result.length; i++){
            if (current_spice.spice_id === result[i].spice_id){
                current_spice.tag_ids.push(result[i].tag_id);
                current_spice.tag_titles.push(result[i].tag_title);
            } else {
                current_spice.tag_ids = current_spice.tag_ids.join(',');
                current_spice.tag_titles = current_spice.tag_titles.join(',');
                data.push(current_spice)
                current_spice = {
                    spice_id: result[i].spice_id,
                    spice_title: result[i].spice_title,
                    spice_description: result[i].spice_description,
                    brand_id: result[i].brand_id,
                    brand_title: result[i].brand_title,
                    tag_ids: [],
                    tag_titles: []
                }
                i--;
            }
        }
        current_spice.tag_ids = current_spice.tag_ids.join(',');
        current_spice.tag_titles = current_spice.tag_titles.join(',');
        data.push(current_spice)
        return data;
    }
    
    // function for select all spice
    getAllSpices(spice_title, brand_title, tag_ids, callback){
        this.getConnection().then((conn) => {
            var sql = '';
            if (spice_title == '' && brand_title == '' && tag_ids.length == 0) {
                sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, " +
                "brand.brand_title, spice_tag.tag_id, tag.tag_title from spice, spice_tag, tag, brand " +
                "where spice.spice_id=spice_tag.spice_id and tag.tag_id=spice_tag.tag_id and brand.brand_id=spice.brand_id " +
                "order by spice_id, tag_id;";
            }
            conn.query(sql, (err, result, fields) => {
                var data = this.selectAllSpice(result);
                callback(data);
                conn.release();
            });
        })
    }
    
     // function to update the spice
    editSpice(spice_id, spice_title, spice_description, brand_id, tag_ids, callback){
        this.getConnection().then((conn) => {
            var sql = "update spice set spice_title = ? , spice_description = ? , brand_id = ? where spice_id = ? ;";
            var sql_data = [spice_title, spice_description, brand_id, spice_id]
            conn.query(sql, sql_data, (err, results, fields) => {
                if (err) throw err;
                sql = "delete from spice_tag where spice_id='" + spice_id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    if (tag_ids.length > 0) {
                        sql = "insert into spice_tag (spice_id, tag_id, user_id) values ";
                        if (tag_ids.length == 1) { 
                            sql += "('"+spice_id+"', '"+tag_ids[0]+"', '1')"
                        } else {
                            for (var i = 0; i < tag_ids.length - 1; i++){
                                sql += "('"+spice_id+"', '"+tag_ids[i]+"', '1'),"
                            }
                            sql += "('"+spice_id+"', '"+tag_ids[tag_ids.length - 1]+"', '1')"
                        }
                        sql += ";"
                        console.log('--- sql update')
                        console.log(sql)
                        conn.query(sql, (err, results, fields) => {
                            console.log('---in select')
                            if (err) throw err;
                            console.log('---var sql')
                            var sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, " +
                                "brand.brand_title, spice_tag.tag_id, tag.tag_title from spice, spice_tag, tag, brand " +
                                "where spice.spice_id=spice_tag.spice_id and tag.tag_id=spice_tag.tag_id and " + 
                                "brand.brand_id=spice.brand_id and spice.spice_id='" + spice_id + "';";
                            conn.query(sql, (err, result, fields) => {
                                console.log(' --- result')
                                console.log(result)
                                var data = {
                                    spice_id: spice_id,
                                    spice_title: result[0].spice_title,
                                    spice_description: result[0].spice_description,
                                    brand_id: result[0].brand_id,
                                    brand_title: result[0].brand_title,
                                    tag_ids: [],
                                    tag_titles: []
                                };
                                for (var i = 0; i < result.length; i++){
                                    data.tag_ids.push(result[i].tag_id);
                                    data.tag_titles.push(result[i].tag_title);
                                }
                                data.tag_ids = data.tag_ids.join();
                                data.tag_titles = data.tag_titles.join();
                                callback(data);
                                conn.release();
                            });
                        });
                    } else {
                        this.getConnection().then((conn) => {
                            var sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, " +
                                    "brand.brand_title, spice_tag.tag_id, tag.tag_title from spice, spice_tag, tag, brand " +
                                    "where spice.spice_id=spice_tag.spice_id and tag.tag_id=spice_tag.tag_id and " + 
                                    "brand.brand_id=spice.brand_id and spice.spice_id='" + spice_id + "';";
                            conn.query(sql, (err, result, fields) => {
                                var data = {
                                    spice_id: result[0].spice_id,
                                    spice_title: result[0].spice_title,
                                    spice_description: result[0].spice_description,
                                    brand_id: result[0].brand_id,
                                    brand_title: result[0].brand_title,
                                    tag_ids: [],
                                    tag_titles: []
                                };
                                for (var i = 0; i < result.length; i++){
                                    data.tag_ids.push(result[i].tag_id);
                                    data.tag_titles.push(result[i].tag_title);
                                }
                                data.tag_ids = data.tag_ids.join();
                                data.tag_titles = data.tag_titles.join();
                                callback(data);
                                conn.release();
                            });
                        });
                    }
                });
            });
        })
    }
}

module.exports = SpiceModel;
 
