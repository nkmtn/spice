module.exports = (dbm) => {
    
    var router = require('express').Router();
    
    // Create a brand
    router.post('/', function(req, res) {
        if (req.body.brand_title !== undefined){
            var title = req.body.brand_title,
                description = '';
            if (req.body.brand_description !== undefined)
                var description = req.body.brand_description;
            dbm.addBrand(title, description, (result) => {
                res.json(result);
                res.status(200);
            });
        } else {
            res.status(400);
        }
    });
    
    // Read all brands
    router.get('/', function (req, res) {
        var data = [],
            title = '',
            description = '';
        if (req.query.brand_title !== undefined)
            var title = req.query.brand_title;
        if(req.query.brand_desciption !== undefined)
            var description = req.query.brand_desciption;
        dbm.getAllBrands(title, description, (result) => {
            if (result.length > 0) {
                for(var j = 0; j < result.length; j++){
                    data.push(result[j])
                }
                res.json(data);
                res.status(200);
            } else {
                res.status(400);
            }
        });
    });

    // Update the brand
    router.put('/', function(req, res) {
        if (req.body.brand_title !== undefined && req.body.brand_id !== undefined){
            var title = req.body.brand_title,
                id = req.body.brand_id,
                description = '';
            if (req.body.brand_description !== undefined)
                description = req.body.brand_description;
            dbm.editBrand(id, title, description, (result) => {
                res.json(result);
                res.status(200);
            });
        } else {
            res.status(400);
        }
    });
    
    // Delete the brand
    router.delete('/', function(req, res) {
        if (req.body.brand_id !== undefined){
            var id = req.body.brand_id;
            dbm.deleteBrand(id, (result) => {
                res.json(result);
                res.status(400);                
            });
        } else {
            res.status(400);
        }
    });

    
        
    return router;
    
};
