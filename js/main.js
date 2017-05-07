
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
    new AddToBag(document.querySelector('.addToBag'));
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
AddToBag.prototype = Object.create(App.prototype);

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

function AddToBag (button) {
    if (!button) return;

    this.buttonAdd = button;
    this.count = 1;
    this.commonPrice = 0;
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

AddToBag.prototype.addGoose = function (e) {
    if (document.querySelectorAll('.activeOption').length === document.querySelectorAll('.listOptions').length) {
        document.querySelector('.chooseOptions').classList.remove('display');

        var price = document.querySelector('.priceItem').innerText.split('£')[1];

        this.commonPrice += +price;
        localStorage.commonPrice = +this.commonPrice + +this.storage()[0];
        localStorage.countItems = +this.count+ +this.storage()[1];
        this.count++;
        document.querySelector('.commonPrice').innerHTML = '£' + localStorage.commonPrice + '<span class="countItems">('+ localStorage.countItems  +')</span>';


    } else {
        document.querySelector('.chooseOptions').classList.add('display');
    }

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

    if (listOption.getAttribute('data-option') === null) return;
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











