import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Questions from './Pages/Questions';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/questions" component={ Questions } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
