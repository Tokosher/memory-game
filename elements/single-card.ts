export class SingleCard {
    private ctx: CanvasRenderingContext2D;
    private positionX: number;
    private positionY: number;
    private showedCardImage: HTMLImageElement = new Image();
    private hiddenCardImage: HTMLImageElement = new Image();
    private cardShown: boolean = false;
    private locked: boolean = false;
    private cardInProcessOfAnimation: boolean = false;
    private cardName: string;

    constructor(x: number, y: number, cardPath: string, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.cardName = cardPath;
        this.showedCardImage.src = cardPath;
        this.positionX = x;
        this.positionY = y;

        this.createClosedCard(x, y);
    }

    public onClickHandler(): void {
        if (this.locked) return;
        this.cardShown ? this.hideCardImage() : this.showCardImage();
    }

    public set lock(v: boolean) {
        this.locked = v;
    }

    public get lock(): boolean {
        return this.locked;
    }

    public get animationInProgress (): boolean {
        return this.cardInProcessOfAnimation;
    }

    public get cardPath(): string {
        return this.cardName;
    }

    public hideCardImage(): void {
        this.animateImageToRemove(this.showedCardImage)
        this.cardShown = false;
    }

    private createClosedCard(x: number, y: number): void {
        this.hiddenCardImage.src = '../assets/images/fruits.png';
        this.hiddenCardImage.onload = () => {
            this.ctx.drawImage(this.hiddenCardImage, this.positionX, this.positionY);
        }
    }

    private showCardImage(): void {
        this.animateImageToRemove(this.hiddenCardImage)
        this.cardShown = true;
        this.cardInProcessOfAnimation = true;
    }

    private animateImageToRemove (img: HTMLImageElement, scale = 99): void { // todo make scale fractional number
        if (scale < 1) {
            this.animateImageToShow(img === this.showedCardImage ? this.hiddenCardImage : this.showedCardImage)
            return;
        }

        this.ctx.clearRect(this.positionX, this.positionY, this.showedCardImage.width, this.showedCardImage.height);
        this.ctx.drawImage(img, this.positionX, this.positionY,
            img.width * (scale / 100), img.height);
        window.requestAnimationFrame(this.animateImageToRemove.bind(this, img, scale - 5));
    }

    private animateImageToShow (img: HTMLImageElement, scale = 0): void { // todo make scale fractional number
        if (scale > 100) {
            this.cardInProcessOfAnimation = false;
            return
        }

        this.ctx.clearRect(this.positionX, this.positionY, this.showedCardImage.width, this.showedCardImage.height);
        this.ctx.drawImage(img, this.positionX, this.positionY,
            img.width * (scale / 100), img.height);
        console.log(scale);
        window.requestAnimationFrame(this.animateImageToShow.bind(this, img, scale + 5));
    }
}