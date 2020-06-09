class TagModel {
    
    #dbm
    
    constructor(dbm) {
        this.dbm = dbm;
    } 
    
    getConnection() {
        return this.dbm.getConnection()
    }
    
        // function to delete a tag
    deleteTag(id, callback){
        this.getConnection().then((conn) => {
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
        this.getConnection().then((conn) => {
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
        this.getConnection().then((conn) => {
            var sql = "select tag_title from tag where tag_title='"+ title +"' ;"
            conn.query(sql, (err, results, fields) => {
                console.log('dont exist');
                if (err) throw err;
                if (results < 1) {
                    console.log('try insert')
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
                            conn.release();
                        });
                    });
                } else {
                    console.log('err')
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
        this.getConnection().then((conn) => {
            if (filter == '') {
                var sql = "select tag_id, tag_title from tag;";
            } else {
                filter = '%' + filter + '%'
//                 console.log(filter)
                var sql = "select tag_id, tag_title from tag where tag_title like '" + filter + "';"
            }
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
}

module.exports = TagModel;
