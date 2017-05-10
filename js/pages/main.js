function Search() {
    this.searchButton = document.querySelector('.searchButton');
    this.searchButton.addEventListener('click', this.openSearch.bind(this));
}

function Menu () {
    this.hamburger = document.querySelector('.mobileMenu');
    this.nav = document.querySelector('.nav');
    this.hamburger.addEventListener('click', this.openMenu.bind(this));
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

