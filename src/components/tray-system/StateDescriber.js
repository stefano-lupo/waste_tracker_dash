import React, { Component } from 'react';
import '../../App.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

import Api from '../../api/Api';
import WasteViewer from '../WasteViewer'

export default class StateDescriber extends Component {

  constructor(props) {
    super(props);
    this.api = new Api();
  }
  

  render() {
   
    const { stateDescription, scanId } = this.props;
    return (
      <Row className="state-describer-row" >
        <Col>
          <h1 className="state-describer-text">{stateDescription}</h1>
          {scanId ? <WasteViewer scanId={scanId} /> : null }
        </Col>
      </Row>
    );
  }
}
