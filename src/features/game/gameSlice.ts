import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { RootState } from '../../app/store';
import { createHands } from './Deck';
import { ICard } from './components/card/Card';

const defaultBalance = Number(localStorage.getItem('balance')) || 0;
const winninCardScore = 5;
const amountToPlay = 15;

interface GameState {
  balance: number;
  gameRound: number;
  hand: Array<any>,
  gameCycle: number;
  winningPool: number;
  gameEnded: boolean;
  notEnoughBalance: boolean;
  eventLog: any[];
  playerWinsRound: boolean;
  cardsHidden: boolean;
}

const initialState: GameState = {
  balance: defaultBalance,
  gameRound: 0,
  hand: [],
  gameCycle: 0,
  winningPool: 0,
  gameEnded: false,
  notEnoughBalance: false,
  eventLog: [{gameRound: 0, winningPool: 0, hand: [], balance: defaultBalance}],
  playerWinsRound: false,
  cardsHidden: false,
};

const evaluateCard = (card: ICard, hand: ICard[]): boolean => {
  const temp = [...hand];
  const sortedHand = temp.sort((a, b) => a.weight - b.weight)[0]
  const minWeight = sortedHand.weight;
  if(card.weight > minWeight) {
    return true;
  }
  return false;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: state => {
        state.gameRound += 1;
        state.cardsHidden = false;
    },
    decreaseGameBalance: state => {
      if(state.balance < amountToPlay){
        console.log("exit");
        state.notEnoughBalance = true;
      } else {
        state.balance -= amountToPlay;
      }
     state.eventLog.push({gameRound: state.gameRound, winningPool: state.winningPool, hand: state.hand, balance: state.balance})            
    },
    addHand: state => {
        state.hand = createHands()
        state.playerWinsRound = false;
        state.gameEnded = false;
    },
    clearPool: state => {
      state.winningPool = 0;
    },
    forfeitAction: state => {
      if(state.playerWinsRound) return;
      state.balance += state.winningPool;
      state.winningPool = initialState.winningPool;
      state.gameRound = 0;
      state.hand = [];
      state.gameEnded = true;
      state.eventLog.push({gameRound: state.gameRound, winningPool: state.winningPool, hand: state.hand, balance: state.balance})
    },
    hideCards: state => {
      if(!state.hand[0]) return;
      state.cardsHidden = true;
      state.hand = [_.shuffle(state.hand[0].map(e => ({...e, visible:false})))] 
    },
    resetGameState: state => initialState,
    revealCard: (state, action: PayloadAction<any>) => {
      if(state.playerWinsRound || !state.cardsHidden) return;
      const {payload} = action;
      let card: any = _.find(state.hand[0], payload)
      card.visible = true;
      if (evaluateCard(card, state.hand[0])) {
        state.winningPool += winninCardScore * state.gameRound
        state.playerWinsRound = true;
      } else {
        state.playerWinsRound = false;
        state.winningPool = 0;
        state.gameEnded = true;
        state.gameRound = 0;
      }      
    },
  },
});

export const { increment, addHand, decreaseGameBalance, hideCards, forfeitAction, resetGameState, revealCard } = gameSlice.actions;

export const selectUserBalance = (state: RootState) => state.game.balance;
export const selectGameRound = (state: RootState) => state.game.gameRound;
export const selectHand = (state: RootState) => state.game.hand;
export const selectGameBalance = (state: RootState) => state.game.balance;
export const selectGameCycle = (state: RootState) => state.game.gameCycle;
export const selectGameEnded = (state: RootState) => state.game.gameEnded;
export const selectWinningPool = (state: RootState) => state.game.winningPool;
export const selectNotEnoughBalance = (state: RootState) => state.game.notEnoughBalance;
export const selectEventLog = (state: RootState) => state.game.eventLog;
export const selectPlayerWinsround = (state: RootState) => state.game.playerWinsRound;

export default gameSlice.reducer;