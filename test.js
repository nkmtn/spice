var express = require('express');
var app = express();
var myDBM = require('./database_manager.js');
var myHtml = require('./make_html.js');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files

app.get('/', function (req, res) {
    myDBM.selectAllSpice((result) => {
        res.send(myHtml.showAllSpice(result));
    });
});

app.get('/add_new', function (req, res) {
    res.send(myHtml.makeForm());
});

app.get('/delete_for_id', function (req, res) {
    res.send(myHtml.deleteForId());
});

app.post('/delete', function(req, res) {
    var spice_id = req.body.spice_id;
    myDBM.deleteSpice(spice_id);
    myDBM.selectAllSpice((result) => {
        res.send(myHtml.showAllSpice(result));
    });
});

app.post('/', function(req, res) {
    var title = req.body.title,
        sum = req.body.sum,
        loc = req.body.location;
    myDBM.addNewSpice(title, sum, loc);
    res.send(myHtml.makeForm());
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


