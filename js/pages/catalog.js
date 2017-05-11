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
        this.desktopToggle();
    } else {
       this.mobileSelectedOptions();
    }
}


function OfferBanner (offer) {
    if (!offer) return;

    this.offer = offer;
    this.itemImg = document.querySelectorAll('.arrivalItem')[0];
    this.itemImg.style.cssText= 'margin-bottom:' + (this.offer.clientHeight + this.offer.clientHeight/4) + 'px;';
}


function GoToItem (items) {
    if (!items) return;

    this.items = items;
    this.items.addEventListener('click', this.goToDetailItem.bind(this));
}


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

Filter.prototype.desktopToggle = function () {
    this.desktopSelects.addEventListener('click', this.openSelect.bind(this));
    for (var i = 0; i < this.options.length; i++) {
       this.options[i].closest('select').addEventListener('click', this.closeSelect.bind(this));
    }
};

Filter.prototype.closeSelect = function (e) {
    var target = e && e.target || e.srcElement;

    this.valueFilter = target.closest('.selectItem').querySelector('.valueFilter');
    this.nameFilter = target.closest('.selectItem').querySelector('.nameFilter');

    target.closest('select').classList.remove('display');

    target = (target.tagName == 'SELECT') ? target(target.options.selectedIndex) : target;
    var optionVal = (target.value === 'notSelected') ?
        this.filterStyles('remove', '', target) :
        this.filterStyles('add', target.innerText, target);

    return optionVal;

};

Filter.prototype.filterStyles = function (method, value, option) {
    console.log(value ,option);
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


Filter.prototype.mobileSelectedOptions = function () {
    this.filterTablet = document.querySelector('.filterTablet');

    for (var j = 0; j < this.selectItems.length; j++) {
        this.selectItems[j].querySelector('select').children[0].setAttribute('selected', 'selected');
        this.filterTablet.innerHTML +=  this.selectItems[j].querySelector('select').children[0].innerHTML + ',';
    }
};


GoToItem.prototype.goToDetailItem = function (e) {
    var target = e && e.target || e.srcElement;

    var item = target.closest('.arrivalItem').getAttribute('data-product');
    if (!item) return;
    document.location.href = 'item' + item + '.html';
    return item;
};

