function Bag (button) {
    if (!button) return;

    this.buttonAdd = button;
    this.cart =  (localStorage.cart) ? JSON.parse(localStorage.cart) : {};
    this.buttonAdd.addEventListener('click', this.addGoose.bind(this));
}

function Thumbnail(thumbnail) {
    if (!thumbnail) return;

    this.thumbnailBlock = thumbnail;
    this.fullImg = document.querySelector('.fullItem').querySelector('img');
    this.thumbnailBlock.addEventListener('click', this.doFullImg.bind(this));
}

function ProductOptions (list) {
    if (!list) return;

    this.options = document.querySelector('.rowOptionsProduct ');
    this.options.addEventListener('click', this.addClassToOption.bind(this));
}


Thumbnail.prototype.doFullImg = function (e) {
    var target = e && e.target || e.srcElement;

    if (!target.parentNode.querySelector('img')) return;
    this.fullImg.src = target.parentNode.querySelector('img').src;
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


Bag.prototype.addGoose = function (e) {
    e.preventDefault();
    var quantityOfGooses = 0;
    var price = 0;

    if (document.querySelectorAll('.activeOption').length === document.querySelectorAll('.listOptions').length) {
        document.querySelector('.chooseOptions').classList.remove('display');
        document.querySelector('.addedGoose').classList.remove('display');
        this.addCart(e);

        for (var key in this.cart) {
            quantityOfGooses++;
            price += +this.cart[key].price.split('£')[1]*this.cart[key].qw;
        }

        localStorage.countItems = quantityOfGooses;
        localStorage.commonPrice = price;
        document.querySelector('.commonPrice').innerHTML = '£' + localStorage.commonPrice + '<span class="countItems">('+ localStorage.countItems  +')</span>';
        document.querySelector('.addedGoose').classList.add('display');
    } else {
        document.querySelector('.chooseOptions').classList.add('display');
    }
};

Bag.prototype.addCart = function (e) {
    var productName = document.querySelector('.nameProduct').innerText,
        productPrice = document.querySelector('.priceItem').innerText,
        productSize = document.querySelector('.sizeOptions').querySelector('.activeOption').innerText,
        productColor = document.querySelector('.colorOptions').querySelector('.activeOption').innerText,
        id = document.querySelector('.nameProduct').getAttribute('data-nameProduct'),
        imgProduct = document.querySelector('.fullItem').querySelector('img').getAttribute('src'),
        uniqId = id + "-"+productColor + ' '+ productSize;
        uniqId = uniqId.replace(/\s/g, '-');

    if (this.cart[uniqId]) {
        this.cart[uniqId].qw += 1;
    } else {
        this.cart[uniqId] = {
            product: productName,
            price: productPrice,
            size: productSize,
            color: productColor,
            id: id,
            img: imgProduct,
            qw: 1
        };
    }

    var obj = JSON.stringify(this.cart);
    localStorage.cart = obj;
};