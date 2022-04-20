const Product = require('../db/models/product');
const Vendor = require('../db/models/vendor');
const Category = require('../db/models/category');
const Genre = require('../db/models/genre');
const async = require('async');
const { body, validationResult } = require('express-validator');


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
            Product.find({})
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

//List of products in a category
exports.categoryProducts = (req, res, next) => {
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
            Product.find({category: req.params.id}, 'name stock vendor')
                .populate('vendor')
                .exec(callback);
        }
    }, (err, results) => {
        res.render('productList', {title: '7-Sided Die', err: err, data: results});
    });
}

//List of products in a genre
exports.genreProducts = (req, res, next) => {
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
            Product.find({genre: req.params.id}, 'name stock vendor')
                .populate('vendor')
                .exec(callback);
        }
    }, (err, results) => {
        res.render('productList', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.productFormGet = (req, res, next) => {
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
        res.render('productForm', {title: '7-Sided Die', err: err, data: results});
    });
};
``
exports.productCreatePost = [
    (req, res, next) => {
        if(!(req.body['product-genre'] instanceof Array)) {
            if (typeof req.body['product-genre'] === 'undefined') {
                req.body['product-genre'] = [];
            } else {
                req.body['product-genre'] = new Array(req.body['product-genre']);
            }
        }
    
        if(!(req.body['product-category'] instanceof Array)) {
            if (typeof req.body['product-category'] === 'undefined') {
                req.body['product-category'] = [];
            } else {
                req.body['product-category'] = new Array(req.body['product-category']);
            }
        }

        next();
    },
    body('product-name', 'Product name must not be empty').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        let product = new Product({
            name: req.body['product-name'],
            vendor: req.body['product-vendor'],
            stock: req.body['product-stock'],
            category: req.body['product-category'],
            genre: req.body['product-genre'],
            price: req.body['product-price'],
            description: req.body['product-description'],
            image: req.file ? req.file.filename : null
        });

        if(!errors.isEmpty()) {
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

                for (let i = 0; i < results.genreList.length; i++) {
                    for (let g = 0; g < product.genre.length; g++) {
                        if(results.genreList[i]._id.toString() === product.genre[g]._id.toString()) {
                            results.genreList[i].checked = 'checked="true"';
                        }
                    }
                }
        
                for (let i = 0; i < results.categoryList.length; i++) {
                    for (let c = 0; c < product.category.length; c++) {
                        if (results.categoryList[i]._id.toString() === product.category[c]._id.toString()) {
                            results.categoryList[i].checked = 'checked="true"';
                        }
                    }
                }

                results.product = product;

                res.render('productForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            });
        } else {
            product.save(err => {
                if(err) {return next(err);}
        
                res.redirect(product.url);
            });
        }
    }
];

exports.productUpdateGet = (req, res, next) => {
    async.parallel({
        categoryList: callback => {
            Category.find({})
                .exec(callback);
        },
        genreList: callback => {
            Genre.find({})
                .exec(callback);
        },
        vendorList: callback => {
            Vendor.find({})
                .exec(callback);
        },
        product: callback => {
            Product.findById(req.params.id)
                .populate('vendor')
                .populate('category')
                .populate('genre')
                .exec(callback);
        }
    }, (err, results) => {
        for (let i = 0; i < results.genreList.length; i++) {
            for (let g = 0; g < results.product.genre.length; g++) {
                if(results.genreList[i]._id.toString() === results.product.genre[g]._id.toString()) {
                    results.genreList[i].checked = 'checked="true"';
                }
            }
        }

        for (let i = 0; i < results.categoryList.length; i++) {
            for (let c = 0; c < results.product.category.length; c++) {
                if (results.categoryList[i]._id.toString() === results.product.category[c]._id.toString()) {
                    results.categoryList[i].checked = 'checked="true"';
                }
            }
        }
        res.render('productForm', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.productUpdatePost = [
    (req, res, next) => {
        if(!(req.body['product-genre'] instanceof Array)) {
            if (typeof req.body['product-genre'] === 'undefined') {
                req.body['product-genre'] = [];
            } else {
                req.body['product-genre'] = new Array(req.body['product-genre']);
            }
        }
    
        if(!(req.body['product-category'] instanceof Array)) {
            if (typeof req.body['product-category'] === 'undefined') {
                req.body['product-category'] = [];
            } else {
                req.body['product-category'] = new Array(req.body['product-category']);
            }
        }

        next();
    },
    body('product-name', 'Product name must not be empty').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        async.parallel({
            categoryList: callback => {
                Category.find({})
                    .exec(callback);
            },
            genreList: callback => {
                Genre.find({})
                    .exec(callback);
            },
            vendorList: callback => {
                Vendor.find({})
                    .exec(callback);
            },
            product: callback => {
                Product.findById(req.params.id)
                    .populate('vendor')
                    .exec(callback);
            }
        }, (err, results) => {
            if (err) {return next(err);}
            const errors = validationResult(req);

            let product = new Product({
                name: req.body['product-name'],
                vendor: req.body['product-vendor'],
                stock: req.body['product-stock'],
                category: (typeof req.body['product-category'] === 'undefined') ? [] : req.body['product-category'],
                genre: (typeof req.body['product-genre'] === 'undefined') ? [] : req.body['product-genre'],
                price: req.body['product-price'],
                description: req.body['product-description'],
                image: req.file ? req.file.filename : results.product.image,
                _id: req.params.id
            });

            if (!errors.isEmpty()) {
                for (let i = 0; i < results.genreList.length; i++) {
                    for (let g = 0; g < product.genre.length; g++) {
                        if(results.genreList[i]._id.toString() === product.genre[g]._id.toString()) {
                            results.genreList[i].checked = 'checked="true"';
                        }
                    }
                }
        
                for (let i = 0; i < results.categoryList.length; i++) {
                    for (let c = 0; c < product.category.length; c++) {
                        if (results.categoryList[i]._id.toString() === product.category[c]._id.toString()) {
                            results.categoryList[i].checked = 'checked="true"';
                        }
                    }
                }

                results.product = product;

                res.render('productForm', {title: '7-Sided Die', err: err, data: results, errors: errors.array()});
            } else {
                Product.findByIdAndUpdate(req.params.id, product, {}, (err, theProduct) => {
                    if(err) {return next(err);}
            
                    res.redirect(theProduct.url);
                });
            }
        });
    }
];

exports.productDeleteGet = (req, res, next) => {
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
        product: callback => {
            Product.findById(req.params.id, callback);
        }
    }, (err, results) => {
        res.render('productDelete', {title: '7-Sided Die', err: err, data: results});
    });
}

exports.productDeletePost = (req, res, next) => {
    Product.findByIdAndDelete(req.body['product-id'], err => {
        if(err) {return next(err);}

        res.redirect('/products');
    });
}

/* exports.testFormGet = (req, res, next) => {
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
        res.render('testForm', {title: '7-Sided Die', err: err, data: results});
    });
};

exports.testFormPost = [
    upload.single('image'),
    (req, res, next) => {
        res.send(req.file);
    }
];
 */