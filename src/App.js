import React, { Component } from 'react';
import './App.css';
import './components/BarChart'

import BarChart from './components/BarChart';
import Api from './api/Api'
import objectToArray from './Util'

const BASE_URL = "http://localhost:8080"

class App extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.state = {
      waste_by_menu_item : null
    }
  }

  componentDidMount() {
    this.api.getWasteByMenuItem()
      .then(resp =>  {
        const asArray = objectToArray(resp, ["Menu Item", "Waste (KG)"])
        this.setState({wasteByMenuItem: asArray}
      )})
  }

  render() {
    const { wasteByMenuItem } = this.state;
    return (
      <div className="App">      
        <BarChart data={this.state.wasteByMenuItem}/>
      </div>
    );
  }
}

export default App;
