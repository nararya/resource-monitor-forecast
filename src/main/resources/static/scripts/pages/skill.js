var skillTable = new Table({
   container: 'skill-table',
   url: baseUrl + 'skill',
   columns: [{ 
     label: 'No.',
     field: '$ROWNUM'
   }, {
     label: 'Name',
     field: 'name'  
   }, {
      label: 'Action',
      buttons: [
         {
            label: 'Edit',
            behaviour: function(row){
               skillForm.load(row);
            }
         }
      ]
      
   }]
});


var skillForm = new Form({
   action: baseUrl + 'skill/save',
   title: 'Update Skill Data',
   modal: true,
   fields: [{
      type: "hidden", 
      referTo: 'id'
   },{
      type: "text",
      label: 'Name',
      referTo: 'name'
   }],
   afterSubmit: function(){
      skillTable.load();
   }
});


skillTable.load();