/*
    server.js - main file. Server part and router here for now.
    Used node.js with express.
*/

var express = require('express');
var app = express();

var myDBM = require('./databaseManager.js');   // модуль работы с базой даннных

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files

// Request for showing all the records
// app.get('/', function (req, res) {
//     res.sendFile('public/index.html');
// });

// var tagroutes = require('./controllers/tag')(myDBM);
var tagModel = new (require('./models/tag-model'))(myDBM);
var brandModel = new (require('./models/brand-model'))(myDBM);
var storeModel = new (require('./models/store-model'))(myDBM);
var spiceModel = new (require('./models/spice-model'))(myDBM);
var batchModel = new (require('./models/batch-model'))(myDBM);

app.use('/api/tags', require('./controllers/tag-router')(tagModel));
app.use('/api/users', require('./controllers/user-router')(myDBM));
app.use('/api/sessions', require('./controllers/session-router')(myDBM));

app.use('/api/brands', require('./controllers/brand-router')(brandModel));
app.use('/api/stores', require('./controllers/store-router')(storeModel));
app.use('/api/spices', require('./controllers/spice-router')(spiceModel));
app.use('/api/batches', require('./controllers/batch-router')(batchModel));


//Port whitch is used
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// module.exports = app;

