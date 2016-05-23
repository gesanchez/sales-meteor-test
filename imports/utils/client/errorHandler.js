/**
* @name SchemaHandler
* @function for add error message in form form schema validator
* @param error Object Error object from callback
* @param instance Object Is template instance
*/
export function SchemaHandler(error, instance, reactive) {
  reactive.set(error.reason);
  if (Array.isArray(error.details)){
    let field = instance.$('[name = "'+ error.details[0].name +'"]');
    field.focus();
  }
};

/**
* @name TextHandler
* @function for add error message in form form custom validation
* @param error String message to show
* @param fieldInstance Object jquery instance of field where error will be display
*/
export function TextHandler(error, fieldInstance){
  fieldInstance.addClass('error').after($('<span style="display: block"/>').text(error));
};

/**
* @name ResetError
* @function for remove all error message in fields
* @param fields Object name of fields
*/
export function ResetError(instance, fields){
  for(let i = 0, len = fields.length; i < len; i++) {
    if (typeof fields[i] === 'string'){
      instance.$('[name = "'+ fields[i] +'"]').removeClass('error').next('span').remove();
    }
  }
};
