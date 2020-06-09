class BatchModel {
    
    #dbm
    
    constructor(dbm) {
        this.dbm = dbm;
    } 
    
    getConnection() {
        return this.dbm.getConnection()
    }
    
    /*
     * MY SPICE
     */
    
    addMySpices(spice_id, store_id, batch_number, callback){
        this.getConnection().then((conn) => {
            var sql = "INSERT INTO batch (spice_id, store_id, batch_number, user_id) values (?, ?, ?, '1');",
                sql_data = [spice_id, store_id, batch_number];
            conn.query(sql, sql_data, (err, result, fields) => {
                console.log(result)
                var batch_id = result.insertId;
                sql = "select spice.spice_id, spice.spice_title, store.store_id, store.store_title, " +
                    "batch.batch_id, batch.batch_number from spice, store, batch " +
                    "where spice.spice_id=batch.spice_id and batch.store_id=store.store_id " +
                    "and batch.batch_id='" + batch_id + "';";
                conn.query(sql, (err, result, fields) => {
                    callback(result);
                    conn.release();
                });
            });
        })
    }
    
    getAllMySpices(callback){
        this.getConnection().then((conn) => {
            var sql = "select spice.spice_id, spice.spice_title, store.store_id, store.store_title, " +
                "batch.batch_id, batch.batch_number from spice, store, batch " +
                "where spice.spice_id=batch.spice_id and batch.store_id=store.store_id " +
                "order by spice_id;";
            conn.query(sql, (err, result, fields) => {
                callback(result);
                conn.release();
            });
        })
    }
    
    editMySpices(spice_id, store_id, batch_id, batch_number, callback){
        this.getConnection().then((conn) => {
            var sql = "UPDATE batch SET spice_id = ?, store_id = ?, batch_number = ?, user_id = '1' WHERE batch_id = ?;",
                sql_data = [spice_id, store_id, batch_number, batch_id];
            conn.query(sql, sql_data, (err, result, fields) => {
                sql = "select spice.spice_id, spice.spice_title, store.store_id, store.store_title, " +
                    "batch.batch_id, batch.batch_number from spice, store, batch " +
                    "where spice.spice_id=batch.spice_id and batch.store_id=store.store_id " +
                    "and batch.batch_id='" + batch_id + "';";
                conn.query(sql, (err, result, fields) => {
                    callback(result);
                    conn.release();
                });
            });
        })
    }
    
    deleteMySpices(batch_id, callback){
        this.getConnection().then((conn) => {
            var sql = "DELETE from batch where batch_id='" + batch_id + "';";
            conn.query(sql, (err, result, fields) => {
                callback(1);
                conn.release();
            });
        })
    }
    
}

module.exports = BatchModel;
