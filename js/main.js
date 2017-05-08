
"use strict";

function App() {
    this.init();
}

document.addEventListener('DOMContentLoaded',function() {
    new App();
});

App.prototype.init = function () {
    new Search();
    new Menu();
    new OfferBanner(document.querySelector('.extraOff'));
    new Filter(document.querySelector('.formFilter'));
    new ProductOptions(document.querySelector('.listOptions'));
    new Thumbnail(document.querySelector('.tumbs'));
    new Bag(document.querySelector('.addToBag'));
    new DetailItem(document.querySelector('.rowArrivals'));
    if (localStorage && sessionStorage) {
       this.storage();
    }
};

App.prototype.storage = function () {
    this.localStorageCommonPrice = (localStorage.commonPrice) ? localStorage.commonPrice : "";
    this.localStorageCountItems = (localStorage.countItems) ? localStorage.countItems : "";
    document.querySelector('.commonPrice').innerHTML = '£' + this.localStorageCommonPrice + '<span class="countItems">('+ this.localStorageCountItems +')</span>';
    var storageArr = [this.localStorageCommonPrice, this.localStorageCountItems];
    return storageArr;
};

Search.prototype = Object.create(App.prototype);
Menu.prototype = Object.create(App.prototype);
OfferBanner.prototype = Object.create(App.prototype);
Filter.prototype = Object.create(App.prototype);
ProductOptions.prototype = Object.create(App.prototype);
Thumbnail.prototype = Object.create(App.prototype);
Bag.prototype = Object.create(App.prototype);
DetailItem.prototype = Object.create(App.prototype);

window.addEventListener('resize', function(event){
    new OfferBanner(document.querySelector('.extraOff'));
});

function Search() {
    this.searchButton = document.querySelector('.searchButton');
    this.searchButton.addEventListener('click', this.openSearch.bind(this));
}

function Menu () {
    this.hamburger = document.querySelector('.mobileMenu');
    this.nav = document.querySelector('.nav');
    this.hamburger.addEventListener('click', this.openMenu.bind(this));
}

function Thumbnail(thumbnail) {
    if (!thumbnail) return;

    this.thumbnailBlock = thumbnail;
    this.fullImg = document.querySelector('.fullItem').querySelector('img');

    this.thumbnailBlock.addEventListener('click', this.doFullImg.bind(this));
}

function Bag (button) {
    if (!button) return;

    this.buttonAdd = button;
    this.count = 1;
    this.commonPrice = 0;
    this.id = 1;
    this.objCount = 0;
    this.buttonAdd.addEventListener('click', this.addGoose.bind(this));
}

function Filter (filter) {
    if (!filter) return;

    this.filterForm = filter;
    this.tabletLabel = document.querySelector('.filterTablet');
    this.desktopSelects = document.querySelector('.desktopSelects');
    this.selectItems = document.querySelectorAll('.selectItem');
    this.options = this.filterForm.querySelectorAll('option');
    this.tabletLabel.addEventListener('click', this.openFilter.bind(this));

    this.ww = window.innerWidth;
    if (this.ww > 1024) {
        this.desktopSelects.addEventListener('click', this.openSelect.bind(this));
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].addEventListener('click', this.closeSelect.bind(this, this.options[i]));
        }
    } else {
        this.filterTablet = document.querySelector('.filterTablet');

        for (var j = 0; j < this.selectItems.length; j++) {
            this.selectItems[j].querySelector('select').children[0].setAttribute('selected', 'selected');
            this.filterTablet.innerHTML +=  this.selectItems[j].querySelector('select').children[0].innerHTML + ',';
        }
    }
}

function ProductOptions (list) {
    if (!list) return;

    this.options = document.querySelector('.rowOptionsProduct ');
    this.options.addEventListener('click', this.addClassToOption.bind(this));
}

function OfferBanner (offer) {
    if (!offer) return;

    this.offer = offer;
    this.itemImg = document.querySelectorAll('.arrivalItem')[0];
    this.itemImg.style.cssText= 'margin-bottom:' + this.offer.clientHeight + 'px;';
}

function DetailItem (items) {
    if (!items) return;

    this.items = items;
    this.items.addEventListener('click', this.goToDetailItem.bind(this));
}

DetailItem.prototype.goToDetailItem = function (e) {
  var target = e && e.target || e.srcElement;

    var item = target.closest('.arrivalItem').getAttribute('data-product');
    if (!item) return;
    document.location.href = 'item' + item + '.html';
    return item;
};

