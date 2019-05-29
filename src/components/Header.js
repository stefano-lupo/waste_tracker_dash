import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


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
            <Navbar bg="light" expand="lg mb-5">
                <Navbar.Brand href="/"><Image src={FloWasteLogo} width="50" height="50"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/manager">
                            <Nav.Link>Manager Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/tray-system-screen">
                            <Nav.Link>Tray System</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/game-feed">
                            <Nav.Link>Game Feed</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}