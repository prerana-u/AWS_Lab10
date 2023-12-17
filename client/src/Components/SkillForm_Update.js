import * as React from 'react';
import './CSS/skillform.css';
import {TextField} from '@mui/material';
import AddSkills from './AddSkills';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
//import { useState } from 'react';
//import ValidationTextFields from './ValidationTextFields';


export default function SkillForm() 
{
    const navigate=useNavigate();
  const [adv_skills, setAdv_skills] = useState([]);
  const [int_skills, setInt_skills] = useState([]);
  const [new_skills, setNew_skills] = useState([]);
  //const [props1,setSkill]=useState([]);
  var arr = [];
  var arr1 = [];
  var arr2 = [];
  var i=0;

  
  const fetchdata = () => {
         
    arr=[];
    arr1=[];
    arr2=[];

    Axios.get("http://localhost:3001/getskill_studentdash", {
        params: { regno:sessionStorage.getItem('regno')}         
    }).then((response) => {
 
    while(response.data.length>0)
    {
    // console.log(response.data[5]);
    
        if(response.data[i].category === 'Advanced')
        {
            arr.push(response.data[i].skill);
            console.log(i+" "+arr);
        }
    
        else if(response.data[i].category === 'Intermediate')
        {
            arr1.push(response.data[i].skill);
            console.log(i+" "+arr1);
        }
    
        else
        {
            arr2.push(response.data[i].skill);
            console.log(i+" "+arr2);
        }
    
        i++;
        if(i>=response.data.length) break;
   
    
    }
    setAdv_skills(arr);
    console.log(adv_skills);
    setInt_skills(arr1);
    setNew_skills(arr2);
    // console.log(arr);
    
    // console.log(new_skills);

    })
  }

const handleAdvChange = (index,event) => {
   
    Axios.post("http://localhost:3001/updateskills", {
            skill:adv_skills[index],
            newskill:event.target.value,
            regno:sessionStorage.getItem('regno'),
            }).then((response) => {
               console.log(response);
            });
 // props.sendData(DevSkills);
 
}
const handleIntChange = (index,event) => {
   
    Axios.post("http://localhost:3001/updateskills", {
            skill:int_skills[index],
            newskill:event.target.value,
            regno:sessionStorage.getItem('regno'),
            }).then((response) => {
               console.log(response);
            });
 // props.sendData(DevSkills);
 
}
const handleNewChange = (index,event) => {
   
    Axios.post("http://localhost:3001/updateskills", {
            skill:new_skills[index],
            newskill:event.target.value,
            regno:sessionStorage.getItem('regno'),
            }).then((response) => {
               console.log(response);
            });
 // props.sendData(DevSkills);
 
}

useEffect(() => {
    fetchdata();
  
     
  }, []);
  

  return (
    <div  >
   
    <form >
    <fieldset style={{padding:'0px 0px 40px 0px', border:'2px solid #196EDA'}}>
   <legend style={{textAlign:'left', padding:'10px'}}>Developed Skills</legend>
   <div >
   {adv_skills.map((input, index) => {
    const label="Skill "+(index+1).toString()
    console.log(adv_skills);
    return (
   <div style={{marginTop:'10px',marginLeft:'20px'}} key={index}>
    <div >
      <TextField
            error={false}
            id="filled-error"
            label={label}
            name="skill"
            defaultValue={input}
            variant="filled"
            onBlur={(e) => handleAdvChange(index,e)}
            onFocus={(e)=>{if(e.target.value==="Enter Skill"){e.target.value=""}}}
           
            sx={{
              width:'400px',
              marginTop:'30px',
            }}
          />
      </div>

    </div>
     )
    })}
    </div>
   
    </fieldset>
    <fieldset style={{padding:'0px 0px 40px 0px', border:'2px solid #196EDA'}}>
   <legend style={{textAlign:'left', padding:'10px'}}>Intermediate Skills</legend>
   <div >
   {int_skills.map((input, index) => {
    const label="Skill "+(index+1).toString()
    console.log(adv_skills);
    return (
   <div style={{marginTop:'10px',marginLeft:'20px'}} key={index}>
    <div >
      <TextField
            error={false}
            id="filled-error"
            label={label}
            name="skill"
            defaultValue={input}
            variant="filled"
            onBlur={(e) => handleIntChange(index,e)}
            onFocus={(e)=>{if(e.target.value==="Enter Skill"){e.target.value=""}}}
           
            sx={{
              width:'400px',
              marginTop:'30px',
            }}
          />
      </div>
   

    </div>
     )
    })}
    </div>
   
    </fieldset>
    <fieldset style={{padding:'0px 0px 40px 0px', border:'2px solid #196EDA'}}>
   <legend style={{textAlign:'left', padding:'10px'}}>New Skills</legend>
   <div >
   {new_skills.map((input, index) => {
    const label="Skill "+(index+1).toString()
    console.log(new_skills);
    return (
   <div style={{marginTop:'10px',marginLeft:'20px'}} key={index}>
    <div >
      <TextField
            error={false}
            id="filled-error"
            label={label}
            name="skill"
            defaultValue={input}
            variant="filled"
            onBlur={(e) => handleNewChange(index,e)}
            onFocus={(e)=>{if(e.target.value==="Enter Skill"){e.target.value=""}}}
           
            sx={{
              width:'400px',
              marginTop:'30px',
            }}
          />
      </div>
   
    </div>
     )
    })}
    </div>
   
    </fieldset>
   </form>
   
    </div>
    
  );
  
}
