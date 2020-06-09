function createBatchesGrid (gridId, dialogId, formDialogId) {

    const config = {
        
        width: "100%",
        height: "auto",
        
        autoload: true,
        filtering: true,
        sorting: true,
        paging: true,
        
        rowClick: function(args) {
            showBatchDialog("Edit", args.item);
        },
        
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/api/batches/",
                    data: filter
                });
            },
            
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/api/batches/",
                    data: item
                });
            },
            
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/api/batches/",
                    data: item
                });
            },
            
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/api/batches/",
                    data: item
                });
            },
        },
        fields: [
            { name: "spice_id", type: "number", css: "hide" },
            { title: "Наименование", name: "spice_title", type: "text", width: 80, validate: "required"},
            { name: "batch_id", type: "number", css: "hide" },
            { name: "store_id", type: "number", css: "hide" },
            { title: "Место хранения", name: "store_title", type: "text", width: 80 , validate: "required"},
            { title: "Количество", name: "batch_number", type: "number", width: 80 },
            {
                type: "control",
                modeSwitchButton: false,
                editButton: false,
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Новый набор").on("click", function () {
                         showBatchDialog("Add", {});
                    })
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

    var showBatchDialog = function(dialogType, client) {
        if(typeof(client.batch_id) === "undefined")
            client.batch_id = 0
        if(typeof(client.batch_number) === "undefined")
            client.batch_number = 1
        $("#batches-batch-id").val(client.batch_id)
        $("#batches-spice-id").val(client.spice_id)
        $("#batches-store-id").val(client.store_id)
        $("#batches-batch-number").val(client.batch_number)
        
        $.ajax({
            type: "GET",
            url: "/api/spices/",
        }).done(function(data) {
            $('#batches-spice-id').find('option').remove();
            
            data.forEach(element => {
                var sel = "";
                if(typeof(client.spice_id) != "undefined" && client.spice_id !== null)
                    if (client.spice_id === element.spice_id) sel = "selected "
                $("#batches-spice-id").append("<option " + sel + "value=" + element.spice_id + ">" + element.spice_title + "</option>")
            })
        });


        $.ajax({
            type: "GET",
            url: "/api/stores/",
        }).done(function(data) {
            $('#batches-store-id').find('option').remove();
            
            data.forEach(element => {
                var sel = "";
                if(typeof(client.store_id) != "undefined" && client.store_id !== null)
                    if (client.store_id === element.store_id) sel = "selected "
                $("#batches-store-id").append("<option " + sel + "value=" + element.store_id + ">" + element.store_title + "</option>")
            })
        });
        
        $(formDialogId).data("validator").settings.submitHandler = function() {
            saveBatch(client, dialogType === "Add");
        }

        $(dialogId).dialog("option", "title", dialogType === "Add" ? "Добавить специю" : "Редактировать специю").dialog("open");
    };

    var saveBatch = function(client, isNew) {
        $.extend(client, {
            batch_id: parseInt($("#batches-batch-id").val(), 10),
            spice_id: parseInt($("#batches-spice-id").val(), 10),
            store_id: parseInt($("#batches-store-id").val(), 10),
            batch_number: parseInt($("#batches-batch-number").val(), 10),
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
            spice_id: "required",
            store_id: "required",
            batch_number: { required: true, min: 1}

        },
        messages: {
            spice_id: "Выберите наименование специи",
            store_id: "Выберите название хранилища",
            batch_number: "Укажите не менее одного экземпляра"
        },
        submitHandler: function() {
            batchSubmitHandler();
        }
    });

    var batchSubmitHandler = $.noop; 
                
}