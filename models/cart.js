module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};  //if no items are present just return empty
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {//here id is the id which when the product is stored in the database is assigned with that
        var storedItem = this.items[id];
        if (!storedItem) {//if item is not added still then add it and increment the quantity outside
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;//else just add the quantity
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function () {//return the array of items stored in the elements
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};