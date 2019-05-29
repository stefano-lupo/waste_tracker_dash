import React, { Component } from 'react';

import Api from '../api/Api';


export default class ThreeScene extends Component {

    constructor(props) {
        super(props);
        this.api = new Api();
    }

    componentDidMount(){
        
    }

    render(){
        
        const { icon, title, subtitle, alignment, delta } = this.props
        let alignmentClass = alignment ? alignment : "center";
        alignmentClass = "text-" + alignmentClass;
        
        let deltaWithSign = "", colourClass = "";
        if (delta > 0) {
            deltaWithSign = "+" + delta;
            colourClass = "text-danger"
        } else if (delta < 0) {
            deltaWithSign = delta;
            colourClass = "text-success";
        } else {
            deltaWithSign = delta;
            colourClass = "text-warning";
        }
        
        return (
        <div className="card">
            <div className={"card-body " + alignmentClass}>
                <div className="row align-items-center" >
                    <div className="col-md-4">
                        <i className={"fas fa-5x " + icon}></i>
                    </div>
                    <div className="col-md-4">
                        <h3 className="card-title">{title}</h3>
                        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                    </div>
                    <div className={"col-md-4 " + alignmentClass}>
                        <h2 className={colourClass}>{deltaWithSign}%</h2>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}