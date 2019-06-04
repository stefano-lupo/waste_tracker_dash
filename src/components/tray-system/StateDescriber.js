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
      <Container fluid className="mt-3">
        <h3 className="text-center">{stateDescription}</h3>
        {scanId ? <WasteViewer scanId={scanId} /> : null }
      </Container>
    );
  }
}
