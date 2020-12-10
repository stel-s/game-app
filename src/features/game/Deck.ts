import * as _ from 'lodash';

const Ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
const Suits = [ 'hearts' ];

interface ICard {
    suit: string;
    rank: string;
    weight: string;
}
interface IDeck {
    cards: Array<ICard>;
}
export class Deck implements IDeck {
    cards: ICard[] = [];
    constructor() {
        const cards = [] as any;
        for (const [weight, rank] of Ranks.entries()){
        for (const suit of Suits) {
            cards.push({ suit, rank, weight: weight + 1 , visible: true});
        }
        }
        this.cards = _.shuffle(cards);       
    }
}

function createHands () {
  let newDeck = new Deck().cards;
  let hands = [] as any;
  hands[0] = newDeck.splice(0,4);
  return hands;
}

export {
	createHands,
};