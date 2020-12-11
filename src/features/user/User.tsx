import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  addUserName,
  selectUserName,
  selectUserBalance,
} from './userSlice';
import { resetGameState, resetUserState } from '../../features/';

import styles from './User.module.css';

export function User() {
  const dispatch = useDispatch();
  const [errorInput, setErrorInput] = useState('');
  const history = useHistory();
  const balance = useSelector(selectUserBalance);
  const userName = useSelector(selectUserName);
  

  const goToGame = () => {
    history.push("/game");
  }
 
  const saveUserName = (name: string) => {
    if(!name) {
      setErrorInput('UserName Required');
      return;
    }
    dispatch(addUserName(name))
    localStorage.setItem('userName', name);
    goToGame();
  }

  return (
    <div>
      <div>
        Select Your UserName to start the game
        <input
          aria-label="choose user name"
          value={userName}
          onChange={e => dispatch(addUserName(e.target.value))}
        />
        {errorInput && <div>UserName required</div>}
        <button
          className='waves-effect waves-light btn'
          onClick={() =>
            saveUserName(userName)
          }
        >
          Submit
        </button>
       
      </div>
    </div>
  );
}
