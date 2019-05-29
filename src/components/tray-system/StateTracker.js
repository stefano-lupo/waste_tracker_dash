import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'


export default class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        
      }
    }
    
    componentDidMount() {
    
    }
  
    render() {
        const statistic = STATISTICS[this.state.statisticIndex]
        return (
           <Row className="justify-content-center mt-5">
               <Col md={8} className="text-center">
                    <h3>{statistic.main}</h3>
                    <p>{statistic.detail}</p>
                </Col>
           </Row>
        );
    }
  }
  