const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');

exports.getVendors = (req, res, next) => {
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
        }
    }, (err, results) => {
        res.render('vendorList', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.vendorCreateGet = (req, res, next) => {
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
        }
    }, (err, results) => {
        res.render('vendorForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.vendorCreatePost = (req, res, next) => {
    let vendor = new Vendor({
        name: req.body['vendor-name']
    });

    vendor.save(e => {
        if(e) {return next(e);}

        res.redirect('/vendors');
    });
}

exports.vendorDeleteGet = (req, res, next) => {
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
        products: callback => {
            Product.find({vendor: req.params.id}, 'name')
                .exec(callback);
        },
        vendor: callback => {
            Vendor.findById(req.params.id, callback);
        }
    }, (err, results) => {
        res.render('vendorDelete', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.vendorDeletePost = (req, res, next) => {
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
        products: callback => {
            Product.find({vendor: req.params.id}, 'name')
                .exec(callback);
        },
        vendor: callback => {
            Vendor.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}

        if(results.products > 0) {
            res.render('vendorDelete', {title: '7-Sided Die', err: err, data: results});
        }

        Vendor.findByIdAndDelete(req.body['vendor-id'], err => {
            if(err) {return next(err);}

            res.redirect('/vendors');
        });
    });
}