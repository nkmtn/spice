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
var Tag = new (require('./models/tag-model'))(myDBM);
app.use('/api/tags', require('./controllers/tag-router')(myDBM));
app.use('/api/users', require('./controllers/user-router')(myDBM));
app.use('/api/sessions', require('./controllers/session-router')(myDBM));

app.use('/api/brands', require('./controllers/brand-router')(myDBM));
app.use('/api/stores', require('./controllers/store-router')(myDBM));
app.use('/api/spices', require('./controllers/spice-router')(myDBM));
app.use('/api/myspices', require('./controllers/myspice-router')(myDBM));


//Port whitch is used
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;

