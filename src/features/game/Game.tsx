import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

import {
  selectUserName,
  resetUserState,
} from '../';
import {
  increment,
  selectHand,
  addHand,
  selectGameBalance,
  decreaseGameBalance,
  selectGameRound,
  hideCards,
  forfeitAction,
  selectGameEnded,
  revealCard,
  selectWinningPool,
  selectNotEnoughBalance,
  resetGameState,
  selectEventLog,
  selectPlayerWinsround,
} from '../game/gameSlice';

import styles from './Game.module.css';
import Card from './components/card/Card';

export const Game: React.FC = () => {

  const history = useHistory();

  const savedUserName = useSelector(selectUserName);
  const balance = useSelector(selectGameBalance);
  const hand = useSelector(selectHand);
  const round = useSelector(selectGameRound);
  const gameEnded = useSelector(selectGameEnded);
  const winningPool = useSelector(selectWinningPool);
  const notEnoughBalance = useSelector(selectNotEnoughBalance);
  const eventLog = useSelector(selectEventLog);
  const playerWinsRound = useSelector(selectPlayerWinsround);

  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetGameState());
    dispatch(resetUserState());
  }

  const selectCard = (card) => {
    // console.log(card);
    dispatch(revealCard(card));
  }

  const start = () => {
    dispatch(addHand());
    dispatch(increment());
    dispatch(decreaseGameBalance());
    setTimeout(() => (dispatch(hideCards())), 3000)
  }

  const forfeit = () => {
    dispatch(forfeitAction());
  }

  const goBack = () => {
    window.alert("Not enough Balance Redirecting to homepage");
    dispatch(resetGameState());
    dispatch(resetUserState());
    setTimeout(() => history.push("/"), 2);
  }

  return (
    <div>
      {notEnoughBalance && goBack()}
      <div className={styles.wrapper}>
        <div className={classnames(styles.box, styles.playerItems)}>
          {playerWinsRound && `Player Wins round ${round}`}
          {round > 0 && playerWinsRound ? <span> Press Deal to continue..</span> : ' Player Cards:'}
          {gameEnded && 'Game Ended! Press Start Game to start a new Game!'}
          <div className={classnames(styles.box, styles.items)}>
            <div className="playingCards simpleCards faceImages">
              {hand[0] && hand[0].map(({ rank, suit, weight, visible }, index) => (
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

      <div className={styles.spaceTop}>
        {round > 0 && <div>
          <button type="button" className="button waves-effect waves-light btn" onClick={forfeit} >Forfeit?</button>
          <span>Winning Pool will be added to balance but game will end</span>
        </div>}
      </div>
     
      <div>
        Instructions: Cards Will be Presented then hidden and shuffled, Winning Cards are the highest ranking showed
      </div>
      <div className={styles.eventLog}>
        {eventLog.map((event, index) => {
          return (
            <div key={`${index}`}>
              WinningPool {event.winningPool}
              Round: {event.gameRound}
              Balance: {event.balance}
              Hand: {event.hand[0] && event.hand[0].map((e, index) => (<span key={index}>{e.rank},</span>))}
            </div>
          )
        })}
      </div>
    </div>
  );
}
