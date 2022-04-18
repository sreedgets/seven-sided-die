const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');

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

exports.genreCreatePost = (req, res, next) => {
    let genre = new Genre({
        name: req.body['genre-name']
    });

    genre.save(e => {
        if(e) {return next(e);}

        res.redirect('/genres');
    });
}