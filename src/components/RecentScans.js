import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import Api from '../api/Api'

export default class RecentScans extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.api = new Api()
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  componentDidMount() {
    this.api.getRecentScans()
      .then(recentScans => {
        this.setState({ recentScans })
      })
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction, recentScans } = this.state;
    
    if (!recentScans) {
      return null
    }

    return (
     
      <div class="row">
        <div class="col-xs-12">
          <h1>Recent Scans</h1>
        </div>

        <div class="col-md-4">
          <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={this.handleSelect}>
            {  
            Object.keys(recentScans).map(k => {
              const scanId = recentScans[k][0].scan.id;
              const scanIdImageUrl = this.api.getImageUrlByScanId(scanId)
              console.log(scanIdImageUrl)
              return (
                <Carousel.Item>
                  <img src={scanIdImageUrl} className="d-block w-100"  alt="First slide"/>
                </Carousel.Item>
              );
            })
          }
          </Carousel>
        </div>
        <div class="col-md-4">
          <p>User: Stefano Lupo</p>
          <p>Time: 18:07, Today</p>
          <p>Menu Item: Chicken Curry</p>
        </div>
      </div>
    );
  }
}
