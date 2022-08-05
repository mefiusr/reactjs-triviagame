import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <Route exact path="/" component={ Login } />
  );
}
