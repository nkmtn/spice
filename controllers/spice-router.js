module.exports = (dbm) => {
    
    var router = require('express').Router();
    
//     Create a spice
    router.post('/', function(req, res) {
        var title = req.body.spice_title,
            description = req.body.spice_description,
            brand_id = req.body.brand_id,
            tag_ids = req.body.tag_ids.split(',');
            var tag_ids = tag_ids.filter(function(number) {
                return Number.isInteger(number) && number > 0;
            });
        dbm.addSpice(title, description, brand_id, tag_ids, (result) => {
            res.json(result);
            res.status(200);
        });
    });
    
//     Read all spices
    router.get('/', function (req, res) {
        // for a start without filters
        var spice_title = '',
            brand_title = '',
            tag_ids = [];
        dbm.getAllSpices(spice_title, brand_title, tag_ids, (result) => {
            if (result.length > 0) {
                res.json(result);
                res.status(200);
            } else {
                res.status(400);
            }
        });
    });

//     Update the spice
    router.put('/', function(req, res) {
        var spice_id = req.body.spice_id,
            spice_title = req.body.spice_title,
            spice_description = req.body.spice_description,
            brand_id = req.body.brand_id,
            tag_ids = req.body.tag_ids.split(',');
        dbm.editSpice(spice_id, spice_title, spice_description, brand_id, tag_ids, (result) => {
            res.json(result)
            res.status(200)
        });
    });
    
// Delete?
                    
    return router;
    
};
