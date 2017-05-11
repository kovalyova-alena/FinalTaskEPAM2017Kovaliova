function Slider (slider, auto, sec) {
	if (!slider) return;
	 
	this.slider = slider;
	this.sliderWidth = this.slider.clientWidth;
	this.items = document.querySelectorAll('.sliderItem');
	this.controls = document.querySelector('.controls');
	this.ul = document.querySelector('.sliderList');
	this.ulWidth = this.ul.firstElementChild.clientWidth*this.items.length;
	this.ul.style.cssText = 'width:' + this.ulWidth+ 'px';
	this.generatePoints(this.items.length);
	this.controls.addEventListener('click', this.moveSliderOnClick.bind(this));
	this.currentSlide = 0;

	if (auto||auto === true) {
		var seconds = sec ? sec : 4000;
		this.autoSlider(seconds);
		this.slider.addEventListener('mouseenter', this.clearInterval.bind(this));
		this.slider.addEventListener('mouseleave', this.autoSlider.bind(this, seconds));
	}
}


Slider.prototype.generatePoints = function(number) {
	var	str = "";

	for (var i = 1; i <= number; i++) {
		str +=  '<span data-controls="' + i + '"> </span>';
	}

	this.controls.innerHTML = '';
	this.controls.insertAdjacentHTML('afterBegin', str);
	var active = this.controls.firstElementChild.classList.add('activeSlide');
};

Slider.prototype.moveSliderOnClick = function (e) {
	var target = e && e.target || e.srcElement;

    if (!target) return;
	console.log(target);
    if (target.getAttribute('data-controls')) {
        var dataAttr = target.getAttribute('data-controls');
        this.currentSlide = (dataAttr-1);
        this.moveSlides(target);
    }
};

Slider.prototype.autoSlider = function (seconds) {
	this.slideInterval = setInterval(this.nextSlide.bind(this), seconds);
};

Slider.prototype.nextSlide = function (seconds) {
	this.currentSlide = (this.currentSlide+1)%this.items.length;
	this.moveSlides(this.controls.children[this.currentSlide]);
};

Slider.prototype.moveSlides = function (activeCurrent) {
	var ul = document.querySelector('.sliderList'),
		active = document.querySelector('.activeSlide'),
		ulWidth = this.ul.firstElementChild.clientWidth*this.items.length;

	active.classList.remove('activeSlide');
	activeCurrent.classList.add('activeSlide');
	
	ul.style.cssText = "transform: translateX(-" + (this.sliderWidth-1)*(this.currentSlide) +"px); transition: 0.5s; width:" + ulWidth + "px";
};

Slider.prototype.clearInterval = function () {
	clearInterval(this.slideInterval);
};








