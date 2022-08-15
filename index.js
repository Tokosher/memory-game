import { SingleCard } from "./elements/single-card.js";
const CARD_WIDTH_HEIGHT = 200;
window.onload = () => {
    class MemoryGame {
        constructor() {
            this.cards = [];
            this.canvas = document.querySelector('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.placeCards();
            this.makeCanvasInteractive();
        }
        placeCards() {
            let x = 0;
            let y = 0;
            let cards = [
                '../assets/images/apple.png',
                '../assets/images/aubergine.png',
                '../assets/images/broccoli.png',
                '../assets/images/carrot.png',
                '../assets/images/cherries.png',
                '../assets/images/chili.png',
                '../assets/images/grapes.png',
                '../assets/images/lemon.png',
            ];
            cards = [...cards, ...cards];
            const positions = Array.from(Array(cards.length).keys()).sort(() => .5 - Math.random());
            for (let i = 0; i < cards.length / 4; i++) {
                this.cards.push([]);
                for (let j = 0; j < cards.length / 4; j++) {
                    this.cards[i].push(new SingleCard(x, y, cards[positions.pop()], this.ctx));
                    x += CARD_WIDTH_HEIGHT;
                }
                y += CARD_WIDTH_HEIGHT;
                x = 0;
            }
        }
        makeCanvasInteractive() {
            this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
        }
        onCanvasClick(e) {
            const line = Math.floor(e.offsetY / CARD_WIDTH_HEIGHT);
            const element = Math.floor(e.offsetX / CARD_WIDTH_HEIGHT);
            const card = this.cards[line][element];
            if (this.firstOpenedCard === card
                || card.lock
                || this.firstOpenedCard && this.firstOpenedCard.animationInProgress
                || this.secondOpenedCard && this.secondOpenedCard.animationInProgress)
                return;
            card.onClickHandler();
            if (this.firstOpenedCard) {
                this.secondOpenedCard = card;
                this.compareCards();
                this.firstOpenedCard = null;
                this.secondOpenedCard = null;
            }
            else {
                this.firstOpenedCard = card;
                this.firstOpenedCard.lock = true;
            }
        }
        compareCards() {
            if (this.firstOpenedCard.cardPath === this.secondOpenedCard.cardPath)
                this.onSelectSameCards();
            else
                this.onSelectDifferentCards();
        }
        onSelectSameCards() {
            this.firstOpenedCard.lock = true;
            this.secondOpenedCard.lock = true;
            console.log('cards the same');
        }
        onSelectDifferentCards() {
            this.firstOpenedCard.hideCardImage();
            this.secondOpenedCard.hideCardImage();
            this.firstOpenedCard.lock = false;
            console.log('cards is different');
        }
    }
    const game = new MemoryGame();
};
//# sourceMappingURL=index.js.map