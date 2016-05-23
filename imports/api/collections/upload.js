import 'meteor/cfs:standard-packages';
import 'meteor/cfs:filesystem';

let Products = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "../../../uploads"})]
});

Products.allow({
  'insert': function () {
    return true;
  },
  'update': function () {
    return true;
  },
  'download': function(){
    return true;
  }
});

Products.on('stored', function (fileObj, storeName) {
  // do something
});
Products.on('uploaded', function (fileObj) {
  console.log('subido');
  // do something
});
Products.on('error', function (error, fileObj) {
  // this will be an upload error; to listen for store errors, listen on the stores themselves
});


export { Products };
