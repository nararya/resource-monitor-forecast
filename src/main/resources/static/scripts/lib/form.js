var modalTemplate = 
'<div class="modal fade">'+
'  <div class="modal-dialog modal-lg">'+
'    <div class="modal-content">'+
'      <div class="modal-header">'+
'        <h5 class="modal-title">{{title}}</h5>'+
'        <button type="button" class="close" data-dismiss="modal">'+
'          <span>&times;</span>'+
'        </button>'+
'      </div>'+
'      <div class="modal-body">'+
'         <form></form>'+
'      </div>'+
'      <div class="modal-footer">'+
'        <button type="button" class="btn btn-primary submit-button">Submit</button>'+
'        <button type="button" class="btn btn-secondary close-button" data-dismiss="modal">Close</button>'+
'      </div>'+
'    </div>'+
'  </div>'+
'</div>';

var Form = function(parameters){
   if(!$){
      console.error("Cannot Find jQuery");
      return;
   }
   
   //Setters
   var action     = parameters.action;
   var title      = parameters.title;
   var modal      = parameters.modal;
   var container  = parameters.container;
   var labelWidth = parameters.labelWidth || 2;
   var fieldWidth = parameters.fieldWidth || 10;
   var fields     = parameters.fields;
   
   var afterSubmit = parameters.afterSubmit;
   
   var formElement;
   
   if(!fields){
      console.error("Cannot locate fields.");
      return;
   }
   
   if(modal) {
      var modalHtml = modalTemplate;
      modalHtml = modalHtml.replace("{{title}}",title);
      container = $(modalHtml).appendTo($('body'));
      formElement = container.find('form');
   } else if($(container)){
      container = $(container);
      formElement = $('<form></form>').appendTo(container);
   } else {
      console.error("Cannot locate container for form: " + container);
      return;
   }

   var getOptionsFromObject = function(field) {
      field.options.forEach(function(option){
         field.inputElement.append('<option value="' + option.value + '">' + option.text + '</option>');
      });
   }

   
   var getOptionsFromUrl = function(field) {
      field.inputElement.append('<option value=""/>Loading Select</option>');
      
      if(!field.optionValue) {
         console.error("No optionValue is set for field");
         return;
      }
      
      if(!field.optionText) {
         console.error("No optionText is set for field");
         return
      }
      
      $.ajax({
         url: field.optionUrl,
         method:'GET',
         success: function(data){
            field.inputElement.empty();
            data.forEach(function(datum){
               field.inputElement.append('<option value="' + datum[field.optionValue]+ '">' + datum[field.optionText] + '</option>')
            });
         }
      });
      
   };
      
   var renderField = function (field){
      var inputDiv = formElement;
      
      if(field.type!='hidden'){
         var formGroupRow = $('<div class="form-group row"></div>');
         formGroupRow.append(
            '<label for="'+ field.id +'" class="col-'+ labelWidth +' col-form-label">' + 
                field.label + 
            '</label>');
         inputDiv = $('<div class="col-'+fieldWidth+'"></div>').appendTo(formGroupRow);
      }
      
      switch(field.type){
         case "select" : 
            field.inputElement = $('<select class="custom-select">').appendTo(inputDiv);
            if(field.options) {
               getOptionsFromObject(field);
            } else if (field.optionUrl) {
               getOptionsFromUrl(field);
            } else {
               console.error("No options nor optionUrl is defined for the field.");
            }            
            formElement.append(formGroupRow);
            break; 
         case "text" : {
            field.inputElement = $('<input class="form-control" type="'+field.type+'">').appendTo(inputDiv);
            formElement.append(formGroupRow);
            break;
         }
         case "hidden" : {
            field.inputElement = $('<input class="form-control" type="'+field.type+'">').appendTo(inputDiv);
            break;
         }
         default: {
            break;
         }
      }
      
   }
   
   var submitFunction = function(){
      if(action) {
         var formData = {};
         fields.forEach(function(field){
            formData[field.referTo] = field.inputElement.val();
         });
         
         $.ajax({
            url:action,
            method:'POST',
            headers : {
               "Content-Type": 'application/json'
            },
            data: JSON.stringify(formData),
            success: function(){
               if(afterSubmit){
                  afterSubmit();
               } 
               container.modal('hide');
            }
         });
         
      } else {
         container.modal('hide');
      }
   }
   
   var submitButton = $ (container).find('.submit-button');
   submitButton.on('click', submitFunction);
   
   //Initiators
   fields.forEach(renderField);
   
   //Public functions
   this.load = function(data){
      if(modal){
         container.modal();
      }
      if(data){
         fields.forEach(function(field){
            field.inputElement.val(data[field.referTo]);
         });
      } else {
         fields.forEach(function(field){
            field.inputElement.val('');
         });
      }
   }
}