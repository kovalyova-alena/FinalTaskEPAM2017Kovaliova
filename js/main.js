
"use strict";

function App() {
    this.init();
}

document.addEventListener('DOMContentLoaded',function() {
    new App();
});

App.prototype.init = function () {
    new Slider(document.querySelector('.slider'));
    new Menu();
    new Portfolio(document.querySelector('.portfolioImg'));

};

Slider.prototype = Object.create(App.prototype);
Menu.prototype = Object.create(App.prototype);
Portfolio.prototype = Object.create(App.prototype);


function Menu() {
    this.menu = document.querySelector('.menu');
    this.burger = document.querySelector('.blockBurger');
    this.burger.addEventListener('click', this.openCloseMenu.bind(this));
}

function Slider () {
}

function Portfolio(portfolio) {
    if (!portfolio) return;

    this.portfolio = portfolio;
    this.portfolio.addEventListener('click', this.openImg.bind(this));

}
Menu.prototype.openCloseMenu = function () {
    this.menu.classList.toggle('displayMenu');
};

Portfolio.prototype.openImg = function (e) {
    var target = e && e.target || e.srcElement;
    var div = document.createElement('div');
    if (target.src) {
        console.log(target);
        target.className += " imgFixed";
        div.className += " overlayPortfolio";
       target.parentElement.appendChild(div);


       if (document.querySelector('.overlayPortfolio')) {
           document.querySelector('.overlayPortfolio').addEventListener('click', function (e) {

               document.querySelector('.overlayPortfolio').className = '';
               target.className = "";

           });
           target.addEventListener('click', function (e) {
               document.querySelector('.overlayPortfolio').className = '';
           });
       }
   }
};

/*
function Slider (slider) {
    if (!slider) return;

    this.sliderNews = slider;
    this.sliderNewsWidth = this.sliderNews.clientWidth;
    this.items = document.querySelectorAll('.val-list-slider-item');
    this.controls = document.querySelector('.val-display-controls');
    this.generatePoints(this.items.length);
    this.controls.addEventListener('click', this.moveSliderOnClick.bind(this));
    this.currentSlide = 0;

    if (auto||auto === true) {
        var seconds = sec ? sec : 4000;
        this.autoSlider(seconds);
        this.sliderNews.addEventListener('mouseenter', this.clearInterval.bind(this));
        this.sliderNews.addEventListener('mouseleave', this.autoSlider.bind(this, seconds));
    }
}

Slider.prototype = Object.create(App.prototype);

Slider.prototype.generatePoints = function(number) {
    var	str = "";

    for (var i = 1; i <= number; i++) {
        str +=  '<span data-controls="' + i + '"> </span>';
    }

    this.controls.insertAdjacentHTML('afterBegin', str);
    var active = this.controls.firstElementChild.classList.add('-active-slide');
}

Slider.prototype.moveSliderOnClick = function (e) {
    var target = e && e.target || e.srcElement;

    if (!target) return;
    if (target.getAttribute('data-controls')) {
        var dataAttr = target.getAttribute('data-controls');
        this.currentSlide = (dataAttr-1);
        this.moveSlides(target);
    }
}

Slider.prototype.autoSlider = function (seconds) {
    this.slideInterval = setInterval(this.nextSlide.bind(this), seconds);
}

Slider.prototype.nextSlide = function (seconds) {
    this.currentSlide = (this.currentSlide+1)%this.items.length;
    this.moveSlides(this.controls.children[this.currentSlide]);
}

Slider.prototype.moveSlides = function (activeCurrent) {
    var ul = document.querySelector('.val-list-slider'),
        active = document.querySelector('.-active-slide');

    active.classList.remove('-active-slide');
    activeCurrent.classList.add('-active-slide');
    ul.style.cssText = "transform: translateX(-" + (this.sliderNewsWidth-1)*(this.currentSlide) +"px); transition: 0.5s";
}

Slider.prototype.clearInterval = function () {
    clearInterval(this.slideInterval);
}


*/





