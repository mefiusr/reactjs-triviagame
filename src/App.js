import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/games" render={ (props) => <Game { ...props } /> } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
