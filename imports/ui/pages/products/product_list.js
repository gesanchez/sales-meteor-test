import { Template } from 'meteor/templating';
import { Products } from '../../../api/collections/products';
import './product_list.html';
import './product_item.html';

Template.productList.helpers({
  products() {
    return Products.find({},{transform: function(doc){
      if (doc.photo){
        doc.photo = doc.photo.getFileRecord();
      }
      return doc;
    }});
  }
});
