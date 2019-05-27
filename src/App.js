import React, { Component } from 'react';
import './App.css';

import Api from './api/Api'
import objectToArray from './Util'

import Header from './components/Header'
import RecentImages from './components/RecentImages'
import WasteOverTime from './components/charts/WasteOverTime'
import WasteByIngredient from './components/charts/WasteByIngredient';
import WasteByMenuItem from './components/charts/WasteByMenuItem';
import WasteViewer from './components/WasteViewer';

class App extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.state = {
      wasteByMenuItem : null,
      wasteByIngredient: null,
      wasteOverTime: null
    }
  }

  componentDidMount() {
    // this.api.getWasteByMenuItem()
    //   .then(json => {
    //     const wasteByMenuItem = objectToArray(json);
    //     this.setState({ wasteByMenuItem });
    // });
    
    // this.api.getWasteByIngredient()
    //   .then(json => {
    //     const wasteByIngredient = objectToArray(json);
    //     this.setState({ wasteByIngredient });
    // });
        
    // this.api.getWasteOverTime()
    //   .then(json => {
    //     const wasteOverTime = objectToArray(json)
    //     this.setState({ wasteOverTime })
    // });
  }

  render() {
    // const { wasteByIngredient, wasteOverTime } = this.state;
    return (
      <div className="App" class="container-fluid">
        <Header/>
        <WasteViewer scanId={1}/>
        {/* <RecentImages/>       */}
        {/* <WasteByMenuItem data={this.state.wasteByMenuItem} />
        <WasteByIngredient data={this.state.wasteByIngredient} />
        <WasteOverTime data={this.state.wasteOverTime} /> */}
      </div>
    );
  }
}

export default App;
