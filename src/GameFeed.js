import React, { Component } from 'react';
import './App.css';

import Api from './api/Api'
import Header from './components/Header'


export default class TraySystemScreen extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.state = {
    }
  }

  componentDidMount() {
   
  }

  render() {
   
    return (
      <div>
          <Header />
          <p>I am the game feed screen!</p>
      </div>
    );
  }
}
