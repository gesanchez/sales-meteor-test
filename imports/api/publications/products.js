import { Meteor } from 'meteor/meteor';
import { Products } from '../collections/products';

Meteor.publish('allProducts', function(order, limit){
  return Products.find({});
});
