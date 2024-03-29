const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.getGenres = (req, res, next) => {
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
        
        res.render('genreList', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.genreCreateGet = (req, res, next) => {
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
        
        res.render('genreForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.genreCreatePost = [
    body('genre-name', 'Product name must not be empty').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let genre = new Genre({
            name: req.body['genre-name']
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

                results.genre = genre;
                
                res.render('genreForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            genre.save(e => {
                if(e) {return next(e);}
        
                res.redirect('/genres');
            });
        }
    }
]

exports.genreDeleteGet = (req, res, next) => {
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
            Product.find({genre: req.params.id}, 'name')
                .exec(callback);
        },
        genre: callback => {
            Genre.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}
        
        res.render('genreDelete', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.genreDeletePost = (req, res, next) => {
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
            Product.find({genre: req.params.id}, 'name')
                .exec(callback);
        },
        genre: callback => {
            Genre.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}

        if(results.products > 0) {
            res.render('genreDelete', {title: '7-Sided Die', err: err, data: results});
        }
        
        Genre.findByIdAndDelete(req.body['genre-id'], err => {
            if(err) {return next(err);}

            res.redirect('/genres');
        });
    });
}

exports.genreUpdateGet = (req, res, next) => {
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
        genre: callback => {
            Genre.findById(req.params.id, callback);
        }
    }, (err, results) => {
        if(err) {return next(err);}
        
        res.render('genreForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.genreUpdatePost = [
    body('genre-name', 'Genre name must not be empty').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let genre = new Genre({
            name: req.body['genre-name'],
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

                results.genre = genre;
                
                res.render('genreForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, theGenre) => {
                if(err) {return next(err);}
        
                res.redirect('/genres');
            });
        }
    }
]

/* exports.genreUpdatePost = (req, res, next) => {
    let genre = new Genre({
        name: req.body['genre-name'],
        _id: req.params.id
    });

    Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, theGenre) => {
        if(err) {return next(err);}

        res.redirect('/genres');
    });
} */