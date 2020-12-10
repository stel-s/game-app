import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetGameState, resetUserState } from '../../features/';
  

export const Navbar: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('userName');
        dispatch(resetGameState());
        dispatch(resetUserState());
        history.push("/");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* <li>
                    <Link to="/game">Game</Link>
                </li> */}
                <li style={{ float: "right" }}>
                    <button className="waves-effect waves-teal btn-flat" onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>

    );
};
