import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './modal.html';

Template.modal.helpers({
  width(){
    return this.width || 300;
  },
  height(){
    return this.height || 300;
  }
});

Template.modal.events({
  'click .overlay, click .fa-times'(e, template) {
    e.preventDefault();
    if (template.data.hasOwnProperty('name_session')){
      var name = template.data.name_session;
      Session.set(name, !Session.get(name));
    }
  }
})
