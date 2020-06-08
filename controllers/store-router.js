module.exports = (dbm) => {
    
    var router = require('express').Router();
    
    // Request all stores
    router.get('/', function (req, res) {
        var data = [],
            title = '',
            description = '';
        if (req.query.store_title !== undefined)
            var title = req.query.store_title;
        if(req.query.store_desciption !== undefined)
            var description = req.query.store_desciption;
        dbm.getAllStores(title, description, (result) => {
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


    // Request for adding the store
    router.post('/', function(req, res) {
        if (req.body.store_title !== undefined){
            var title = req.body.store_title;
            if (req.body.store_desciption !== undefined)
                var description = req.body.store_desciption;
            else
                var description = '';
            dbm.addStore(title, description, (result) => {
                res.json(result);
            });
        } else {
            res.status(400);
        }
    });

    // Request for delete the store
    router.delete('/', function(req, res) {
        if (req.body.store_id !== undefined){
            var id = req.body.store_id;
            dbm.deleteStore(id, (result) => {
                res.status(result.status);
                res.json(result.res);
            });
        } else {
            res.status(400);
        }
    });

    // Request for update the store
    router.put('/', function(req, res) {
        if (req.body.store_title !== undefined && req.body.store_id !== undefined){
            var title = req.body.store_title;
            var id = req.body.store_id;
            var description = '';
            if (req.body.store_description !== undefined)
                description = req.body.store_description;
            dbm.editStore(id, title, description, (result) => {
                res.json(result)
            });
        } else {
            res.status(400);
        }
    });
                
    return router;
    
};
