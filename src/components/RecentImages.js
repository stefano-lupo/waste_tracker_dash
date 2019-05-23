import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

export default class RecentImages extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  componentDidMount() {
    
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

render() {
  const { index, direction } = this.state;

  return (
    <div class="container">
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="https://media14.s-nbcnews.com/j/MSNBC/Components/Video/201905/tdy_news_grumpy_cat_190517_1920x1080.760;428;7;70;5.jpg"
          alt="First slide"
          />
          <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="https://res.cloudinary.com/petrescue/image/upload/ar_1:1,c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_auto:100:500/v1558430424/bsq1qppvahnj8xq6rsmf.jpg"
          alt="Third slide"
          />

          <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
        </div>
      );
    }
  }
