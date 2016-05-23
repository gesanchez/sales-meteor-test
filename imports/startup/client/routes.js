import { Router } from 'meteor/iron:router';
import '../../ui/layouts/layout.js';
import '../../ui/includes/header.js';
import '../../ui/includes/footer.html';
import '../../ui/includes/modal.js';
import '../../ui/includes/modal_signup.js';
import '../../ui/includes/modal_login.js';
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
  },
  fastRender: true
});

Router.route('/products/new', {
  name: 'productNew',
  template: 'productNew',
  waitOn: function(){
    return Meteor.subscribe('ProductsImage');
  }
});
