import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

import Api from './api/Api'
import Header from './components/Header'


export default class TraySystemScreen extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.state = {
      participants: []
    }
  }

  componentDidMount(){
    // this.api.postUserScore("ranzss!s", 100);
    this.api.getUserScores().then(json => this.setState({ participants: json.participants })) 
  }

  renderParticipants(participants) {
    if (!participants) {
      return null
    }

    return participants.map(p => {
      if (!p.name) {
        return 
      }
      return (
        <Container>
          <Row className={"mb-5 user-row"}>
            <Col md={2}>
            <Image roundedCircle fluid src={"data:image/png;base64, " + p.base_64Image} alt="Custome Image" />
            </Col>
            <Col>
              <h4>{p.name}</h4>
              <p>Socre: {p.score}</p>
            </Col>
          </Row>
        </Container>
       
      )
    })
  }

  render() {
    const { participants } = this.state;
    console.log(participants)
    return (
      <div>
          <Header />
          {this.renderParticipants(participants)}
      </div>
    );
  }
}
