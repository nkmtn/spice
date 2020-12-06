const dbm = require('../databaseManager.js')
const mysql = require('mysql')
const Importer = require('mysql-import');
const path = require('path');

beforeEach( () =>{

    require('dotenv').config({
        path: path.join(__dirname, '.env.' + process.env.NODE_ENV)
    });

    // const host = process.env.DB_HOST;
    // const user = process.env.DB_USER;
    // const password = process.env.DB_PASSWORD;
    // const database = process.env.DB_NAME;

    const host='localhost';
    const user='spice_user';
    const password='12345';
    const database='spice_test';

    // const Importer = require('../mysql-import.js');
    const importer = new Importer({host, user, password, database});

    console.log(host, user, password, database);

    importer.import('./tests/dump_spice.sql').then(()=>{
        var files_imported = importer.getImported();
        // console.log('${files_imported.length} SQL file(s) imported.');
    }).catch(err=>{
        // console.error(err);
    });
})

afterEach( () =>{

    require('dotenv').config({
        path: path.join(__dirname, '.env.' + process.env.NODE_ENV)
    });

    // const host = process.env.DB_HOST;
    // const user = process.env.DB_USER;
    // const password = process.env.DB_PASSWORD;
    // const database = process.env.DB_NAME;

    const host='localhost';
    const user='spice_user';
    const password='12345';
    const database='spice_test';

    // const Importer = require('../mysql-import.js');
    const importer = new Importer({host, user, password, database});

    // console.log(host, user, password, database);

    importer.import('./tests/drop_spice.sql').then(()=>{
        var files_imported = importer.getImported();
        // console.log('${files_imported.length} SQL file(s) imported.');
    }).catch(err=>{
        // console.error(err);
    });
})

test('Require databaseManager results in object that provides getConnection method', () => {
    expect(dbm).toHaveProperty('getConnection')
    expect(dbm.getConnection).toBeInstanceOf(Function)
})

// test('Database manager should provide database connection', () => {
//     return dbm.getConnection().resolves.connect()
//     //console.log(data)
//     //expect(fetchData()).resolves.toBe('peanut butter');
//     //expect(data).toBeInstanceOf(mysql.PoolConnection);
//     //done();
//     //});
// });