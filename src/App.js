import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const BASE_URL = "http://192.168.1.10:5000"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      capturesByDish : null
    }
  }

  componentDidMount() {
    fetch(BASE_URL + "/captures-by-dish")
      .then(resp => resp.json())
      .then(capturesByDish => {
        console.log(capturesByDish)
        this.setState({ capturesByDish })
      })
  }

  render() {
    const { capturesByDish } = this.state;
    return (
      <div className="App">      
        { capturesByDish != null && this.renderCapturesByDish(capturesByDish)}
      </div>
    );
  }

  renderCapturesByDish(capturesByDish) {
    return Object.keys(capturesByDish).map((dishName, index) => this.renderCapturesForDish(capturesByDish, dishName))
  }

  renderCapturesForDish(capturesByDish, dishName) {
    return (
      <div key={dishName}>
        <h3>{dishName}</h3>
          {capturesByDish[dishName].map((capture, index) => {
            return <img style={{padding: 10}} key={capture.id} src={capture['image_url']} width="300" height="300"/>
          })}
      </div>
    )
  }
}

export default App;
