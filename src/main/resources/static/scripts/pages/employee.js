var employeeSkillTable = {
   data: 'skills',
   columns: [{ 
      label: 'No.',
      field: '$ROWNUM'
   }, {
      label: 'Name',
      field: 'skillName'
   }, {
      label: 'Level',
      field: 'skillLevel'
   }, {
      label: 'Action',
      buttons: [{
         label: 'Edit',
         behaviour: function(row){
            employeeSkillForm.load(row);
         }
      }]
   }]
}

var employeeTable = new Table({
   containerId: 'employee-table',
   url: baseUrl + 'employee/get',
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
      buttons: [{
         label: 'Edit',
         behaviour: function(row){
            employeeForm.load(row);
         }
      }, 
      {
         label: 'Add Skill',
         behaviour: function(row){
            var employeeSkillData = {
               employeeId: row.id
            };
            employeeSkillForm.load(employeeSkillData);
         }
      }]      
   }],
   subTables: [employeeSkillTable]
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

var employeeSkillForm = new Form({
   action: baseUrl + 'employeeSkill/save',
   title: 'Update Employee Skill Data',
   modal: true,
   fields: [{
      type: "hidden", 
      referTo: 'id'
   },{
      type: "hidden", 
      referTo: 'employeeId'
   },{
      type: "select",
      label: 'Skill',
      referTo: 'skillId',
      optionUrl: baseUrl + 'skill/all',
      optionValue: 'id',
      optionText: 'name'
   },{
      type: "select",
      label: 'Skill Level',
      referTo: 'skillLevel',
      options: [{
         value:'beginner',
         text: 'Beginner'
      }, { 
         value: 'intermediate',
         text: 'Intermediate'
      } , {
         value: 'expert',
         text: 'Expert'
      }]
   }],
   afterSubmit: function(){
      employeeTable.load();
   }
});


employeeTable.load();