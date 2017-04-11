var Form = function(parameters){
   if(!$){
      console.error("Cannot Find jQuery");
      return;
   }
   
   //Setters
   var formData = {};
   var container = parameters.container;
   var labelWidth = parameters.labelWidth || 2;
   var fieldWidth = parameters.fieldWidth || 10;
   var fields = parameters.field;
   
   if(!fields){
      console.error("Cannot locate fields.");
      return;
   }
   
   if(!$(container)){
      console.error("Cannot locate container for form: " + container);
      return;
   }
   
   var form = $('<form></form>');
   
   fields.forEach(function(field){
      var formGroupRow = $('<div class="form-group row"></div>');
      formGroupRow.append('<label for="'+ field.id +'" class="col-'+ labelWidth +' col-form-label">' + field.label + '</label>');
      formGroupRow.append(
         '<div class="col-10">' + 
            '<input class="form-control" type="text" id="' + field.id +'">' +
         '</div>'
      );
      
   });
   
   container.append(form);
   
   //Public 
}