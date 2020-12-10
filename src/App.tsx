import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import logo from './pngegg.png';
import './App.css';
import { User } from './features/user/User';
import { Game } from './features/game/Game';
import { Navbar } from './app/components/Navbar';

const App: React.FC = () => {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <User />
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
