const tagsConfig = {
    width: "100%",
    height: "auto",
    autoload: true,
    filtering: true,
    inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    controller: {
        loadData: function(filter) {
            return $.ajax({
                type: "GET",
                url: "/api/tags/",
                data: filter
            });
        },
        
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/api/tags/",
                data: item,
                dataType: "json"
            });
        },
        
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: "/api/tags/",
                data: item,
                dataType: "json"
            });
        },
        
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/api/tags/",
                data: item,
                dataType: "json"
            });
        },
    },
    fields: [
        {name: "tag_id", type: "number", css: "hide"},
        {name: "tag_title", type: "text", title: "Имя тэга", width: 150, validate: "required"},
        {type: "control"}
    ]
}
