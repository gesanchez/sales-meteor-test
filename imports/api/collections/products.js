import { Mongo } from 'meteor/mongo';
import '../methods/products';

export const Products = new Mongo.Collection('products');
