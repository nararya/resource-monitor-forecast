var Table = function(parameters){
   if(!$){
      console.error("Cannot Find jQuery");
      return;
   }
   
   //Set parameters
   var url = parameters.url;
   var container = parameters.container;
   var columns = parameters.columns;
   var page = parameters.page || 0;
   var size = parameters.size || 20;
   
   //Private variables
   var tableData;
   var paging;
   var table = [];
   
   if(!container.match(/^#.+/)){
      container = '#' + container;
   }
   
   if(!$(container)){
      console.error("Cannot locate container for table: " + container);
      return;
   }
   
   container = $(container);
   container.append('<div class="paging"></div>');
   container.append('\
      <div>\
         <table class="table">\
            <thead></thead>\
            <tbody></tbody>\
         </table>\
      </div>');
   container.append('<div class="paging"></div>');
   paging = container.find(".paging");
   table.head = container.find("thead");
   table.body = container.find("tbody");
   
   {
      var headTr = $('<tr></tr>');
      columns.forEach(function(column){
         headTr.append('<td>'+column.label+'</td>')
      });
      table.head.append(headTr);
   }   
   
   //Private functions - Renders
   var renderCell = function(row, column){
      var td = $('<td></td>');
      if(column.buttons){
         
         var buttonGroup = $('<div class="btn-group"></div>');
         column.buttons.forEach(function(button){
            var buttonElement = $('<button type="button" class="btn btn-secondary"></button>');
            buttonElement.append(button.label);
            buttonElement.on('click', button.behaviour.bind(this,row));
            buttonGroup.append(buttonElement);
         });
         td.append(buttonGroup);
      } else {
         td.append(row[column.field]);
      }
      return td;               

   }

   
   var renderRow = function(row, columns){
      var tr = $('<tr></tr>');
      columns.forEach(function(column){
         var td = renderCell(row,column);
         tr.append(td);
      });      
      return tr;
   };
   
   var renderTable = function(){
      var temporaryTbody = $('<tbody></tbody>');
      console.log('---');
      tableData.content.forEach(function(row){
         console.log(row);
         var tr = renderRow(row, columns);
         temporaryTbody.append(tr);
      });
      table.body = container.find("tbody");
      table.body.replaceWith(temporaryTbody);
   };
   
   var renderPaging = function(){
      
   }

   var render = function(){
      renderTable();
      renderPaging();
   }
   
   //Private functions -- Setters   
   var setTableData = function(data){
      var rownum = page * size + 1;      
      data.content.forEach(function(row){
         row['$ROWNUM'] = rownum++;
      });
      tableData = data;
   }
   
   
   //Public functions
   this.load = function(){
      $.get(url, function(data){
         setTableData(data);
         render();
      }.bind(this));
   }
};