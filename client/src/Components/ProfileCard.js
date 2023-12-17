import * as React from 'react';
import './CSS/profilecard.css';
import Axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';

import ReactJsAlert from "reactjs-alert";
import { createClient } from "@supabase/supabase-js";
export default function ProfileCard(props) {
	const [skillData, setSkillData]= useState([]);
	const [status, setStatus] = useState(false);
	const [type, setType] = useState("Success");
	const [title, setTitle] = useState("Request Sent");
	const fetchdata = () => {
  
		Axios.get("http://localhost:3001/getskill_studentdash", {
		  params: { regno:props.regno }
	
		}).then((response) => {
			console.log(response.data);
		   
		  setSkillData(response.data);
		  console.log(skillData);
		})
	
		}; 

	const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
	const { data, error } = supabase
	   .storage
	   .from('pictures')
	   .getPublicUrl('public/'+props.name+'.png')
	   console.log(data.publicUrl);

  return (
    <div className="card-container" onLoad={fetchdata}>
	    <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        quotes= {true} 
        quote= "Request has been sent to the student!"
        Close={() => setStatus(false)}
      />
	<img className="round" src={data.publicUrl} alt="user" />
	<h3>{props.name}</h3>
	<h6>{props.semester} {props.sclass}</h6>
	<p>Department of {props.dep}</p>

	<div className="s_skills">
		<h5>Skills</h5>
		<br/>
		<ul>
			{skillData.map((val,key)=>{
			return(
				<li key={key}>{val.skill}</li>
			);
		})}
			
		</ul>
		{localStorage.getItem("isRecruit")=="true"?<Button variant="contained" size="small" id="recbtn" style={{backgroundColor:'white', fontWeight:'bold',color:'#1BA2DE', marginTop:'10px', marginBottom:'10px'}} onClick={()=>{localStorage.setItem("Selected",props.regno);setStatus(true);}}>Recruit</Button>:console.log("none")}
	</div>
	
    </div>
  );
}