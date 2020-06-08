//var express = require('express');

module.exports = (dbm) => {
    
    var router = require('express').Router();

    router.get('/', function (req, res) {
        console.log(req.body)
        var data = []
        if (req.query.tag_title !== undefined){
            var filter = req.query.tag_title;
        } else {
            var filter = '';
        }
        dbm.getAllTags(filter, (result) => {
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
    router.delete('/', function(req, res) {
        console.log(req.body)
        if (req.body.tag_id !== undefined){
            var id = req.body.tag_id;
            dbm.deleteTag(id, (result) => {
                res.json(result)
            });
        } else {
            res.end('dont have a title or a id');
        }
    });

    // Request for update the tag
    router.put('/', function(req, res) {
        console.log(req.body)
        if (req.body.tag_title !== undefined || req.body.tag_id !== undefined){
            var title = req.body.tag_title;
            var id = req.body.tag_id;
            dbm.editTag(id, title, (result) => {
                res.json(result)
            });
        } else {
            res.end('dont have a title or a id');
        }
    });

    // Request for adding the tag
    router.post('/', function(req, res) {
        console.log(req.body)
        if (req.body.tag_title !== undefined){
            var title = req.body.tag_title;
            dbm.addTag(title, (result) => {
                res.status(result.status);
                res.json(result.res);
            });
        } else {
            res.send('dont have a title');
        }
    });

    return router;
    
};
