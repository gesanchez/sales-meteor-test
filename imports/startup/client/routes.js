import { Router } from 'meteor/iron:router';
import '../../ui/layouts/layout.html';
import '../../ui/includes/header.html';
import '../../ui/includes/footer.html';
import '../../ui/pages/products/product_new.js';
import '../../ui/pages/products/product_list.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'productList',
  waitOn: function(){
    return Meteor.subscribe('allProducts');
  }
});

Router.route('/products/new', {
  name: 'productNew',
  template: 'productNew'
});
