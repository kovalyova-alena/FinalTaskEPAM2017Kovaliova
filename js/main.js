
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
   // new ChangeMarkup();

};

Search.prototype = Object.create(App.prototype);
ChangeMarkup.prototype = Object.create(App.prototype);
Menu.prototype = Object.create(App.prototype);

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

Search.prototype.openSearch = function () {
    document.querySelector('.search').classList.toggle('openSearch');
    document.querySelector('.searchForm').classList.toggle('display');
};

Menu.prototype.openMenu = function (e) {
    e.preventDefault();

    document.querySelector('.header').classList.toggle('openMenu');
    this.nav.classList.toggle('display');

};






