const storesConfig = {
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
                url: "/api/stores/",
                data: filter
            });
        },
        
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/api/stores/",
                data: item
            });
        },
        
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: "/api/stores/",
                data: item
            });
        },
        
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/api/stores/",
                data: item
            });
        },
    },
    fields: [
      { name: "store_id", type: "number", css: "hide" },
      { title: "Место хранения", name: "store_title", type: "text", width: 80 , validate: "required"},
      { title: "Описание", name: "store_description", type: "text", width: 80 },
      { type: "control"}
    ]
  }
  