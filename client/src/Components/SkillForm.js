import * as React from 'react';
import './CSS/skillform.css';
import AddSkills from './AddSkills';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import SkillFormUpdate from './SkillForm_Update';
import { useNavigate } from "react-router-dom";
import Verticalnav from './VerticalNav';
import Axios from 'axios';

export default function SkillForm() 
{
  const navigate=useNavigate();
  const [isSkills,setIsSkills]=useState(false);
  const SendSkills=()=>
  {
   
     navigate('/studentdash');

  }
  const fetchdata = () => {

    Axios.get("http://localhost:3001/getskill_studentdash", {
        params: { regno:sessionStorage.getItem('regno')}         
    }).then((response) => {
        if(response.data.length > 0)
        setIsSkills(true);
        else
        setIsSkills(false);

    })
  }
  useEffect(() => {
    fetchdata();
  
     
  }, []);

  return (
    <div>
     <Verticalnav role="student" />
     <div id="sf" >
    
    <h2>Skill Updation Form</h2>
    <h3>Enter your Skills below</h3>
    { isSkills ?  <SkillFormUpdate/> : <AddSkills/>
   }
   
  
    <Button variant="contained" onClick={SendSkills} style={{marginTop:'20px'}}>Submit</Button> 
    </div>
    
    </div>
    
  );
  
}
