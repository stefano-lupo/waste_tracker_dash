import React from 'react';
import  { Chart } from 'react-google-charts'

const options = {
    title: "Overall Food Waste Per Menu Item (kg)",
    hAxis: { title: "Menu Item" },
    vAxis: { title: "Mass" },
    legend: "none"
};


const dataset = data => {
    let withHeaders = [["Menu Item", "Waste (KG)"]]
    data.forEach(d => withHeaders.push(d));
    return withHeaders
}

export default class WasteByMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        }

        return <Chart
            chartType="BarChart"
            data={dataset(data)}
            options={options}
            width="80%"
            height="400px"
            legendToggle 
        />
    }
}