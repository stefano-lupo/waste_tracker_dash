import React from 'react';
import { Button } from 'react-bootstrap'

import Api from '../api/Api'
import WasteViewer from './WasteViewer';
import WasteByIngredientScan from './charts/WasteByIngredientScan';
import { BY_ID } from '../Constants'

export default class RecentScans extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.api = new Api()

    this.state = {
      isLoading: true,
      currentIndex: -1
    };
  }

  scanDetails(scan) {
    console.log(scan);
    const time = new Date(scan.scan.time);
    const timeString = time.toLocaleTimeString() + ", " + time.toLocaleDateString()
    
    const wasteByIngredient = scan.waste_by_ingredient;

    // var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
    const keysSorted = Object.keys(wasteByIngredient).sort(function(a,b){return wasteByIngredient[b]-wasteByIngredient[a]})
    console.log(keysSorted);     // bar,me,you,foo
    return (
      <div className="">
        <p>Menu Item: {scan.menu_item_name}</p>
        <p>Time: {timeString}</p>
        <p>User ID: {scan.scan.user_id}</p>
        <p>Scan ID: {scan.scan.id}</p>
        <hr/> 
        {keysSorted.map((k) => (
          <p>{BY_ID[k].name}: {wasteByIngredient[k].toFixed(2)}%</p>
        ))}     
      </div>
    );
  }

  componentDidMount() {
    this.api.getRecentScans()
      .then(recentScansObj => {
        const recentScans = Object.values(recentScansObj).sort((a, b) => b.scan.id - a.scan.id)
        this.setState({ 
          recentScans,
          currentIndex: 0,
          isLoading: false
        })
      })
  }


  render() {
    const { recentScans, currentIndex } = this.state;
    if (!recentScans) {
      return null;
    }

    const nextDisabled = currentIndex >= recentScans.length - 1
    const prevDisabled = currentIndex <= 0

    const scan = recentScans[currentIndex]
    const scanId = scan.scan.id

    return (
      <div className="container-fluid container-fluid-small">
        <h2>Recent Scans</h2>
        <hr/>
        <div className="row">
        {/* <WasteViewer scanId={scanId} orbitControls={true}/> */}
          <div className="col-md-6">
            <WasteViewer scanId={scanId} orbitControls={true}/>
            <div className="row mt-5">
              <div className="col-md-6">
                <Button className="recentButton"  block disabled={prevDisabled} onClick={prevDisabled ? null : () => this.setState({currentIndex: currentIndex - 1})}>Previous</Button>
              </div>
              <div className="col-md-6">
                <Button className="recentButton" block disabled={nextDisabled} onClick={nextDisabled ? null : () => this.setState({currentIndex: currentIndex + 1})}>Next</Button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {this.scanDetails(scan)}
            {/* <WasteByIngredientScan data={scan.waste_by_ingredient}/> */}
          </div>
        </div>
        
        </div>
    )
  }
}
