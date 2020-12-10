import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { RootState } from '../../app/store';
import { createHands } from './Deck';
import { ICard } from './components/card/Card';

const defaultBalance = 100;
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
};

const evaluateCard = (card: ICard, hand): boolean => {
 return true;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: state => {
        state.gameRound += 1;
    },
    decrement: state => {
        state.gameRound -= 1;
    },
    increaseBalance: state => {
        state.balance += 1;
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
    },
    clearPool: state => {
      state.winningPool = 0;
    },
    forfeitAction: state => {
      if(state.playerWinsRound) return;
      state.balance += state.winningPool;
      state.gameRound = 0;
      state.hand = [];
      state.gameEnded = true;
      state.eventLog.push({gameRound: state.gameRound, winningPool: state.winningPool, hand: state.hand, balance: state.balance})
    },
    hideCards: state => {
      if(!state.hand[0]) return;
      state.hand = [_.shuffle(state.hand[0].map(e => ({...e, visible:false})))] 
    },
    resetGameState: state => initialState,
    revealCard: (state, action: PayloadAction<any>) => {
      if(state.playerWinsRound) return;
      const {payload} = action;
      let card: any = _.find(state.hand[0], payload)
      card.visible = true;
      if (evaluateCard(card, state.hand[0])) {
        state.winningPool += winninCardScore * state.gameRound
        state.playerWinsRound = true;
      }      
    },
  },
});

export const { increment, decrement, addHand, decreaseGameBalance, hideCards, forfeitAction, resetGameState, revealCard } = gameSlice.actions;

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