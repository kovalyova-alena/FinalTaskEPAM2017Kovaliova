
function Shop (shop) {
    if (!shop) return;

    this.shop = shop;
    this.buttonBuy = document.querySelector('.buyNow');
    this.totalCost = document.querySelector('.totalCost');
    this.emptyBag = document.querySelector('.emptyBag');
    this.cart =  (localStorage.cart) ? JSON.parse(localStorage.cart) : {};
    this.checkEmpty();
    var str = '';
    this.buttonBuy.addEventListener('click', this.buyGoose.bind(this));
    this.emptyBag.addEventListener('click', this.clearBag.bind(this, ''));
    this.totalSum();

    for (var key in this.cart) {
        str = this.createItem(this.cart[key], key);
        document.querySelector('.shopItems').insertAdjacentHTML('beforeEnd', str);
    }

    this.removeButton = document.querySelectorAll('.removeItem');

    for (var i = 0; i < this.removeButton.length; i++) {
        this.removeButton[i].addEventListener('click', this.removeItem.bind(this));
    }
}

Shop.prototype.createItem = function (item, key) {
    var str = '<div class="shoppingBlock clearfix" data-block="'+ key +'">'+
        '<div class="shopImg">'+
        '<img src="' + item.img + '" alt="">'+
        '<p class="priceBag">' + item.price + '</p>'+
        '</div>'+
        '<div class="shopOptions">'+
        '<p class="titleProduct"><a href="item1.html" class="productBag">' + item.product + '</a></p>'+
        '<p class="optionBag">Color: <span class="colorBag">' + item.color + '</span></p>'+
        '<p class="optionBag">Size: <span class="sizeBag">' + item.size +'</span></p>'+
        '<p class="optionBag">Quantity: <span class="quantityBag">' + item.qw +'</span></p>'+
        '<p class="removeItem">Remove Item</p>'+
        '</div>'+
        '</div>';
    return str;
};

Shop.prototype.buyGoose = function (e) {
    e.preventDefault();
    this.clearBag();
    document.querySelector('.shopItems').innerHTML = '<p class="thanks">Thank you for your purchase</p>';
    this.totalSum();
};

Shop.prototype.removeItem = function (e) {
    var target = e && e.target || e.srcElement,
        item = target.closest('.shoppingBlock'),
        data = item.getAttribute('data-block'),
        price = 0,
        quantityOfGooses = 0;

    item.parentNode.removeChild(item);
    delete this.cart[data];

    var object = JSON.stringify(this.cart);
    localStorage.cart = object;

    this.cart =  (localStorage.cart) ? JSON.parse(localStorage.cart) : {};
    for (var key in this.cart) {
        quantityOfGooses++;
        price += +this.cart[key].price.split('£')[1]*this.cart[key].qw;
    }

    localStorage.countItems = quantityOfGooses;
    localStorage.commonPrice = price;
    document.querySelector('.commonPrice').innerHTML = '£' + localStorage.commonPrice + '<span class="countItems">('+ localStorage.countItems  +')</span>';
    this.checkEmpty();
    this.totalSum();
};


Shop.prototype.clearBag = function (param, e) {
    if (e) e.preventDefault();

    localStorage.clear();
    document.querySelector('.commonPrice').innerHTML = '';

    if (param == '') {
        this.emptyInfo();
        this.totalSum();
    }
};

Shop.prototype.emptyInfo = function () {
    document.querySelector('.shopItems').innerHTML = '<p class="empty">Your shopping bag is empty. Use Catalog to add new items</p>';
};

Shop.prototype.checkEmpty = function () {
    if (localStorage.cart == '{}' ||localStorage.cart == undefined) {
        this.emptyInfo();
    }
};
Shop.prototype.totalSum = function () {
    this.totalCost.innerHTML = localStorage.commonPrice ? ('£ ' + localStorage.commonPrice) : '£ 0';
};
