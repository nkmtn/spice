const batchesConfig = {
    width: "100%",
    height: "auto",
    autoload: true,
    filtering: true,
    /*inserting: true,
    editing: true,*/
    sorting: true,
    paging: true,
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
      { type: "control",
                modeSwitchButton: false,
                editButton: false,
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Новый набор")
                            .on("click", function () {
                                showBatchDialog("Add", {});
                            });}}
    ]
  }
  
//               var showBatchDialog = function(dialogType, client) {
//                   $("#spices-spice-title").val(client.spice_title)
//                   $("#spices-spice-description").val(client.spice_description)
//                   
//                $.ajax({
//                 type: "GET",
//                 url: "/api/brands/",
//                 }).done(function(data) {
//                  data.forEach(element => {
//                      var sel = "";
//                      if(typeof(client.brand_id) != "undefined" && client.brand_id !== null)
//                      if (client.brand_id === element.brand_id) sel = "selected "
//                      $("#spices-brand").append("<option " + sel + "value=" + element.brand_id + ">" + element.brand_title + "</option>")
//                 })
//                 });
//                 
//                 
//                $.ajax({
//                 type: "GET",
//                 url: "/api/tags/",
//                 }).done(function(data) {
//                  var ids = []
//                  if(typeof(client.tag_ids) != "undefined" && client.tag_ids !== null) {
//                      ids = client.tag_ids.split(",")
//                  }
//                  data.forEach(element => {
//                      console.log(element)
//                      var sel = "";
//                      if (ids.includes(element.tag_id.toString())) {
//                          sel = "selected "
//                      }
//                      $("#spices-tag-ids").append("<option " + sel + "value=" + element.tag_id + ">" + element.tag_title + "</option>")
//                 })
//                 });
//                 console.log(client.tag_ids.split(","))
//                   
//                 $("#name").val(client.Name);
//                 $("#age").val(client.Age);
//                 $("#address").val(client.Address);
//                 $("#country").val(client.Country);
//                 $("#married").prop("checked", client.Married);
// 
//                 spiceSubmitHandler = function() {
//                     saveSpice(client, dialogType === "Add");
//                 };
// 
//                 $("#spices-dialog").dialog("option", "title", dialogType === "Add" ? "Добавить специю" : "Редактировать специю")
//                     .dialog("open");
//             };