import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './layout.html';

Template.layout.onCreated(function(){
    Session.set("loginModal", false);
    Session.set('loginSignup', false);
});

Template.layout.helpers({
  viewLoginModal : function(){
    return Session.get('loginModal');
  },
  viewSignupModal : function(){
    return Session.get('loginSignup')
  }
});
