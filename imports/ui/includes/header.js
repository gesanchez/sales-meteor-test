import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './header.html';

Template.header.helpers({
    userInfo(){
      return Meteor.user();
    }
});

Template.header.events({
  'click i.fa-key'(){
    Session.set('loginModal', !Session.get('loginModal'));
  },
  'click i.fa-sign-in'(){
    Session.set('loginSignup', !Session.get('loginSignup'));
  },
  'click i.fa-sign-out'(){
    Meteor.logout();
  }
});
