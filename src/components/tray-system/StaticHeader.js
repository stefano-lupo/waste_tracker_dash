import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'

import TcdLogo from '../../assets/trinity-common-use.jpg'
import UnimoreLogo from '../../assets/unilogo.png'
import FloWasteLogo from '../../assets/flowaste.png'


export default class App extends Component {

    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
    
    }
  
    render() {
        return (
            <Container fluid className="tray-screen-container">
            <Row mt={3}>
                <Col xs={4}>
                    <Image className="float-left" height="100px" src={TcdLogo} />
                </Col>
                <Col xs={4}>
                    <Image height="120px" className="mx-auto d-block" src={FloWasteLogo} />
                </Col>
                <Col xs={4}>
                    <Image className="float-right" height="100px" src={UnimoreLogo} />
                </Col>
            </Row>
            </Container>
        );
    }
  }
  