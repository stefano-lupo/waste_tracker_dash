import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

import Api from './api/Api'
import StaticHeader from './components/tray-system/StaticHeader'
import StatisticCycler from './components/tray-system/StatisticCycler';
  

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
      <Container fluid className="mt-3">
        <StaticHeader />
        <StatisticCycler />
      </Container>
    );
  }
}
