import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import Api from '../api/Api'

export default class RecentImages extends React.Component {
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
    this.api.getRecentImages()
      .then(recentImages => {
        this.setState({ recentImages })
        console.log("Got response")
        console.log(this.state)
      })
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

render() {
  const { index, direction } = this.state;
  
  if (!this.state.recentImages) {
    console.log("State null")
    return null
  }

  console.log("Rendering")

  return (
    // <div>
    //   { this.state.recentImages.forEach(element => {
    //       const src = this.api.getImageUrl(element.path)
    //       console.log("src: " + src)
    //       return (<img src='https://i.kinja-img.com/gawker-media/image/upload/s--UYWnBrHt--/c_scale,f_auto,fl_progressive,q_80,w_800/wmpvownqus8xwvylswsr.jpg' class="img-fluid"/>)
    //   })}
    //   </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-xs-offset-2">
      < Carousel
         activeIndex={index}
         direction={direction}
         onSelect={this.handleSelect}>
        {  
        this.state.recentImages.map(e => {
          return (
            <Carousel.Item>
            <img src={this.api.getDetectionUrl(e.id)} className="d-block w-100"  alt="First slide"/>
          </Carousel.Item>
          );
        })
      }
     
      </Carousel>
        </div>
        </div>
        </div>
      );
    }
  }
