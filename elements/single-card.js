export class SingleCard {
    constructor(x, y, cardPath, ctx) {
        this.showedCardImage = new Image();
        this.hiddenCardImage = new Image();
        this.cardShown = false;
        this.locked = false;
        this.cardInProcessOfAnimation = false;
        this.ctx = ctx;
        this.cardName = cardPath;
        this.showedCardImage.src = cardPath;
        this.positionX = x;
        this.positionY = y;
        this.createClosedCard(x, y);
    }
    onClickHandler() {
        if (this.locked)
            return;
        this.cardShown ? this.hideCardImage() : this.showCardImage();
    }
    set lock(v) {
        this.locked = v;
    }
    get lock() {
        return this.locked;
    }
    get animationInProgress() {
        return this.cardInProcessOfAnimation;
    }
    get cardPath() {
        return this.cardName;
    }
    hideCardImage() {
        this.animateImageToRemove(this.showedCardImage);
        this.cardShown = false;
    }
    createClosedCard(x, y) {
        this.hiddenCardImage.src = '../assets/images/fruits.png';
        this.hiddenCardImage.onload = () => {
            this.ctx.drawImage(this.hiddenCardImage, this.positionX, this.positionY);
        };
    }
    showCardImage() {
        this.animateImageToRemove(this.hiddenCardImage);
        this.cardShown = true;
        this.cardInProcessOfAnimation = true;
    }
    animateImageToRemove(img, scale = 99) {
        if (scale < 1) {
            this.animateImageToShow(img === this.showedCardImage ? this.hiddenCardImage : this.showedCardImage);
            return;
        }
        this.ctx.clearRect(this.positionX, this.positionY, this.showedCardImage.width, this.showedCardImage.height);
        this.ctx.drawImage(img, this.positionX, this.positionY, img.width * (scale / 100), img.height);
        window.requestAnimationFrame(this.animateImageToRemove.bind(this, img, scale - 5));
    }
    animateImageToShow(img, scale = 0) {
        if (scale > 100) {
            this.cardInProcessOfAnimation = false;
            return;
        }
        this.ctx.clearRect(this.positionX, this.positionY, this.showedCardImage.width, this.showedCardImage.height);
        this.ctx.drawImage(img, this.positionX, this.positionY, img.width * (scale / 100), img.height);
        console.log(scale);
        window.requestAnimationFrame(this.animateImageToShow.bind(this, img, scale + 5));
    }
}
//# sourceMappingURL=single-card.js.map