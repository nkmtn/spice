/*
    databaseManager - module for control databases connection
 */

const path = require('path');
var mysql = require('mysql');

class DatabaseManager {

    #pool;

    // Config for databases manage
    constructor() {
        require('dotenv').config({
            path: path.join(__dirname, '.env.' + process.env.NODE_ENV)
        });

        this.#pool  = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
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
