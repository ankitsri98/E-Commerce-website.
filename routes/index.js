var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMgs = req.flash('success')[0];
    Product.find(function(err, docs){ //database comes with the name docs
        var productChunks = [];
        var chunkSize = 3;//in 1 row 3 items
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i  + chunkSize));
        }
        res.render('shop/index', { title: 'Shopping cart', products: productChunks, successMgs: successMgs, noMessage: !successMgs });
        //render renderes html file in shop naming index.hbs in body of layout.hbs and further writes other dynamic attributes in curly brackets
        //means that all attributes are defined in index.hbs and we are using it by modifying ourself       
    });
});
// here get request is used as a req. is being received  when the button is clicked   
router.get('/add-to-cart/:id', function (req, res) {//this id is that id which every product gets when it  get stored in database
    var productId = req.params.id;//if cart is non empty then return that else return empty {}
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function (req, res, next) {
    if(!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    return res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    return res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_pVJhFSD0tie3QmfWqzusM6ib"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}