const dbm = require('../databaseManager.js')
const TagModel = require('../models/tag-model.js')
const mysql = require('mysql')
const Importer = require('mysql-import');
const path = require('path');

beforeAll( () => {
    require('dotenv').config({
        path: path.join(__dirname, '.env.' + process.env.NODE_ENV)
    });
})

beforeEach( async (done) =>{
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

    importer.import('./tests/dump_spice.sql').then(()=>{
        // var files_imported = importer.getImported();
        // console.log('${files_imported.length} SQL file(s) imported.');
        importer.disconnect();
        done();
    }).catch(err=>{
        // console.error(err);
    });
})

afterEach( async (done) =>{
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
        // var files_imported = importer.getImported();
        // console.log('${files_imported.length} SQL file(s) imported.');
        importer.disconnect();
        done();
    }).catch(err=>{
        // console.error(err);
    });
})

// test('Require databaseManager results in object that provides getConnection method', () => {
//     const tagModel = new TagModel(dbm);
//     expect(tagModel.getAllTags('')).toHaveProperty('getConnection')
//     expect(dbm.getConnection).toBeInstanceOf(Function)
// })

test.only('Get all tags', done => {
    function callback(data) {
        try {
            expect(data.length).toBe(8);
            done();
        } catch (error) {
            done(error);
        }
    }

    const tagModel = new TagModel(dbm);
    tagModel.getAllTags('',callback);
});

test.only('Edit a tag', done => {
    function callback(data) {
        try {
            expect(data.tag_id).toBe(6);
            done();
        } catch (error) {
            done(error);
        }
    }

    const tagModel = new TagModel(dbm);
    tagModel.editTag('6', 'ufufuf',callback);
});

test.only('Add tag', done => {
    function callback(data) {
        try {
            expect(data.res.tag_title).toBe('newTestTag');
            expect(data.res.tag_id).toBe(19);
            expect(data.status).toBe(200);
            done();
        } catch (error) {
            done(error);
        }
    }

    const tagModel = new TagModel(dbm);
    tagModel.addTag('newTestTag',callback);
});

