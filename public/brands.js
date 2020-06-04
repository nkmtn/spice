const brandsConfig = {
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
                url: "/api/brands/",
                data: filter
            });
        },
        
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/api/brands/",
                data: item
            });
        },
        
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: "/api/brands/",
                data: item
            });
        },
        
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/api/brands/",
                data: item
            });
        },
    },
    fields: [
      { name: "brand_id", type: "number", css: "hide" },
      { title: "Производитель", name: "brand_title", type: "text", width: 80 , validate: "required"},
      { title: "Описание", name: "brand_description", type: "text", width: 80 },
      { type: "control"}
    ]
  }