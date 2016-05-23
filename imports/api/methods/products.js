import { Meteor } from 'meteor/meteor';
import { productsSchema } from '../../schemas/products';
import { Products } from '../collections/products';

Meteor.methods({
  'products.insert'(obj) {
    productsSchema.validate(obj);
    Products.insert(obj);
  }
});
