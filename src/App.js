import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Setting from './pages/Setting';
import Ranking from './pages/Ranking';

export default function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/settings" component={ Setting } />
      <Route path="/settings" component={ Ranking } />

    </Switch>

  );
}
