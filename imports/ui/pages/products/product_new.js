import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { InsertHandler } from '../../errorHandlers/products';
import { productsSchema } from '../../../schemas/products';
import './product_new.html';

Template.productNew.onCreated(function(){
  this.errorMessage = new ReactiveVar(null);
  this.successMessage = new ReactiveVar(null);
});

Template.productNew.events({
  'submit form' : function(e, instance){
    e.preventDefault();
    let target = instance.$(e.target),
        fields = {"name" : target.find('input[name = "name"]').val(), "price" : parseFloat(target.find('input[name = "price"]').val())};

    try{
      productsSchema.validate(fields);
    }catch(e){
      return InsertHandler(e, instance);
    }

    Meteor.call('products.insert', fields, function(err, result){
      if (err){
        InsertHandler(err, instance);
      }
      target[0].reset();
    });
  },
  'keydown input:text[name="price"]' : function(e, instance){
    let key = e.which;
    if ((key < 48 || key > 57) && (key < 96 || key > 105) && key === 9 && key === 9 && key === 37 && key === 39){
      e.preventDefault();
    }
  },
  'keyup input:text[name="price"]' : function(e, instance){
    let key = e.which,
       target = $(e.target);
    if (key !== 9 && key !== 8 && key !== 37 && key !== 39){
      let value = parseFloat(target.val().replace(',',''));
      if (!isNaN(value)){
        target.val(value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      }
    }
  }
});
