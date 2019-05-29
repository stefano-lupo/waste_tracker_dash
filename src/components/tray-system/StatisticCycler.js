import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'

const STATISTICS = [
    {
        "main": "Frogs",
        "detail": "are green!"
    },
    {
        "main": "Food Waste!",
        "detail": "is bad!"
    },
    {
        "main": "Food Waste!",
        "detail": "is the third largest land mass in the Milky Way!"
    },
    {
        "main": "Anna",
        "detail": "really needs to make these facts!"
    },
]

const CYCLE_TIME_MS = 2000;


export default class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
          statisticIndex: 0
      }
      this.cycle()    
    }
    
    cycle() {
        setTimeout(() => {
            let { statisticIndex } = this.state;
            statisticIndex = (++statisticIndex) % STATISTICS.length;
            this.setState({statisticIndex})
            this.cycle()
        }
        , CYCLE_TIME_MS)
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
  