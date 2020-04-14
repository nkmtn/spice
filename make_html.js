/*
    make_html -- module for lookups data in html pages support Squirrell.js
*/

var Sqrl = require('squirrelly');

function showAllSpice(result){
    return Sqrl.renderFile('./views/ShowAllSpice.html', {result: result})
}

function addSpice(){
    return Sqrl.renderFile('./views/AddSpiceForm.html', {title: 'Add new spice'})
}

function deleteForId(){
    return Sqrl.renderFile('./views/testDeleteForId.html', {title: 'Write id what you want delete'})
}

// Публичные методы
module.exports.makeForm = addSpice;
module.exports.showAllSpice = showAllSpice;
module.exports.deleteForId = deleteForId;
