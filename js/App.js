
"use strict";

function App() {
    this.init();
}

document.addEventListener('DOMContentLoaded',function() {
    new App();
});

App.prototype.init = function () {
    this.polyfillClosest();
    new Search();
    new Menu();
    new OfferBanner(document.querySelector('.extraOff'));
    new Filter(document.querySelector('.formFilter'));
    new ProductOptions(document.querySelector('.listOptions'));
    new Thumbnail(document.querySelector('.tumbs'));
    new Bag(document.querySelector('.addToBag'));
    new GoToItem(document.querySelector('.rowArrivals'));

    if (window.localStorage && window.sessionStorage) {
        this.storage();
    }


    
    new Shop(document.querySelector('.shoppingBag'));
    new Slider(document.querySelector('.slider'), true, 5000);
};

App.prototype.storage = function () {
    this.localStorageCommonPrice = (localStorage.commonPrice) ? localStorage.commonPrice : "";
    this.localStorageCountItems = (localStorage.countItems) ? localStorage.countItems : "";
    document.querySelector('.commonPrice').innerHTML = '£' + this.localStorageCommonPrice + '<span class="countItems">('+ this.localStorageCountItems +')</span>';
    var storageArr = [this.localStorageCommonPrice, this.localStorageCountItems];
    return storageArr;
};

App.prototype.polyfillClosest = function () {
    if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
    if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
        var el = this;
        while (el) {
            if (el.matches(selector)) {
                return el;
            }
            el = el.parentElement;
        }
    };
};

Search.prototype = Object.create(App.prototype);
Menu.prototype = Object.create(App.prototype);
OfferBanner.prototype = Object.create(App.prototype);
Filter.prototype = Object.create(App.prototype);
ProductOptions.prototype = Object.create(App.prototype);
Thumbnail.prototype = Object.create(App.prototype);
Bag.prototype = Object.create(App.prototype);
GoToItem.prototype = Object.create(App.prototype);
Shop.prototype = Object.create(App.prototype);
Slider.prototype = Object.create(App.prototype);

window.addEventListener('resize', function(event){
    new OfferBanner(document.querySelector('.extraOff'));
});