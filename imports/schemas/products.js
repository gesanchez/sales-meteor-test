import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const productsSchema = new SimpleSchema({
  name: {type: String},
  stock: {type: Number, defaultValue: 0, optional: true},
  price: {type: Number},
  user_id: {type: String},
  photo: {type: Object}
});
