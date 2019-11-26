var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({ //schema of item displayed on fron page
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Product', schema);//accessing a model