import React, { Component } from 'react';
import { useEffect } from 'react';

import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function StudentChart(props) 
{
    const options = {
        animationEnabled: true,	
        title:{
            text: "Number of Fests and Projects This Year",
            fontFamily:"Gugi,cursive",
            padding:10,
            fontSize:28,
        },
        axisY : {
            title: "Number of Fests/Projects",
            titleFontFamily:"Gugi,cursive",
            titlePadding:10,
            titleFontSize:18,
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            name: "Fests",
            showInLegend: true,
            dataPoints: props.dataPoints,
        },
        {
            type: "spline",
            name: "Projects",
            showInLegend: true,
            dataPoints: props.dataPoints2,
        }]
}
    
    

    return(
        <div>
			<CanvasJSChart options = {options} 
				//  onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>

    )
    
    
}