const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');

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

exports.categoryCreatePost = (req, res, next) => {
    let category = new Category({
        name: req.body['category-name']
    });

    category.save(e => {
        if(e) {return next(e);}

        res.redirect('/category');
    });
}

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

exports.categoryUpdatePost = (req, res, next) => {
    let category = new Category({
        name: req.body['category-name'],
        _id: req.params.id
    });

    Category.findByIdAndUpdate(req.params.id, category, {}, (err, theCat) => {
        if(err) {return next(err);}

        res.redirect('/category');
    });
}