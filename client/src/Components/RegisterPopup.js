import React,{ useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import './CSS/popup.css';
import axios from 'axios';
import { Button } from '@mui/material';
export default function RegisterPopup(props) {
    
 
  const[events,setEvents]=useState([]);
  const[selectedEvent,setSelectedEvent]=useState("");
  const navigate=useNavigate();
  var arr=[];
  
  const getEvents= () => {
    var fid=props.fid;
    
    axios.get("http://localhost:3001/get_eventlist", {
        params: { fid: fid}
  
      }).then((response) => {
        console.log(response.data[0])
         //console.log(response.data[0].adv_skill1);
        if(response.data[0].event1!=='None' && response.data[0].event1!=='none')
        {
            //console.log(response.data[0].adv_skill1);
            arr.push(response.data[0].event1);
            
        }
        if(response.data[0].event2!=='None' && response.data[0].event2!=='none')
        {
            //console.log(response.data[0].adv_skill1);
            arr.push(response.data[0].event2);
            
        }
        if(response.data[0].event3!=='None' && response.data[0].event3!=='none')
        {
            //console.log(response.data[0].adv_skill1);
            arr.push(response.data[0].event3);
            
        }
       
        if(response.data[0].event4!=='None' && response.data[0].event4!=='none')
        {
            //console.log(response.data[0].adv_skill1);
            arr.push(response.data[0].event4);
            
        }
        if(response.data[0].event5!=='None' && response.data[0].event5!=='none')
        {
            //console.log(response.data[0].adv_skill1);
            arr.push(response.data[0].event5);
            
        }
       
        setEvents(arr);
        console.log(events);
     
      })
};
   const handlesubmit = (e) => {
           
    console.log(sessionStorage.getItem("regno"));
    axios.post("http://localhost:3001/register_event", {
                fid:props.fid,
                eventname:selectedEvent,
                regno:sessionStorage.getItem("regno"),
        

                }).then((response) => {
               console.log(response);
               
      });
      navigate('/studentdash');

     }




    return (
                      
        <div >
            <Popup trigger=
                { <Button size="small" color="primary" >
                Register</Button>}
                modal nested onOpen={()=>{getEvents()}}>
                {
                    close => (
                        <div className='modal' >
                            <div className='content' >
                                <h2 style={{textAlign:'center'}}>Choose an Event</h2>
                                <form>
                                    <fieldset className='ffieldset'>
                                        <legend>Events</legend>
            
                                    <label> 
                                    Event List:
                                        <select className="inputfields" onChange={(e) => {setSelectedEvent(e.target.value);}}>
                                            <option value="None">None</option>
                                            {events.map((val,key) => {
                                                return (
                                                    <option value={val} key={key}>{val}</option>
                                                    );
                                                    })}
                                        </select>
                                       
                                    </label>
                                    <input type="submit" value="Register" onClick={()=>{handlesubmit()}}/>
                                    </fieldset>
                                  
                                </form>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};