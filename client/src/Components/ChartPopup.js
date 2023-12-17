import React,{ useEffect, useState} from 'react';
import StudentChart from './StudentChart';
import Popup from 'reactjs-popup';
import './CSS/popup.css';
import axios from 'axios';
import { Button } from '@mui/material';

export default function ChartPopup(props) {
    var dataPoints =[];
    var dataPoints2=[];
    const loaddata=()=>{
        if(props.role==="student")
        {
            axios.get("http://localhost:3001/getchart", {
                params: { regno: sessionStorage.getItem("regno")}
          
              })
                    .then((response) => {
                        dataPoints=[];
                        for (var i = 0; i < response.data.length; i++) {
                        dataPoints.push({
                            label: response.data[i].x,
                            y: response.data[i].y
                        });
                    }})
    
            axios.get("http://localhost:3001/getchartproject", {
                params: { regno: sessionStorage.getItem("regno")}
            
                })
                    .then((response) => {
                        dataPoints2=[];
                        for (var i = 0; i < response.data.length; i++) {
                        dataPoints2.push({
                            label: response.data[i].x,
                            y: response.data[i].y
                        });
                    }})
        }
        else {
            axios.get("http://localhost:3001/getchartteach", {
                params: { tid: sessionStorage.getItem("tid")}
          
              })
                    .then((response) => {
                        dataPoints=[];
                        for (var i = 0; i < response.data.length; i++) {
                        dataPoints.push({
                            label: response.data[i].x,
                            y: response.data[i].y
                        });
                    }})
    
            axios.get("http://localhost:3001/getchartprojectteach", {
                params: { tid: sessionStorage.getItem("tid")}
            
                })
                    .then((response) => {
                        dataPoints2=[];
                        for (var i = 0; i < response.data.length; i++) {
                        dataPoints2.push({
                            label: response.data[i].x,
                            y: response.data[i].y
                        });
                    }})
        }
      
    }

    useEffect(() => {
       console.log(dataPoints,dataPoints2);
      }, [dataPoints,dataPoints2]);
    return (
                      
        <div >
            <Popup trigger=
                { <Button size="small" color="primary" >
                 <i
                  className="fa-solid fa-up-right-from-square fa-xl"
                    style={{ color: "#196EDA" }}
                  ></i></Button>}
                modal nested onOpen={loaddata} >
                {
                    close => (
                        <div className='modal' >
                            <StudentChart  dataPoints={dataPoints} dataPoints2={dataPoints2}/>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};