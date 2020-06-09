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
            database : 'spice',
            connectionLimit: 50
        });
    }

    getConnection = () => {
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
}

module.exports = new DatabaseManager(); // singletone object
