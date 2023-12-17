import * as React from 'react';
import './CSS/profilecard.css';
import Axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';

import ReactJsAlert from "reactjs-alert";
import { createClient } from "@supabase/supabase-js";
export default function FeedBackCard(props) {


	const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
	const { data, error } = supabase
	   .storage
	   .from('pictures')
	   .getPublicUrl('public/'+props.name+'.png')
	   console.log(data.publicUrl);


  return (
    <div className="card-container" style={{height:'320px'}}>
	<img className="round" src={data.publicUrl} alt="user" />
	<h3>{props.name}</h3>
	<h4>{props.regno}</h4>
	

	<div className="s_skills" style={{height:'120px'}}>
		<h4>Feedback</h4>
		<p>{props.feedback}</p>
		<br/>
		<h5>Rating: </h5>
		<p>{props.rating} stars</p>
	
	</div>
	
    </div>
  );
}