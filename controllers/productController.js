const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');

exports.getIndex = (req, res, next) => {
    async.parallel({
        productCount: callback => {
            Product.countDocuments({}, callback);
        },
        vendorCount: callback => {
            Vendor.countDocuments({}, callback);
        },
        vendorList: callback => {
            Vendor.find({}, 'name')
                .exec(callback);
        },
        categoryCount: callback => {
            Category.countDocuments({}, callback);
        },
        categoryList: callback => {
            Category.find({}, 'name')
                .exec(callback);
        },
        genreCount: callback => {
            Genre.countDocuments({}, callback);
        },
        genreList: callback => {
            Genre.find({}, 'name')
                .exec(callback);
        }
    }, (err, results) => {
        console.log(results);
        res.render('index', {title: '7-Sided Die', err: err, data: results});
    });
};
