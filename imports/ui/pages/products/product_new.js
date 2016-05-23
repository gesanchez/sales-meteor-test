import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { productsSchema } from '../../../schemas/products';
import { TextHandler, ResetError } from '../../../utils/client/errorHandler';
import { Products } from '../../../api/collections/upload';
import { Products as ProductData } from '../../../api/collections/products';
import './product_new.html';

let uploading = new ReactiveVar(null)
    uploaded = new ReactiveVar(null),
    error = new ReactiveVar(null);

Template.productNew.onCreated(function(){
  this.errorMessage = new ReactiveVar(null);
  this.successMessage = new ReactiveVar(null);
});

Template.productNew.helpers({
  "uploadingValue"(template){
    return uploading.get();
  },
  "imageUploaded"(template){
    if (uploaded.get()){
      return Products.findOne({"_id": uploaded.get()._id});
    }else{
      return false;
    }
  }
});

Template.productNew.events({
  'submit form': function(e, instance){
    e.preventDefault();
    ResetError(instance,['name','price', 'upload']);
    const target = e.target,
        fields = {"name" : target.name.value, "price" : parseFloat(target.price.value), "user_id" : Meteor.userId(), "photo": uploaded.get() };

    if (!fields.name){ return TextHandler('Name is required', instance.$(target.name)); }
    if (!fields.price){ return TextHandler('Price is required', instance.$(target.price)); }
    if (!fields.photo){ return TextHandler('Photo is required', instance.$(target.upload)); }

    Meteor.call('products.insert', fields, function(err, result){
      if (err){ return SchemaHandler(err, instance, error); }
      target[0].reset();
    });
  },
  'keydown input:text[name="price"]': function(e, instance){
    let key = e.which;
    if ((key < 48 || key > 57) && (key < 96 || key > 105) && key === 9 && key === 9 && key === 37 && key === 39){
      e.preventDefault();
    }
  },
  'keyup input:text[name="price"]': function(e, instance){
    let key = e.which,
       target = $(e.target);
    if (key !== 9 && key !== 8 && key !== 37 && key !== 39){
      let value = parseFloat(target.val().replace(',',''));
      if (!isNaN(value)){
        target.val(value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      }
    }
  },
  'click button[name="upload"]': function(e, template){
    template.$('[name="product_photo"]').trigger('click');
  },
  'change input:file[name="product_photo"]': function(e, template){
    uploading.set(true);
    Products.insert(e.target.files[0], function(err, file){
      uploading.set(false);
      if (!err){
        uploaded.set(file);
      }
    });
  }
});
