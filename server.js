/*
    server.js - main file. Server part and router here for now.
    Used node.js with express.
*/

var express = require('express');
var app = express();

var myDBM = require('./databaseManager.js');   // модуль работы с базой даннных
var myHtml = require('./make_html.js'); // модуль работы с html

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files

// Request for showing all the records
app.get('/', function (req, res) {
    myDBM.selectAllSpice((result) => {
        res.send(myHtml.showAllSpice(result));
    });
});

// Request to visit the page for adding a new record
app.get('/add_new', function (req, res) {
    res.send(myHtml.makeForm());
});

// Request to visit the page for delete the record
app.get('/delete_for_id', function (req, res) {
    res.send(myHtml.deleteForId());
});

// Request to visit the page for edit the record
app.get('/edit_for_id', function (req, res) {
    res.send(myHtml.editForId());
});

// Request for delete the record of database
app.post('/edit', function(req, res) {
    var spice_id = req.body.spice_id;
    myDBM.selectForId(spice_id, (result) => {
        res.send(myHtml.showWithData(result));
    });
});

// Request for delete the record of database
app.post('/delete', function(req, res) {
    var spice_id = req.body.spice_id;
    myDBM.deleteSpice(spice_id);
    myDBM.selectAllSpice((result) => {
        res.send(myHtml.showAllSpice(result));
    });
});

// Request for adding the record in database
app.post('/', function(req, res) {
    var title = req.body.title,
        sum = isNaN(parseInt(req.body.sum)) ? 0 : parseInt(req.body.sum),
        loc = req.body.location;
    myDBM.addNewSpice(title, sum, loc);
    res.send(myHtml.makeForm());
});

// Port vhat used
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


