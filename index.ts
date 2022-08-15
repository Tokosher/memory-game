import {SingleCard} from "./elements/single-card.js";

const CARD_WIDTH_HEIGHT = 200;
window.onload = () => {
    class MemoryGame {
        private cards: Array<SingleCard>[] = [];
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private firstOpenedCard: SingleCard | null;
        private secondOpenedCard: SingleCard | null;

        constructor() {
            this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
            this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

            this.placeCards();
            this.makeCanvasInteractive();
        }

        placeCards(): void {
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
            const positions: number[] = Array.from(Array(cards.length).keys()).sort( () => .5 - Math.random());

            for (let i = 0; i < cards.length / 4; i++) {
                this.cards.push([]);
                for (let j = 0; j < cards.length / 4; j++) {
                    this.cards[i].push(new SingleCard(x, y, cards[positions.pop() as number], this.ctx));
                    x += CARD_WIDTH_HEIGHT;
                }
                y += CARD_WIDTH_HEIGHT;
                x = 0;
            }
        }

        makeCanvasInteractive(): void {
            this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
        }

        onCanvasClick(e: MouseEvent) {
            const line = Math.floor(e.offsetY / CARD_WIDTH_HEIGHT);
            const element = Math.floor(e.offsetX / CARD_WIDTH_HEIGHT);
            const card = this.cards[line][element];
            if (this.firstOpenedCard === card
                || card.lock
                || this.firstOpenedCard && this.firstOpenedCard.animationInProgress
                || this.secondOpenedCard && this.secondOpenedCard.animationInProgress
            ) return;
            card.onClickHandler();

            if (this.firstOpenedCard) {
                this.secondOpenedCard = card;
                this.compareCards();
                this.firstOpenedCard = null;
                this.secondOpenedCard = null;
            } else {
                this.firstOpenedCard = card;
                (this.firstOpenedCard as SingleCard).lock = true;
            }
        }

        compareCards() {
            if ((this.firstOpenedCard as SingleCard).cardPath === (this.secondOpenedCard as SingleCard).cardPath) this.onSelectSameCards()
            else this.onSelectDifferentCards();
        }

        onSelectSameCards() {
            (this.firstOpenedCard as SingleCard).lock = true;
            (this.secondOpenedCard as SingleCard).lock = true;
        }

        onSelectDifferentCards() {
            (this.firstOpenedCard as SingleCard).hideCardImage();
            (this.secondOpenedCard as SingleCard).hideCardImage();
            (this.firstOpenedCard as SingleCard).lock = false;
        }
    }


    const game = new MemoryGame();
}
