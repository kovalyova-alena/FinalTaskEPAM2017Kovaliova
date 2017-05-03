function OfferBanner (offer) {
    if (!offer) return;

    this.offer = offer;
    this.itemImg = document.querySelectorAll('.arrivalItem')[0];
    this.itemImg.style.cssText= 'margin-bottom:' + this.offer.clientHeight + 'px';
}
