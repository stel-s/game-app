import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classnames from 'classnames';
import {
  selectUserName,
  selectUserBalance,
  resetUserState,
} from '../';
import {
  increment,
  decrement,
  selectHand,
  addHand,
  selectGameBalance,
  decreaseGameBalance,
  selectGameRound,
  hideCards,
  selectGameCycle,
  forfeitAction,
  selectGameEnded,
  revealCard,
  selectWinningPool,
  selectNotEnoughBalance,
  resetGameState,
} from '../game/gameSlice';

import { createHands } from './Deck'
import styles from './Game.module.css';
import Card from './components/card/Card';

export const Game: React.FC = () => {
  const history = useHistory();
  const savedUserName = useSelector(selectUserName);
  const balance = useSelector(selectGameBalance);
  const hand = useSelector(selectHand);
  const round  = useSelector(selectGameRound);
  const gameEnded  = useSelector(selectGameEnded);
  const winningPool  = useSelector(selectWinningPool);
  const notEnoughBalance  = useSelector(selectNotEnoughBalance);

  console.log(hand);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  const reset = () => {
    const cards = createHands();
    dispatch(hideCards());
  }
  
  const selectCard = (card) => {
  
    console.log(card);
    dispatch(revealCard(card));
  }

  // const revealCard = () => {
  //   dispatch(revealCard());
  // }

  const start = () => {
    dispatch(addHand());
    dispatch(increment());
    dispatch(decreaseGameBalance());
  }

  const forfeit = () => {
    dispatch(forfeitAction());
  }

  const goBack = () => {
    const r = window.alert("Not enough Balance Redirecting to homepage"); 
    dispatch(resetGameState());
    dispatch(resetUserState()); 
    setTimeout(() => history.push("/"), 2);
    
  }

  return (
    <div>
      {notEnoughBalance && goBack() }
      <div className={styles.wrapper}>
        <div className={classnames(styles.box, styles.playerItems)}> 
         
          {round > 0 && !hand.length ? <span> Round: {round} Press Deal to continue..</span> : ' Player Cards:'}

          <div className={classnames(styles.box, styles.items)}>
          <div className="playingCards simpleCards">
              {hand[0] && hand[0].map(({rank, suit, weight, visible}, index) => (
                <Card rank={rank} suit={suit} weight={weight} key={`Hand-id-${index}`}
                  visible={visible} selectCard={selectCard} />
              ))}          
          </div>
            
          </div>
        </div>
        <div className={classnames(styles.box, styles.sidebar)}>
          <div className={styles.sidebarBox}>
            <div>Name: {savedUserName}</div>
            <div>Round: {round}</div>          
            <div>Balance: {balance}</div>
            <div>WinningPool: {winningPool}</div>
          </div> 
          <div>
          {round === 0 
          ? <button type="button" className="button waves-effect waves-light btn" onClick={start} >Start Game</button> 
          : <button type="button" className="button waves-effect waves-light btn" onClick={start} >Deal</button>}
          </div> 
          <div>
            <button type="button" className="button waves-effect waves-light btn" onClick={reset} >Reset Game</button>
          </div>    
         
        </div>
      
      </div>
       
         <div style={{marginTop: '20px'}}>
            {round > 0 && <button type="button" className="button waves-effect waves-light btn" onClick={forfeit} >Forfeit?</button>}
          </div> 
          <div>
            {gameEnded && 'Game Ended! Press Start Game to start a new Game!'}
          </div>   
      </div>
  
  );
}
