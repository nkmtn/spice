var mysql = require('mysql');

class DatabaseManager {

    #pool;

    constructor() {
        /*TODO config*/
        this.#pool  = mysql.createPool({
            host     : 'localhost',
            user     : 'user',
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
}

module.exports = new DatabaseManager();
