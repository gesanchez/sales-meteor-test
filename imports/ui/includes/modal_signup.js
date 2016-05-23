import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { TextHandler, ResetError, SchemaHandler } from '../../utils/client/errorHandler';
import '../../api/methods/users.js';
import './modal_signup.html';

let errorSignup = new ReactiveVar(null);

Template.modalSignup.helpers({
  errorSignup : function(template){
    return errorSignup.get();
  }
});

Template.modalSignup.events({
  'submit form'(e, template) {
    e.preventDefault();
    ResetError(template,['email','password', 'first_name', 'last_name']);
    const target = e.target,
    obj = {
      email: target.email.value,
      password:  target.password.value,
      profile : {
        first_name: target.first_name.value,
        last_name: target.last_name.value
      },
      username: target.email.value.split('@')[0]
    };

    if (!obj.email){ return TextHandler('Email is required', template.$(target.email)); }
    if (!obj.password){ return TextHandler('Password is required', template.$(target.password)); }
    if (!obj.profile.first_name){ return TextHandler('First name is required', template.$(target.first_name)); }
    if (!obj.profile.last_name){ return TextHandler('Last name is required', template.$(target.last_name)); }

    Meteor.call('user.create', obj,function(err,result){
      if (err){ return SchemaHandler(err, template, errorSignup); }
      console.log(err);
      Meteor.loginWithPassword({email: obj['email']}, obj['password'], function(err){
        if (err){ return errorSignup.set(err.season); }
        errorSignup.set(null);
        Session.set('loginSignup', false);
      });
    });
  }
});
