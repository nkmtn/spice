class StoreModel {
    
    #dbm
    
    constructor(dbm) {
        this.dbm = dbm;
    } 
    
    getConnection() {
        return this.dbm.getConnection()
    }
    
    /*
     * STORE
     */
    
    // function for select all stores
    getAllStores(title, description, callback){
        this.getConnection().then((conn) => {
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
//             console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
    
    // function to delete a store
    deleteStore(id, callback){
        this.getConnection().then((conn) => {
            var sql = "select store_id from batch where store_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                var data = {
                    status: 200,
                    res: 1
                }
                if (results.length > 0){
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
        this.getConnection().then((conn) => {
            var sql = "insert into store (store_title, store_description, user_id) values('"+ title +"' ,'"+ description +"' ,'1') ;"
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select store_id, store_title, store_description from store where store_id='" + results.insertId + "';"
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
    
    // function to update the store
    editStore(id, title, description, callback){
        this.getConnection().then((conn) => {
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
}

module.exports = StoreModel;
 
