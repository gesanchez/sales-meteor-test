import { Template } from 'meteor/templating';
import { Products } from '../../../api/collections/products';
import './product_list.html';
import './product_item.html';

Template.productList.helpers({
  products() {
    return Products.find({});
  }
});
