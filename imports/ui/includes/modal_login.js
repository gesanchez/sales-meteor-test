import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { TextHandler, ResetError } from '../../utils/client/errorHandler';
import './modal_login.html';

let errorLogin = new ReactiveVar(null);

Template.modalLogin.helpers({
  errorLogin : function(template){
    return errorLogin.get();
  }
});

Template.modalLogin.events({
  'submit form'(e, template) {
    e.preventDefault();
    ResetError(template,['email','password']);
    const target = e.target,
    obj = {email: target.email.value,password:  target.password.value};
    if (!obj.email){ return TextHandler('Email is required', template.$(target.email)); }
    if (!obj.password){ return TextHandler('Password is required', template.$(target.password)); }

    Meteor.loginWithPassword(obj.email, obj.password, function(err){
      if (err){
        return errorLogin.set(err.reason);
      }
      errorLogin.set(null);
      Session.set('loginModal', false);
    });
  }
});
