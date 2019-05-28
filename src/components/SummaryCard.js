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
        <div class="card">
            <div class={"card-body " + alignmentClass}>
                <div class="row align-items-center" >
                    <div class="col-md-4">
                        <i class={"fas fa-5x " + icon}></i>
                    </div>
                    <div class="col-md-4">
                        <h3 class="card-title">{title}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">{subtitle}</h6>
                    </div>
                    <div class={"col-md-4 " + alignmentClass}>
                        <h2 class={colourClass}>{deltaWithSign}%</h2>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}