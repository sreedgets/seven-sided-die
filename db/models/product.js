const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {type: String, required: true, minLength: 3, maxLength: 30},
        vendor: {type: Schema.Types.ObjectId, ref: 'Vendor', required: true},
        stock: {type: String, required: true},
        categories: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
    }
);

ProductSchema
    .virtual('url')
    .get(() => '/product/' + this._id);