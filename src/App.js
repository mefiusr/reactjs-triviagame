import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import './styles/responsive.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/games" render={ (props) => <Game { ...props } /> } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
      <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
    </Switch>
  );
}
