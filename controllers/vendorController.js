const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');
const { body, validationResult } = require('express-validator');

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

exports.vendorCreatePost = [
    body('vendor-name', 'Vendor name must not be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let vendor = new Vendor({
            name: req.body['vendor-name']
        });

        if (!errors.isEmpty()) {
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
                if (err) {return next(err);}

                results.vendor = vendor;

                res.render('vendorForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            vendor.save(e => {
                if(e) {return next(e);}
        
                res.redirect('/vendors');
            });
        }
    }
]

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

exports.vendorUpdateGet = (req, res, next) => {
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
        vendor: callback => {
            Vendor.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}

        res.render('vendorForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.vendorUpdatePost = [
    body('vendor-name', 'Vendor name must not be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let vendor = new Vendor({
            name: req.body['vendor-name'],
            _id: req.params.id
        });
    
        if (!errors.isEmpty()) {
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
                if(err) {return next(err);}

                results.vendor = vendor;
        
                res.render('vendorForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            Vendor.findByIdAndUpdate(req.params.id, vendor, {}, (err, theVendor) => {
                if(err) {return next(err);}
        
                res.redirect('/vendors');
            });
        }
    }
]