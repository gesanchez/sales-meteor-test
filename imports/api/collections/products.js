import { Mongo } from 'meteor/mongo';
import 'meteor/cfs:ejson-file';
import '../methods/products';

export const Products = new Mongo.Collection('products');
