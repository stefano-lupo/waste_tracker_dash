import React, { Component } from 'react';

import Api from '../api/Api';

import SummaryCard from './SummaryCard';

export default class ThreeScene extends Component {

    constructor(props) {
        super(props);
        this.api = new Api();
    }

    componentDidMount(){
        
    }

    render(){

        return (
            <div className="container-fluid container-fluid-small">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <SummaryCard alignment="center" icon="fa-money-bill-alt"
                        title="€60" subtitle="lost due to food waste" delta={-3}/>
                    </div>
                    <div className="col-md-4">
                        <SummaryCard alignment="center" icon="fa-balance-scale"
                        title="30KG" subtitle="worth of food waste" delta={+5}/>
                    </div>
                    <div className="col-md-4">
                        <SummaryCard alignment="center" icon="fa-globe-europe" title="60KG" subtitle="of C02 produced" delta={+5}/>
                    </div>
                </div>
            </div>
        );
    }
}