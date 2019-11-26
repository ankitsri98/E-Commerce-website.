var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');
// var pro= new Product() so by doing this we store 1 product of SCHEMA "Product" in variable pro....but here we have 
//done the same thing in array so that we can use loop.
var products = [
    new Product({
        imagePath: 'https://rukminim1.flixcart.com/image/352/352/j65cnm80/flour/z/s/r/1-superior-mp-atta-whole-wheat-flour-aashirvaad-original-imaewzbkfqhy4dhq.jpeg?q=70',
        title: 'Fresh Chakki aata',
        description: '1kg aata',
        price: 32
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/61ZhyN3P4tL._SX425_.jpg',
        title: 'Maida',
        description: '1kg maida',
        price: 30
    }),
    new Product({
        imagePath: 'https://cdn.grofers.com/app/images/products/full_screen/pro_52.jpg',
        title: 'Soyabean oil',
        description: '1L soyabean oil',
        price: 45
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/61SacrIvdEL._SL1000_.jpg',
        title: 'Salt',
        description: '1kg tata salt',
        price: 18
    }),
    new Product({
        imagePath: 'https://d27zlipt1pllog.cloudfront.net/pub/media/catalog/product/b/o/bou0001_1.jpg',
        title: 'Bournvita',
        description: '1kg Bournvita',
        price: 62
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/61kMbAz6gqL._SL1000_.jpg',
        title: 'Surf-excel',
        description: '2kg Surf-excel',
        price: 72
    }),
    new Product({
        imagePath: 'https://cdn.shopclues.com/images1/thumbnails/78326/320/320/133733160-78326689-1540560903.jpg',
        title: 'Almonds',
        description: '1kg almonds',
        price: 123
    }),
    new Product({
        imagePath: 'https://www.pureindianfoods.com/v/vspfiles/photos/GHEE-2T.jpg',
        title: 'ghee',
        description: '1kg ghee',
        price: 68
    }),
    new Product({
        imagePath: 'https://assetscdn1.paytm.com/images/catalog/product/F/FA/FASFORTUNE-MUSTBIGB98583274A0622B/1561494139550_0.jpg?imwidth=320&impolicy=hq',
        title: 'mustuard-oil',
        description: '1L mustuard-oil',
        price: 55
    }),
    new Product({
        imagePath: 'https://5.imimg.com/data5/YD/DJ/MY-70422967/skyplus-sugar-500x500.jpg',
        title: 'sugar',
        description: '1kg sugar',
        price: 40
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71qyzy9QnML._SL1500_.jpg',
        title: 'Oats',
        description: '1kg Oats',
        price: 45
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/610US2bRp0L._SX466_.jpg',
        title: 'colgate',
        description: '110g colgate',
        price: 28
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/f0d3e9bf-ac3f-47c2-a058-4562c8380bfb_1.5b84b462ac7fd1c3e744dc51ecf6b236.jpeg',
        title: 'Corn flakes',
        description: '1kg corn flakes',
        price: 40
    }),
    new Product({
        imagePath: 'https://d27zlipt1pllog.cloudfront.net/pub/media/catalog/product/d/e/det0001.jpg',
        title: 'Dettol',
        description: '110 ml',
        price: 62
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81kRgoWLYWL._SX679_.jpg',
        title: 'Nescafe Coffe',
        description: '250 gm',
        price: 45
    })

];
//array of product name is products
var done = 0;
//looping is done over all products but as we know that node is a-synchronous so when we save a particular product 
//in database named shopping ...but till it is getting saved ....till then it may disconnect the sercer so when 
//our counter become equal to the length of items then only disconnect elese never disconnect.
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if(done == products.length)
            exit();
    });
}
function exit() {
    mongoose.disconnect();
}