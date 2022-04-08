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
        res.render('index', {title: '7-Sided Die', err: err, data: results});
    });
};

//List of products
exports.getProducts = (req, res, next) => {
    async.parallel({
        categoryList: callback => {
            Category.find({}, 'name')
                .exec(callback);
        },
        genreList: callback => {
            Genre.find({}, 'name')
                .exec(callback);
        },
        vendorList: callback => {
            Vendor.find({}, 'name')
                .exec(callback);
        },
        productList: callback => {
            Product.find({}, 'name stock vendor')
                .populate('vendor')
                .exec(callback);
        }
    }, (err, results) => {
        res.render('productList', {title: '7-Sided Die', err: err, data: results});
    });
}

//Single product
exports.productSingle = (req, res, next) => {
    async.parallel({
        product: callback => {
            Product.findById(req.params.id)
                .populate('vendor')
                .populate('category')
                .populate('genre')
                .exec(callback);
        },
        categoryList: callback => {
            Category.find({}, 'name')
                .exec(callback);
        },
        genreList: callback => {
            Genre.find({}, 'name')
                .exec(callback);
        },
        vendorList: callback => {
            Vendor.find({}, 'name')
                .exec(callback);
        }
    }, (err, results) => {
        if (!results.product.description) {
            results.product.description = 'Sorry, this product doesn\'t have a description yet.'
        }
        res.render('productSingle', {title: '7-Sided Die', err: err, data: results});
    });
}

//List of vendor products
exports.vendorProducts = (req, res, next) => {
    async.parallel({
        categoryList: callback => {
            Category.find({}, 'name')
                .exec(callback);
        },
        genreList: callback => {
            Genre.find({}, 'name')
                .exec(callback);
        },
        vendorList: callback => {
            Vendor.find({}, 'name')
                .exec(callback);
        },
        productList: callback => {
            Product.find({vendor: req.params.id}, 'name stock vendor')
                .populate('vendor')
                .exec(callback);
        }
    }, (err, results) => {
        res.render('productList', {title: '7-Sided Die', err: err, data: results});
    });
}