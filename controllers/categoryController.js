const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.getCategories = (req, res, next) => {
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
        res.render('categoryList', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.categoryCreateGet = (req, res, next) => {
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
        res.render('categoryForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.categoryCreatePost = [
    body('category-name', 'Category name must not be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let category = new Category({
            name: req.body['category-name']
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

                results.category = category;

                res.render('categoryForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            category.save(e => {
                if(e) {return next(e);}
        
                res.redirect('/category');
            });
        }
    }
]

exports.categoryDeleteGet = (req, res, next) => {
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
            Product.find({category: req.params.id}, 'name')
                .exec(callback);
        },
        category: callback => {
            Category.findById(req.params.id, callback);
        }
    }, (err, results) => {
        res.render('categoryDelete', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.categoryDeletePost = (req, res, next) => {
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
            Product.find({category: req.params.id}, 'name')
                .exec(callback);
        },
        category: callback => {
            Category.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}

        if(results.products > 0) {
            res.render('categoryDelete', {title: '7-Sided Die', err: err, data: results});
        } else {
            Category.findByIdAndDelete(req.body['cat-id'], err => {
                if(err) {return next(err);}

                res.redirect('/category');
            });
        }
    });
}

exports.categoryUpdateGet = (req, res, next) => {
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
        category: callback => {
            Category.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if (err) {return next(err);}

        res.render('categoryForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.categoryUpdatePost = [
    body('category-name', 'Category name must not be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let category = new Category({
            name: req.body['category-name'],
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
                if (err) {return next(err);}

                results.category = category;
        
                res.render('categoryForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            Category.findByIdAndUpdate(req.params.id, category, {}, (err, theCat) => {
                if(err) {return next(err);}
        
                res.redirect('/category');
            });
        }
    }
]