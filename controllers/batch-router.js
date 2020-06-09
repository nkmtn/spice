module.exports = (dbm) => {
    
    var router = require('express').Router();
    
    router.post('/', function (req, res) {
        var spice_id = req.body.spice_id,
            store_id = req.body.store_id,
            batch_number = req.body.batch_number;
        dbm.addMySpices(spice_id, store_id, batch_number, (result) => {
        var data = {
                spice_id: result[0].spice_id,
                spice_title: result[0].spice_title,
                store_id: result[0].store_title,
                store_title: result[0].store_title,
                batch_id: result[0].batch_id,
                batch_number: result[0].batch_number
            }
            console.log(data)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    });
    
    router.get('/', function (req, res) {
        var data = []
        dbm.getAllMySpices((result) => {
            for (var i = 0; i < result.length; i++){
                data.push(result[i])
            }
            console.log(data)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    });
    
    router.put('/', function (req, res) {
        var spice_id = req.body.spice_id,
            store_id = req.body.store_id,
            batch_id = req.body.batch_id,
            batch_number = req.body.batch_number;
        dbm.editMySpices(spice_id, store_id, batch_id, batch_number, (result) => {
        var data = {
                spice_id: result[0].spice_id,
                spice_title: result[0].spice_title,
                store_id: result[0].store_title,
                store_title: result[0].store_title,
                batch_id: result[0].batch_id,
                batch_number: result[0].batch_number
            }
            console.log(data)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    });
    
    router.delete('/', function (req, res) {
        var batch_id = req.body.batch_id;
        dbm.deleteMySpices(batch_id, (result) => {
            res.end(JSON.stringify(result));
        });
    });
    
    return router;
    
};
