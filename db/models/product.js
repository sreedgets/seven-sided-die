const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {type: String, required: true, minLength: 3, maxLength: 100},
        vendor: {type: Schema.Types.ObjectId, ref: 'Vendor', required: true},
        stock: {type: String, required: true},
        category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
        genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        price: {type: String, required: true}
    }
);

ProductSchema
    .virtual('url')
    .get(() => '/product/' + this._id);

module.exports = mongoose.model('Product', ProductSchema);