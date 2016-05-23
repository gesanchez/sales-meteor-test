import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let profile = new SimpleSchema({
  first_name : {type: String, optional: false},
  last_name: {type: String, optional: false}
})
user = new SimpleSchema({
  _id: {type: String, optional: true},
  email: {type: String, optional: false, regEx: SimpleSchema.RegEx.Email},
  emails: {type: Array, optional: true},
  username: {type: String,optional: false},
  profile: {type: profile, optional: true},
  password: {type: String, optional: false},
  "emails.$" : {type: Object},
  "emails.$.address" : {type: String, regEx: SimpleSchema.RegEx.Email},
  "emails.$.verified" : {type: Boolean},
  services: {type: Object,optional: true,blackbox: true},
  createdAt: {type: Date, defaultValue: new Date(), optional: true}
});

export const profileSchema = profile;
export const userSchema = user;
