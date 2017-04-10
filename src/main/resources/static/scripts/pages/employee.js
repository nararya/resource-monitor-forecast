var employeeTable = new Table({
   container: 'employee-table',
   url: baseUrl + 'employee',
   columns: [
   { label: 'No.',
     special: true,
     field: '$ROWNUM'
   },
   {
     label: 'Name',
     field: 'name'  
   },
   {
      label: 'Email',
      field: 'email'  
   }]
});

employeeTable.load();