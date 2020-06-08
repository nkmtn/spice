const spicesConfig = {
    width: "100%",
    height: "auto",
    autoload: true,
    filtering: true,
    /*inserting: true,
    editing: true,*/
    sorting: true,
    paging: true,
    rowClick: function(args) {
        showSpiceDialog("Edit", args.item);
    },
    controller: {
        loadData: function(filter) {
            return $.ajax({
                type: "GET",
                url: "/api/spices/",
                data: filter
            });
        },
        
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/api/spices/",
                data: item
            });
        },
        
        updateItem: function(item) {
            var d = $.Deferred();
            
            $.ajax({
                type: "PUT",
                url: "/api/spices/",
                data: item
            }).done(function(result){
                $("#spices-grid").jsGrid("loadData")
//                 $("#spices-grid").refresh()
                d.resolve(result);
            }).fail(function() {
                console.log("fail");
                d.reject();
            });
            
            return d.promise();
        },
        
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/api/spices/",
                data: item
            });
        },
    },
    fields: [
      { name: "spice_id", type: "number", css: "hide" },
      { title: "Наименование", name: "spice_title", type: "text", width: 80, validate: "required"},
      { title: "Описание", name: "spice_description", type: "text", width: 80 },
      { name: "brand_id", type: "number", css: "hide"},
      { title: "Бренд", name: "brand_title", type: "text", width: 80 },
      { name: "tag_ids", type: "text", css: "hide" },
      { title: "Тэги", name: "tag_titles", type: "text", width: 80 },
      { type: "control",
        modeSwitchButton: false,
        editButton: false,
        headerTemplate: function() {
            return $("<button>").attr("type", "button").text("Новая специя").on("click", function () {
                showSpiceDialog("Add", {});
            });
        }
      }
    ]
}

var showSpiceDialog = function(dialogType, client) {
    if(typeof(client.brand_id) === "undefined")
        client.spice_id = 0
    console.log(client.spice_id)
    $("#spices-spice-id").val(client.spice_id)
    $("#spices-spice-title").val(client.spice_title)
    $("#spices-spice-description").val(client.spice_description)
    
    $.ajax({
        type: "GET",
        url: "/api/brands/",
    }).done(function(data) {
        $('#spices-brand').find('option').remove(); //удаление старых данных
        data.forEach(element => {
            var sel = "";
            if(typeof(client.brand_id) != "undefined" && client.brand_id !== null)
            if (client.brand_id === element.brand_id) sel = "selected "
            $("#spices-brand").append("<option " + sel + "value=" + element.brand_id + ">" + element.brand_title + "</option>")
        })
    });


    $.ajax({
        type: "GET",
        url: "/api/tags/",
    }).done(function(data) {
        var ids = []
        if(typeof(client.tag_ids) != "undefined" && client.tag_ids !== null) {
            console.log(client.tag_ids)
            ids = client.tag_ids.toString().split(",")
//             ids = client.tag_ids
        }
        $('#spices-tag-ids').find('option').remove(); //удаление старых данных
        console.log(ids)
        data.forEach(element => {
            var sel = "";
            if (ids.includes(element.tag_id.toString())) {
                sel = "selected "
            }
            $("#spices-tag-ids").append("<option " + sel + "value=" + element.tag_id + ">" + element.tag_title + "</option>")
        })
    });

    $("#spices-form").submit(function() {
        saveSpice(client, dialogType === "Add");
    })

    $("#spices-dialog").dialog("option", "title", dialogType === "Add" ? "Добавить специю" : "Редактировать специю").dialog("open");
};

var saveSpice = function(client, isNew) {
    console.log("SAVE")
$.extend(client, {
    spice_id: $("#spices-spice-id").val(),
    spice_title: $("#spices-spice-title").val(),
    spice_description: $("#spices-spice-description").val(),
    brand_id: parseInt($("#spices-brand").val(), 10),
    tag_ids: $('#spices-tag-ids').val().join()
//                     Name: $("#name").val(),
//                     Age: parseInt($("#age").val(), 10),
//                     Address: $("#address").val(),
//                     Country: parseInt($("#country").val(), 10),
//                     Married: $("#married").is(":checked")
});

$("#spices-grid").jsGrid(isNew ? "insertItem" : "updateItem", client);
$("#spices-dialog").dialog("close");
// $("#spices-grid").refresh()
};
        