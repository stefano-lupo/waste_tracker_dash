import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ManagerDashboard from './ManagerDashboard';
import TraySystemScreen from './TraySystemScreen'
import GameFeed from './GameFeed'
import Header from './components/Header'

const Root = () => 
<div>
  <Header />
  <p><Link to="/manager">View Manager Dashboard</Link></p>
  <p><Link to="/tray-system-screen">View Tray System Screen</Link></p>
  <p><Link to="/game-feed">View Live Game Feed</Link></p>
</div>

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  
  }

  render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Root} />
            <Route path="/manager" component={ManagerDashboard} />
            <Route path="/tray-system-screen" component={TraySystemScreen} />
            <Route path="/game-feed" component={GameFeed} />
          </Switch>
        </BrowserRouter>
      );
  }
}

