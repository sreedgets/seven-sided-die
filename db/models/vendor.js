const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        name: {type: String, required: true},
    }
);

VendorSchema
    .virtual('url')
    .get(function() {
        return '/vendors/' + this._id ;
    });

VendorSchema
    .virtual('products')
    .get(function() {
        return '/products/vendor/' + this._id;
    });
module.exports = mongoose.model('Vendor', VendorSchema);