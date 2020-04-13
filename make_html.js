var Sqrl = require('squirrelly');

function showAllSpice(result){
    return Sqrl.renderFile('./views/ShowAllSpice.html', {result: result})
}

function makeForm(){
    return Sqrl.renderFile('./views/FormAddSpice.html', {title: 'Add new spice'})
}

function deleteForId(){
    return Sqrl.renderFile('./views/testDeleteForId.html', {title: 'Write id what you want delete'})
}

module.exports.makeForm = makeForm;
module.exports.showAllSpice = showAllSpice;
module.exports.deleteForId = deleteForId;
