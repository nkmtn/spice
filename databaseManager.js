/*
    databaseManager - module for control databases connection
 */

var mysql = require('mysql');

class DatabaseManager {

    #pool;

    // Config for databases manage
    constructor() {
        /*TODO config*/
        this.#pool  = mysql.createPool({
            host     : 'localhost',
            user     : 'spice-user',
            password : '12345',
            database : 'spice'
        });
    }

    #getConnection = () => {
        return new Promise((resolve, reject) => {
            this.#pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    
    /*
     * TAG
     */ 
    
    // function to delete a tag
    deleteTag(id, callback){
        this.#getConnection().then((conn) => {
            var sql = "delete from spice_tag where tag_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                var sql = "delete from tag where tag_id='"+ id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    callback(1);
                    conn.release();
                });
            });
        })
    }
    
    // function to update a tag
    editTag(id, title, callback){
        this.#getConnection().then((conn) => {
            var sql = "update tag set tag_title='" + title + "' where tag_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select tag_id, tag_title from tag where tag_id='" + id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        tag_id: results[0].tag_id,
                        tag_title: results[0].tag_title
                    }
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    // function to add a tag
    addTag(title, callback){
        this.#getConnection().then((conn) => {
            var sql = "select tag_title from tag where tag_title='"+ title +"' ;"
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                if (results < 0) {
                    var sql = "insert into tag (tag_title, user_id) values('"+ title +"' , '1') ;"
                    conn.query(sql, (err, results, fields) => {
                        if (err) throw err;
                        sql = "select tag_id, tag_title from tag where tag_id='" + results.insertId + "';"
                        conn.query(sql, (err, results, fields) => {
                            if (err) throw err;
                            var data = {
                                status: 200,
                                res: {
                                    tag_id: results[0].tag_id,
                                    tag_title: results[0].tag_title
                                }
                            }
                            callback(data);
                            console.log("select: ok");
                            conn.release();
                        });
                    });
                } else {
                    var data = {
                        status: 400,
                        res: 1
                    }
                    callback(data);
                }
            });
        })
    }

    // function for select all tags
    getAllTags(filter, callback){
        this.#getConnection().then((conn) => {
            if (filter == '') {
                var sql = "select tag_id, tag_title from tag;";
            } else {
                filter = '%' + filter + '%'
                console.log(filter)
                var sql = "select tag_id, tag_title from tag where tag_title like '" + filter + "';"
            }
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                console.log(results)
                callback(results);
                console.log("select: ok");
                conn.release();
            });
        })
    }
    
    /*
     * BRAND
     */
    
    // function for select all brands
    getAllBrands(title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = '';
            if (title == '' && description == '') {
                sql = "select brand_id, brand_title, brand_description from brand;";
            } else if (title !== '' && description == '') {
                sql = "select brand_id, brand_title, brand_description from brand where brand_title like '%"+ title +"%';";
            } else if (title == '' && description !== '') {
                sql = "select brand_id, brand_title, brand_description from brand where brand_description like '%"+ description +"%';";
            } else {
                var sql = "select brand_id, brand_title, brand_description from brand where brand_title like '%"+ title +"%' and brand_description like '%"+ description +"%';";
            }
            console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
    
    // function to delete a brand
    deleteBrand(id, callback){
        this.#getConnection().then((conn) => {
            var sql = "update batch set brand_id='NULL' where brand_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                var sql = "delete from brand where brand_id='"+ id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    callback(1);
                    conn.release();
                });
            });
        })
    }
    
    // function to add a brand
    addBrand(title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = "insert into brand (brand_title, brand_description, user_id) values('"+ title +"' ,'"+ description +"' ,'1') ;"
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select brand_id, brand_title, brand_description from brand where brand_id='" + results.insertId + "';"
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        brand_id: results[0].brand_id,
                        brand_title: results[0].brand_title,
                        brand_description: results[0].brand_description
                    }
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    // function to update a brand
    editBrand(id, title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = "update brand set brand_title='" + title + "', brand_description='" + description + "' where brand_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select brand_id, brand_title, brand_description from brand where brand_id='" + id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        brand_id: results[0].brand_id,
                        brand_title: results[0].brand_title,
                        brand_description: results[0].brand_description
                    }
                    console.log(data)
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    /*
     * STORE
     */
    
    // function for select all stores
    getAllStores(title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = '';
            if (title == '' && description == '') {
                sql = "select store_id, store_title, store_description from store;";
            } else if (title !== '' && description == '') {
                sql = "select store_id, store_title, store_description from store where store_title like '%"+ title +"%';";
            } else if (title == '' && description !== '') {
                sql = "select store_id, store_title, store_description from store where store_description like '%"+ description +"%';";
            } else {
                var sql = "select store_id, store_title, store_description from store where store_title like '%"+ title +"%' and store_description like '%"+ description +"%';";
            }
            console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
    
    // function to delete a store
    deleteStore(id, callback){
        this.#getConnection().then((conn) => {
            var sql = "select store_id from batch where store_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                var data = {
                    status: 200,
                    res: 1
                }
                if (result > 0){
                    data.status = 400;
                } else {
                    if (err) throw err;
                    var sql = "delete from store where store_id='"+ id +"';";
                    conn.query(sql, (err, results, fields) => {
                        if (err) throw err;
                        callback(data);
                        conn.release();
                    });
                }
            });
        })
    }
    
    // function to add a store
    addStore(title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = "insert into store (store_title, store_description, user_id) values('"+ title +"' ,'"+ description +"' ,'1') ;"
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select store_id, store_title, store_description from store where brand_id='" + results.insertId + "';"
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        store_id: results[0].store_id,
                        store_title: results[0].store_title,
                        store_description: results[0].store_description
                    }
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    // function to update a store
    editStore(id, title, description, callback){
        this.#getConnection().then((conn) => {
            var sql = "update store set store_title='" + title + "', store_description='" + description + "' where store_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select store_id, store_title, store_description from store where store_id='" + id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        store_id: results[0].store_id,
                        store_title: results[0].store_title,
                        store_description: results[0].store_description
                    }
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    /*
     * SPICE
     */
    
    // function for select all spice
    getAllSpices(spice_title, brand_title, tag_ids, callback){
        this.#getConnection().then((conn) => {
            var data = {
                spices: []
            }
            var sql = '';
            if (spice_title == '' && brand_title == '' && tag_ids.length == 0) {
                sql = "select spice.spice_id, spice.spice_title, spice.spice_description, brand.brand_id, brand.brand_title, spice_tag.tag_id, tag.tag_title from spice, spice_tag, tag, brand where spice.spice_id=spice_tag.spice_id and tag.tag_id=spice_tag.tag_id and brand.brand_id=spice.brand_id order by spice_id, tag_id;";
            }
            console.log(sql)
            conn.query(sql, (err, result, fields) => {
                if (err) throw err;
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
                        console.log(current_spice.tag_ids, current_spice.spice_id)
                    } else {
                        current_spice.tag_ids = current_spice.tag_ids.join();
                        current_spice.tag_titles = current_spice.tag_titles.join();
                        data.spices.push(current_spice)
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
                console.log(data.spices[1])
                callback(data.spices);
                conn.release();
            });
        })
    }
    
     // function to update a store
    editSpice(spice_id, spice_title, spice_description, brand_id, tag_ids, callback){
        this.#getConnection().then((conn) => {
            var data = {}
            var spice_title = '';
            var brand_title = '';
            var tag_ids = [];
            var sql = "update spice set spice_title='" + spice_title + "', spice_description='" + spice_description + "', brand_id='" + brand_id + "' where spice_id='"+ spice_id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "delete from spice_tag where spice_id='" + spice_id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    if (tag_ids.length > 0) {
                        sql = "insert into space_tag (space_id, tag_id, user_id) values ";
                        for (var i = 0; i < tag_ids.length; i++){
                            sql += "('"+space_id+"', '"+tag_ids[i]+"', '1')"
                        }
                        sql += ";"
                        conn.query(sql, (err, results, fields) => {
                            if (err) throw err;
                            getAllSpices(spice_title, brand_title, tag_ids, (result) => {
                                console.log(result)
                                for(var j = 0; j < result.length; j++){
                                    data.push(result[j])
                                }
                            });
                            callback(data);
                            conn.release();
                            
                        });
                    } else {
                        getAllSpices(spice_title, brand_title, tag_ids, (result) => {
                            console.log(result)
                            for(var j = 0; j < result.length; j++){
                                data.push(result[j])
                            }
                        });
                        callback(data);
                        conn.release();
                    }
                });
            });
        })
    }
    /*
     * MY SPICE
     */
    
    // function for select all stores
    getAllMySpices(callback){
        this.#getConnection().then((conn) => {
            var sql = "select spice.spice_id, spice.spice_title, batch.batch_id, store.store_id, store.store_title, batch.batch_number from spice, batch, store where spice.spice_id=batch.spice_id and store.store_id=batch.store_id;";
            console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
    
    /*
    // function for select all the records of databases
    selectAllSpice(callback){
        this.#getConnection().then((conn) => {
            var sql = "select * from spiceinfo;";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                console.log("select: ok");
                conn.release();
            });
        })
    }

    // function for adding a new record in databases
    addNewSpice(title, count, loc){
        this.#getConnection().then((conn) => {
            var sql = "insert into spiceinfo (title, sum, location)" +
                "values ('" + title + "'," + count + ",'" + loc + "');";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                console.log("insert: ok");
                conn.release();
            });
        })
    }

    // function for delete the record of databases
    deleteSpice(spice_id){
        this.#getConnection().then((conn) => {
            var sql = "delete from spiceinfo where spice_id=" + spice_id + ";";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows === 0)
                    console.log("don't deleted!")
                else
                    console.log("delete: ok");
                conn.release();
            });
        })
    }

    selectForId(spice_id, callback){
        this.#getConnection().then((conn) => {
            var sql = "select title, sum, location from spiceinfo where spice_id="+ spice_id +";";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                console.log("select: ok");
                conn.release();
            });
        })
    }
    */
}

module.exports = new DatabaseManager(); // singltone object
