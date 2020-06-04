/*
    server.js - main file. Server part and router here for now.
    Used node.js with express.
*/

var express = require('express');
var app = express();

var myDBM = require('./databaseManager.js');   // модуль работы с базой даннных
//var myHtml = require('./make_html.js'); // модуль работы с html

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files

// Request for showing all the records
app.get('/', function (req, res) {
    res.sendFile('public/index.html');
});

/*
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
*/

/*
 * TAGS
 */

// request all tags
app.get('/api/tags', function (req, res) {
    var data = []
    if (req.query.tag_title !== undefined){
        var filter = req.query.tag_title;
    } else {
        var filter = '';
    }
    myDBM.getAllTags(filter, (result) => {
        if (result.length > 0) {
            for(var j = 0; j < result.length; j++){
                data.push(result[j])
            }
            res.json(data)
        } else {
            res.send('dont have any tags');
        }
    });
});

// Request for delete the tag
app.delete('/api/tags', function(req, res) {
    console.log(req.body)
    if (req.body.tag_id !== undefined){
        var id = req.body.tag_id;
        myDBM.deleteTag(id, (result) => {
            res.json(result)
        });
    } else {
        res.end('dont have a title or a id');
    }
});

// Request for update the tag
app.put('/api/tags', function(req, res) {
    console.log(req.body)
    if (req.body.tag_title !== undefined || req.body.tag_id !== undefined){
        var title = req.body.tag_title;
        var id = req.body.tag_id;
        myDBM.editTag(id, title, (result) => {
            res.json(result)
        });
    } else {
        res.end('dont have a title or a id');
    }
});

// Request for adding the tag
app.post('/api/tags', function(req, res) {
    console.log(req.body)
    if (req.body.tag_title !== undefined){
        var title = req.body.tag_title;
        myDBM.addTag(title, (result) => {
            res.status(result.status);
            res.json(result.res);
        });
    } else {
        res.send('dont have a title');
    }
});

/*
 * BRANDS
 */

// request all brands
app.get('/api/brands', function (req, res) {
    var data = []
    if (req.query.brand_title !== undefined){
        var title = req.query.brand_title;
    } else {
        var title = '';
    } 
    if(req.query.brand_desciption !== undefined){
        var description = req.query.brand_desciption;
    } else {
        var description = '';
    }
    myDBM.getAllBrands(title, description, (result) => {
        console.log(result)
        if (result.length > 0) {
            for(var j = 0; j < result.length; j++){
                data.push(result[j])
            }
            res.json(data)
        } else {
            res.send('dont have any brandss');
        }
    });
});

// Request for adding the brand
app.post('/api/brands', function(req, res) {
    console.log(req.body)
    if (req.body.brand_title !== undefined){
        var title = req.body.brand_title;
        if (req.body.brand_description !== undefined){
            var description = req.body.brand_description;
        } else {
            var description = '';
        }
        myDBM.addBrand(title, description, (result) => {
            res.json(result);
        });
    } else {
        res.send('dont have a title');
    }
});

// Request for delete the brand
app.delete('/api/brands', function(req, res) {
    console.log(req.body)
    if (req.body.brand_id !== undefined){
        var id = req.body.brand_id;
        myDBM.deleteBrand(id, (result) => {
            res.json(result)
        });
    } else {
        res.end('dont have an id');
    }
});

// Request for update the brand
app.put('/api/brands', function(req, res) {
    console.log(req.body)
    if (req.body.brand_title !== undefined && req.body.brand_id !== undefined){
        var title = req.body.brand_title;
        var id = req.body.brand_id;
        if (req.body.brand_description !== undefined){
            var description = req.body.brand_description;
        } else {
            var description = '';
        }
        myDBM.editBrand(id, title, description, (result) => {
            res.json(result)
        });
    } else {
        res.end('dont have a title or a id');
    }
});


/*
 * STORE
 */

// request all brands
app.get('/api/stores', function (req, res) {
    var data = []
    if (req.query.store_title !== undefined){
        var title = req.query.store_title;
    } else {
        var title = '';
    } 
    if(req.query.store_desciption !== undefined){
        var description = req.query.store_desciption;
    } else {
        var description = '';
    }
    myDBM.getAllStores(title, description, (result) => {
        console.log(result)
        if (result.length > 0) {
            for(var j = 0; j < result.length; j++){
                data.push(result[j])
            }
            res.json(data)
        } else {
            res.send('dont have any stores');
        }
    });
});


// Request for adding the store
app.post('/api/stores', function(req, res) {
    console.log(req.body)
    if (req.body.store_title !== undefined){
        var title = req.body.store_title;
        if (req.body.store_desciption !== undefined){
            var description = req.body.store_desciption;
        } else {
            var description = '';
        }
        myDBM.addStore(title, description, (result) => {
            res.json(result);
        });
    } else {
        res.send('dont have a title');
    }
});

// Request for delete the store
app.delete('/api/stores', function(req, res) {
    console.log(req.body)
    if (req.body.store_id !== undefined){
        var id = req.body.store_id;
        myDBM.deleteStore(id, (result) => {
            res.status(result.status);
            res.json(result.res);
        });
    } else {
        res.end('dont have an id');
    }
});

// Request for update the store
app.put('/api/stores', function(req, res) {
    console.log(req.body)
    if (req.body.store_title !== undefined && req.store.brand_id !== undefined){
        var title = req.body.store_title;
        var id = req.body.store_id;
        if (req.body.store_desciption !== undefined){
            var description = req.body.store_desciption;
        } else {
            var description = '';
        }
        myDBM.editStore(id, title, description, (result) => {
            res.json(result)
        });
    } else {
        res.end('dont have a title or a id');
    }
});

/*
 * SPICE
 */

// Request for update the store
app.put('/api/spices', function(req, res) {
    console.log(req.body)
    var spice_id = req.body.spice_id;
    var spice_title = req.body.spice_title;
    var spice_description = req.body.spice_description;
    var brand_id = req.body.brand_id;
    var tag_ids = []
    req.body.tag_ids.split(tag_ids, ',');
    console.log(tag_ids)
    
    myDBM.editSpice(spice_id, spice_title, spice_description, brand_id, tag_ids, (result) => {
        res.json(result)
    });
});

// request all spice
app.get('/api/spices', function (req, res) {
    var data = []
    var spice_title = '';
    var brand_title = '';
    var tag_ids = [];
    myDBM.getAllSpices(spice_title, brand_title, tag_ids, (result) => {
        console.log(result)
        if (result.length > 0) {
            for(var j = 0; j < result.length; j++){
                data.push(result[j])
            }
            res.json(data)
        } else {
            res.send('dont have any spices');
        }
    });
});

/*
 * MY SPICE
 */

app.get('/api/myspices', function (req, res) {
    var data = []
    myDBM.getAllMySpices((result) => {
        console.log(result)
        if (result.length > 0) {
            for(var j = 0; j < result.length; j++){
                data.push(result[j])
            }
            res.json(data)
        } else {
            res.send('dont have any spices');
        }
    });
});


// Port vhat used
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


