
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
   // new ChangeMarkup();

};

Search.prototype = Object.create(App.prototype);
ChangeMarkup.prototype = Object.create(App.prototype);
Menu.prototype = Object.create(App.prototype);
OfferBanner.prototype = Object.create(App.prototype);
Filter.prototype = Object.create(App.prototype);

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

function ChangeMarkup() {

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
    }
}

function OfferBanner (offer) {
    if (!offer) return;

    this.offer = offer;
    this.itemImg = document.querySelectorAll('.arrivalItem')[0];
    this.itemImg.style.cssText= 'margin-bottom:' + this.offer.clientHeight + 'px;';
}


Search.prototype.openSearch = function () {
    document.querySelector('.search').classList.toggle('openSearch');
    document.querySelector('.searchForm').classList.toggle('display');
};

Menu.prototype.openMenu = function (e) {
    e.preventDefault();

    document.querySelector('.header').classList.toggle('openMenu');
    this.nav.classList.toggle('display');
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







