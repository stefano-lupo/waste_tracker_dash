import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'

import SloganGif from '../../assets/gifs/slogan.gif'
import FoodWasteReductionGif from '../../assets/gifs/food_waste_reduction.gif'
import LoopingGif from '../../assets/gifs/loop.gif'


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

const GIFS = [
    SloganGif,
    FoodWasteReductionGif
]

const CYCLE_TIME_MS = 5000;


export default class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
          statisticIndex: 0,
          gifIndex: 0,
      }
      this.cycle()    
    }
    
    cycle() {
        setTimeout(() => {
            let { statisticIndex, gifIndex } = this.state;
            statisticIndex = (++statisticIndex) % STATISTICS.length;
            gifIndex = (++gifIndex) % GIFS.length;
            this.setState({statisticIndex, gifIndex})
            this.cycle()
        }
        , CYCLE_TIME_MS)
    }

    componentDidMount() {
    
    }
  
    render() {
        const { statisticIndex, gifIndex } = this.state;
        const statistic = STATISTICS[statisticIndex]
        const gif = GIFS[gifIndex]
        console.log(gif)

        if (!this.props.showStats) {
            return null
        }
        
        return (
           <Row className="justify-content-center mt-5">
               <Col className="text-center">
                    <Image className="center-block"  height="450px" src={LoopingGif} />
                    {/* <h3>{statistic.main}</h3>
                    <p>{statistic.detail}</p> */}
                </Col>
           </Row>
        );
    }
  }
  