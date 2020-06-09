function createSpicesGrid (gridId, dialogId, formDialogId) {

    const config = {
        
        width: "100%",
        height: "auto",
        
        autoload: true,
        filtering: true,
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
                return $.ajax({
                    type: "PUT",
                    url: "/api/spices/",
                    data: item
                });
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
            {
                type: "control",
                modeSwitchButton: false,
                editButton: false,
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Новая специя").on("click", function () {
                        showSpiceDialog("Add", {});
                    });
                }
            }
        ],
        
        noDataContent: "Данные не найдены",
        
        deleteConfirm: "Вы уверены, что хотите удалить эти записи?",
        
        pageSize: 20,
        pagerFormat: "Страницы: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} из {pageCount}",
        pageNextText: "Вперёд",
        pagePrevText: "Назад",
        pageFirstText: "В начало",
        pageLastText: "В конец",
        
        invalidMessage: "Неверные данные!",
        loadMessage: "Подождите, пожалуйста..."
    }

    var showSpiceDialog = function(dialogType, client) {
        if(typeof(client.spice_id) === "undefined")
            client.spice_id = 0
        $("#spices-spice-id").val(client.spice_id)
        $("#spices-spice-title").val(client.spice_title)
        $("#spices-spice-description").val(client.spice_description)
        
        $.ajax({
            type: "GET",
            url: "/api/brands/",
        }).done(function(data) {
            $('#spices-brand').find('option').remove();
            
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
                ids = client.tag_ids.toString().split(",")
            }
            $('#spices-tag-ids').find('option').remove();
            
            data.forEach(element => {
                var sel = "";
                if (ids.includes(element.tag_id.toString())) {
                    sel = "selected "
                }
                $("#spices-tag-ids").append("<option " + sel + "value=" + element.tag_id + ">" + element.tag_title + "</option>")
            })
        });
        
        $(formDialogId).data("validator").settings.submitHandler = function() {
            saveSpice(client, dialogType === "Add");
        }

        $(dialogId).dialog("option", "title", dialogType === "Add" ? "Добавить специю" : "Редактировать специю").dialog("open");
    };

    var saveSpice = function(client, isNew) {
        $.extend(client, {
            spice_id: $("#spices-spice-id").val(),
            spice_title: $("#spices-spice-title").val(),
            spice_description: $("#spices-spice-description").val(),
            brand_id: parseInt($("#spices-brand").val(), 10),
            tag_ids: $('#spices-tag-ids').val().join()
        });

        $(gridId).jsGrid(isNew ? "insertItem" : "updateItem", client);
        $(dialogId).dialog("close");
    };
        
    $(gridId).jsGrid(config)

    $(dialogId).dialog({
        autoOpen: false,
        width: 400,
        close: function() {
            $(formDialogId).validate().resetForm();
            $(formDialogId).find(".error").removeClass("error");
        }
    });

    $(formDialogId).validate({
        rules: {
            spice_title: "required",
            brand_id: "required"
        },
        messages: {
            spice_title: "Напишите наименование специи",
            brand_id: "Выберите название торговой марки"
        },
        submitHandler: function() {
            spiceSubmitHandler();
        }
    });

    var spiceSubmitHandler = $.noop;
}

function reloadSpices (gridId) {
    $(gridId).jsGrid("loadData")
}