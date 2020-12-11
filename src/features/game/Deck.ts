import * as _ from 'lodash';

/** 
 * 
 * started as a poker hands scenario
 * 
 * **/

const Ranks = [ 'J', 'Q', 'K', 'A' ];
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

function createHands (): Array<Array<ICard>> {
  let newDeck = new Deck().cards;
  let hands = [] as Array<Array<ICard>>;
  hands[0] = newDeck.splice(0,4) ;
  return hands;
}

export {
	createHands,
};