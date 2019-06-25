import React from 'react';
import  { Chart } from 'react-google-charts'

import objectToArray from '../../Util'
import { BY_ID } from '../../Constants'
console.log(BY_ID)

let slices = []

const options = {
    // title: "Food Waste by Ingredient",
    //legend: "none"
    slices,
};

const dataset = data => {
    let withHeaders = [["Menu Item", "Waste (KG)"]]
    data.forEach(d => {
        const byId = BY_ID[d[0]]
        const entry = [byId.name, d[1]]
        console.log(entry)
        withHeaders.push(entry)
        slices.push({color: byId.color})
    });
    // console.log(withHeaders)
    return withHeaders
}

export default class WasteByIngredientScan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: objectToArray(props.data)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps == this.props) {
            return;
        }

        const data = objectToArray(this.props.data)
        this.setState({
            data
        });
    }

    render() {
        const { data } = this.state;
        
        if (!data) {
            return null;
        }
        
        // console.log(BY_ID.values().map(e => console.log(e)))
        return <Chart
            chartType="PieChart"
            colors={Object.values(BY_ID).map(en => en.color)}
            data={dataset(data)}
            options={options}
            width="500px"
            height="500px"
            legendToggle 
    />
    }
}