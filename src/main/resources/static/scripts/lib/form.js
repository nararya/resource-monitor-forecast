var modalTemplate = 
'<div class="modal fade">'+
'  <div class="modal-dialog">'+
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
   
   var renderField = function (field){
      var formGroupRow = $('<div class="form-group row"></div>');
      if(field.type!='hidden'){
         formGroupRow.append('<label for="'+ field.id +'" class="col-'+ labelWidth +' col-form-label">' + field.label + '</label>');
      }
      
      switch(field.type){
         case "text" : 
         case "hidden" : {
            var inputDiv = $('<div class="col-'+fieldWidth+'"></div>').appendTo(formGroupRow);
            field.inputElement = $('<input class="form-control" type="'+field.type+'">').appendTo(inputDiv);
            formElement.append(formGroupRow);
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
      fields.forEach(function(field){
         field.inputElement.val(data[field.referTo]);
      });
   
   }
}