Bag.prototype.addGoose = function (e) {
    e.preventDefault();
    if (document.querySelectorAll('.activeOption').length === document.querySelectorAll('.listOptions').length) {
        document.querySelector('.chooseOptions').classList.remove('display');

        this.commonPrice = document.querySelector('.priceItem').innerText.split('£')[1];
        localStorage.commonPrice = (+this.commonPrice) + (+this.storage()[0]);
        localStorage.countItems = (+this.count) + (+this.storage()[1]);
        document.querySelector('.commonPrice').innerHTML = '£' + localStorage.commonPrice + '<span class="countItems">('+ localStorage.countItems  +')</span>';
        this.cart(e);

    } else {
        document.querySelector('.chooseOptions').classList.add('display');
    }

};

Bag.prototype.cart = function (e) {
    this.objCount = 0;
    var cart =  (localStorage.cart) ? JSON.parse(localStorage.cart) : {},
        productName = document.querySelector('.nameProduct').innerText,
        productPrice = document.querySelector('.priceItem').innerText,
        productSize = document.querySelector('.sizeOptions').querySelector('.activeOption').innerText,
        productColor = document.querySelector('.colorOptions').querySelector('.activeOption').innerText;

    for (var key in cart) {
        this.objCount++;
    }
    this.id = (localStorage.cart) ? this.objCount : this.id;
    console.log(cart);
    cart[this.id] = {
        product: productName,
        price: productPrice,
        size: productSize,
        color: productColor,
        id: this.id
    };

    var obj = JSON.stringify(cart);
    localStorage.cart = obj;
    console.log(obj);

};

Thumbnail.prototype.doFullImg = function (e) {
    var target = e && e.target || e.srcElement;

    if (!target.parentNode.querySelector('img')) return;
    this.fullImg.src = target.parentNode.querySelector('img').src;
};


Search.prototype.openSearch = function () {
    document.querySelector('.search').classList.toggle('openSearch');
    document.querySelector('.searchForm').classList.toggle('display');
};

Menu.prototype.openMenu = function (e) {
    e.preventDefault();

    document.querySelector('.header').classList.toggle('openMenu');
    this.nav.classList.toggle('display');
};

ProductOptions.prototype.addClassToOption = function (e) {
    var target = e && e.target || e.srcElement;
    var listOption = target.parentNode;

    if (target.tagName != 'LI') return;
    for (var i = 0; i < listOption.children.length; i++) {
        listOption.children[i].classList.remove('activeOption');
    }
    target.classList.add('activeOption');
};

Filter.prototype.openFilter = function () {
    this.desktopSelects.classList.toggle('mobileSelects');
};

Filter.prototype.openSelect = function (e) {
    var target = e && e.target || e.srcElement;

    if (target.parentNode.getAttribute('class') != 'selectLabel') return;

    target = target.parentNode.parentNode;
    for (var i = 0; i < this.selectItems.length; i++) {
        if (this.selectItems[i] != target) {
            this.selectItems[i].querySelector('select').classList.remove('display');
        }
    }
    target.querySelector('select').classList.toggle('display');

    var optionLength = target.querySelector('select').children.length;
    target.querySelector('select').setAttribute('size', optionLength);
};

Filter.prototype.closeSelect = function (option) {
    this.valueFilter = option.closest('.selectItem').querySelector('.valueFilter');
    this.nameFilter = option.closest('.selectItem').querySelector('.nameFilter');

    option.closest('select').classList.remove('display');

    var optionVal = (option.value === 'notSelected') ?
                    this.filterStyles('remove', '', option) :
                    this.filterStyles('add', option.innerText, option);

    return optionVal;

};

Filter.prototype.filterStyles = function (method, value, option) {
    var firstItem = document.querySelector('.desktopSelects').firstElementChild;
    var lastItem = document.querySelector('.desktopSelects').lastElementChild;

    option.closest('.selectItem').classList[method]('selectedItem');
    this.nameFilter.classList[method]('nameFilterSmall');
    this.valueFilter.innerHTML = value;


    if (option.closest('.selectItem') === firstItem) {
        document.querySelector('.filter').classList[method]('firstSelected');
    }
    if (option.closest('.selectItem') === lastItem) {
        document.querySelector('.filter').classList[method]('lastSelected');
    }

};











