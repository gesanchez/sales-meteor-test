import { Meteor } from 'meteor/meteor';
import { Products } from '../collections/products';
import { Products as ProductsImage } from '../collections/upload';

Meteor.publish('allProducts', function(order, limit){
  return [Products.find({}), ProductsImage.find({})];
});

Meteor.publish('ProductImage', function(id){
  return ProductsImage.findOne({_id: id});
});

Meteor.publish('ProductsImage', function(id){
  return ProductsImage.find({});
});
