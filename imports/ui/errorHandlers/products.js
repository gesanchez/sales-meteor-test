export function InsertHandler(error, instance) {
  instance.errorMessage.set(error.reason);
  if (Array.isArray(error.details)){
    let field = instance.$('[name = "'+ error.details[0].name +'"]');
    field.focus();
  }
}
