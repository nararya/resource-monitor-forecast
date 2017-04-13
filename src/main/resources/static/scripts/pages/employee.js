var employeeTable = new Table({
   container: 'employee-table',
   url: baseUrl + 'employee',
   columns: [{ 
     label: 'No.',
     field: '$ROWNUM'
   }, {
     label: 'Name',
     field: 'name'  
   }, {
      label: 'Email',
      field: 'email'  
   }, {
      label: 'Action',
      buttons: [
         {
            label: 'Edit',
            behaviour: function(row){
               employeeForm.load(row);
            }
         }
      ]
      
   }]
});


var employeeForm = new Form({
   action: baseUrl + 'employee/save',
   title: 'Update Employee Data',
   modal: true,
   fields: [{
      type: "hidden", 
      referTo: 'id'
   },{
      type: "text",
      label: 'Name',
      referTo: 'name'
   },{
      type: "text",
      label: 'Email',
      referTo: 'email'
   }],
   afterSubmit: function(){
      employeeTable.load();
   }
});


employeeTable.load();