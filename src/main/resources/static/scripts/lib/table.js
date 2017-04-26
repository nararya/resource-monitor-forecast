var Table = function(parameters){
   if(!$){
      console.error("Cannot Find jQuery.");
      return;
   }
   
   //Check Parameters
   if(!parameters.container && !parameters.containerId){
      console.error("Neither 'container' or 'containerId' is set.");
      return;
   }
   if(!parameters.columns){
      console.error("The parameter 'columns' is not set.");
      return;
   }

   
   //Set parameters
   var url         = parameters.url;
   var container   = parameters.container;
   var containerId = parameters.containerId;
   var columns     = parameters.columns;
   var tableData   = parameters.tableData;
   var subTables   = parameters.subTables;
   var usePaging   = parameters.usePaging;
   
   var page      = parameters.page || 0;
   var size      = parameters.size || 20;

   //Private variables
   var paging;
   var tableHead;
   var tableBody;
   
 //Private functions - Subtables
   var renderSubTable = function(subTable, row){
      var subTableData = row[subTable.data];
      
      if(subTableData && subTableData.length > 0){
         var tr           = $('<tr></tr>');
         var td           = $('<td colspan="' + columns.length + '"></td>').appendTo(tr);
         var subContainer = $('<div class="subtable-container"></div>').appendTo(td);

         subTable.container = subContainer;
         subTable.tableData = subTableData;
         
         row.subTable = new Table(subTable);
         row.subTable.load();
         row.element.after(tr);
      }
      
      
      
   };
   
   var renderSubTables = function(row){
      if(subTables){
         subTables.forEach(function(subTable){
            renderSubTable(subTable, row);
         })
      }
   };

   //Private functions - Renders   
   var renderBase = function(){
      if(!container) {
         container = $('#' + containerId);         
         if(!container.length){
            console.error("Can't find html element with the id: " + containerId);
            container = false;
         }
      }
      container.append(
      '<div class="paging"></div>'+ 
      '<div>'+
      '  <table class="table table-sm">'+
      '    <thead></thead>'+
      '    <tbody></tbody>'+
      '  </table>'+
      '</div>'+
      '<div class="paging"></div>');
      
      paging    = container.find(".paging");
      tableHead = container.find("thead");
      tableBody = container.find("tbody");
      
      var headTr = $('<tr></tr>');
      columns.forEach(function(column){
         headTr.append('<td>'+column.label+'</td>')
      });
      tableHead.append(headTr); 
   }
   
   var renderCell = function(row, column){
      var td = $('<td></td>');
      if(column.buttons){
         var buttonGroup = $('<div class="btn-group"></div>');
         column.buttons.forEach(function(button){
            var buttonElement = $('<button type="button" class="btn btn-sm"></button>');
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
      row.element = $('<tr></tr>');
      columns.forEach(function(column){
         var td = renderCell(row,column);
         row.element.append(td);
      });      
   };
   
   var renderTable = function(){
      var rows = tableData;
      var temporaryTbody = $('<tbody></tbody>');
      if(tableData.content){
         rows = tableData.content;
      }
      rows.forEach(function(row){
         renderRow(row, columns);
         temporaryTbody.append(row.element);
         renderSubTables(row);
      });
      tableBody = container.find("tbody");
      tableBody.replaceWith(temporaryTbody);
   };
   
   var renderPaging = function(){
      
   }
   

   var render = function(){
      if(!tableHead || !tableBody){
         renderBase();
      }
      
      if(container){
         renderTable();
         renderPaging();         
      }
   }
   
   //Private functions -- Setters   
   var setTableData = function(data){
      var rownum = page * size + 1;      
      var rows = data;
      if(data.content) {
         rows = data.content;
      }
      rows.forEach(function(row){
         row['$ROWNUM'] = rownum++;
      });
      tableData = data;
   }
   
   
   //Public functions
   this.load = function(){
      if(url){
         $.get(url, function(data){
            setTableData(data);
            render();
         }.bind(this));
      } else {
         setTableData(tableData);
         render();
      }
   }
};