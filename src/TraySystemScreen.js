import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

import Api from './api/Api'
import StaticHeader from './components/tray-system/StaticHeader'
import StatisticCycler from './components/tray-system/StatisticCycler';
import StateDescriber from './components/tray-system/StateDescriber';
import WasteViewer from './components/WasteViewer';

const STATES = new Map(Object.entries({
  "READY": "Ready for next tray",
  "RFID_READ": "We hope you enjoyed your: %s",
  "INVALID_RFID": "Unable to read RFID",
  "ROLLER_FEEDING": "Feeding tray",
  "DOOR_CLOSING": "Please keep your hands clear of the doors!",
  "LOWERING": "Lowering your tray",
  "LOWERING_ERROR": "Error in lowering your tray!",
  "LOWERING_FINISH": "Finished lowering your tray!", 
  "IMAGE_START": "Analyzing food waste...",
  "IMAGE_FINISHED": "Finished analyzing"
}))


const BASE_URL = "ws://localhost:8081"

function getState(state, data = {}) {
  const stateDescription = STATES.get(state);
  return { state, stateDescription, data };
}

function onMessage(event) {
  console.log(event.data)
  const { state, data } = JSON.parse(event.data)
  if (!STATES.has(state)) {
    console.log("Skipping " + event.data);
    return;
  }

  console.log("Setting for " + state)
  this.setState(getState(state, data));
}

export default class TraySystemScreen extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.socket = new WebSocket(BASE_URL);
    this.socket.addEventListener('message', onMessage.bind(this));
    this.socket.addEventListener('open', event => {
      console.log("Connected to server")
    });
  
    this.state = getState("READY");
  }
  
  componentDidMount() {
   
  }

  render() {
   
    const { state, stateDescription, data } = this.state;
    return (
      <Container fluid className="mt-3">
        <StaticHeader />
        <StatisticCycler />
        <StateDescriber stateDescription={stateDescription} />
        {/* { state === "IMAGE_FINISHED" ? <Image src={this.api.getImageUrlByScanId(data)} /> : null} */}
        { state === "IMAGE_FINISHED" ? <WasteViewer scanId={data} /> : null}
      </Container>
    );
  }
}
