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


            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <a class="navbar-brand" href="#">
                    <img src={FloWasteLogo} width="50" height="50" class="d-inline-block align-top" alt="" />
                </a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    <span class="navbar-text">Navbar text with an inline element</span>
                </div>
            </nav>
        )
    }
}