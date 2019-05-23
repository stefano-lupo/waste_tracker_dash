import React from 'react';
import TcdLogo from '../assets/tcd.jpg'
import UnimoreLogo from '../assets/unimore.jpg'
import FoodCloudLogo from '../assets/foodcloud.png'
import FloWasteLogo from '../assets/flowaste.png'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row">
                <div class="col-sm-2">
                    <img src={TcdLogo} class="img-fluid" />
                </div>
                {/* <div class="col-sm-3">
                    <img src={FloWasteLogo} class="img-fluid"/>
                </div> */}
                <div class="col-sm-2">
                    <img src={FoodCloudLogo} class="img-fluid" />
                </div>
                <div class="col-sm-2">
                    <img src={UnimoreLogo} class="img-fluid"/>
                </div>
            </div>
        )
    }
}