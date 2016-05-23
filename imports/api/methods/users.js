import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { userSchema } from '../../schemas/users';
import { _ } from 'meteor/underscore';

Meteor.methods({
  'user.create'(obj) {
    userSchema.validate(obj);
    return Accounts.createUser(obj);
  }
});
