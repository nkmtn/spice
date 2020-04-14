/*
    make_html -- module for lookups data in html pages support Squirrell.js
*/

var Sqrl = require('squirrelly');

function showAllSpice(result){
    return Sqrl.renderFile('./views/ShowAllSpice.html', {result: result})
}

function addSpice(){
    return Sqrl.renderFile('./views/Forms.html', {legend: 'Add new spice', type: "add", title: "Add spice"})
}

function deleteForId(){
    return Sqrl.renderFile('./views/Forms.html', {legend: 'Write id what you want delete', type: "delete", title: "Delete spice"})
}

function editForId(){
    return Sqrl.renderFile('./views/Forms.html', {legend: 'Write id what you want edit', type: "edit", title: "Edit spice"})
}

// Публичные методы
module.exports.makeForm = addSpice;
module.exports.showAllSpice = showAllSpice;
module.exports.deleteForId = deleteForId;
module.exports.editForId = editForId;
