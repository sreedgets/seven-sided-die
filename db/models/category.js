const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {type: String, required: true}
    }
);

CategorySchema
    .virtual('url')
    .get(() => '/category/' + this._id);

CategorySchema
    .virtual('products')
    .get(function() {
        return '/products/category/' + this._id;
    });
module.exports = mongoose.model('Category', CategorySchema);