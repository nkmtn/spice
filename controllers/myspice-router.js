module.exports = (dbm) => {
    
    var router = require('express').Router();
    
    router.get('/', function (req, res) {
        var data = []
        dbm.getAllMySpices((result) => {
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
    
    return router;
    
};
