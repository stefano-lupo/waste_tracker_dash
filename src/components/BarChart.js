import React, { Component } from 'react';
import  { Chart } from 'react-google-charts'

const options = {
    title: "Overall Food Waste Per Menu Item (kg)",
    hAxis: { title: "Menu Item" },
    vAxis: { title: "Mass" },
    legend: "none"
};
const data = [
    ,
];

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        }

        console.log("Had data")
        console.log(data)

        return <Chart
            chartType="BarChart"
            data={this.props.data}
            options={options}
            width="80%"
            height="400px"
            legendToggle 
        />
    }
}