const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String}
    }
);

VendorSchema
    .virtual('url')
    .get(function() {
        return '/vendors/' + this._id ;
    });

module.exports = mongoose.model('Vendor', VendorSchema);