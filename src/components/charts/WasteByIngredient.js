import React from 'react';
import  { Chart } from 'react-google-charts'

const options = {
    title: "Food Waste By Ingredient (kg)",
    hAxis: { title: "Ingredient" },
    vAxis: { title: "Mass" },
    legend: "none"
};

const dataset = data => {
    let withHeaders = [["Ingredient", "Waste (KG)"]]
    console.log(data)
    data.forEach(d => withHeaders.push(d));
    return withHeaders
}

export default class WasteByIngredient extends React.Component {
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