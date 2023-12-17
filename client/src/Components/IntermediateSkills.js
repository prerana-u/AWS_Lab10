import * as React from 'react';
import './CSS/skillform.css';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
//import ValidationTextFields from './ValidationTextFields';


export default function IntermediateSkills(props) {
  const [DevSkills, setDevSkills] = useState([
    { skill:'Enter Skill'}
  ])

  const [isClicked, setIsClicked] = useState(1)

  //functions
  const removeFields = (index) => {
    let data = [...DevSkills];
    data.splice(index, 1)
    setDevSkills(data)
    setIsClicked(isClicked-1)
    document.getElementById('alert').style.display = 'none';
    
  }
  const addFields = (index) => {
    let data = [...DevSkills];
    data.splice(index, 1)
    if(isClicked>2)
    document.getElementById('alert').style.display = 'inline-block';
    else{
      let newfield = { skill:'Enter Skill'}

      setDevSkills([...DevSkills, newfield])
      setIsClicked(isClicked+1)
    }
   
  }
  const handleFormChange = (index,event) => {
    let data = [...DevSkills];
    data[index][event.target.name] = event.target.value;
    setDevSkills(data);
   // props.sendData(DevSkills);
  }
  const setSkills=(e)=>{

    if(e.target.value!=="" && e.target.value!=="Enter Skill")
    {
      Axios.get("http://localhost:3001/getskills", {
      params: { skill:e.target.value,  regno:sessionStorage.getItem('regno'), category:"Intermediate" }

      }).then((response) => {
          console.log(response.data);
          if(response.data.length>0)
          {
            console.log("Skill Exists");
          }
          else
          {
            Axios.post("http://localhost:3001/setskills", {
              skill:e.target.value,
              category:"Intermediate",
               regno:sessionStorage.getItem('regno'),
              }).then((response) => {
                 console.log(response);
              });
          }
        
      })
      
    }
  
  }


  return (
    <div >
   <form >
   <fieldset style={{padding:'0px 0px 40px 0px', border:'2px solid #196EDA'}}>
   <legend style={{textAlign:'left', padding:'10px'}}>Intermediate Level Skills</legend>
   {DevSkills.map((input, index) => {
    const label="Skill "+(index+1).toString()

    return (
   <div style={{marginTop:'10px',float:'left',marginLeft:'20px'}} key={index}>
    <div style={{float:'left'}}>
      <TextField
            error={false}
            id="filled-error"
            label={label}
            name="skill"
            defaultValue={input.skill}
            variant="filled"
            onChange={(e) => handleFormChange(index,e)}
            onFocus={(e)=>{if(e.target.value==="Enter Skill"){e.target.value=""}}}
            onBlur={(e)=>setSkills(e)}
            sx={{
              width:'400px',
              marginTop:'30px',
             
            }}
          />
   
       
      </div>
     
    <div style={{ marginTop:'40px',marginLeft:'20px', float:'right'}}>
    <Button variant="outlined" onClick={(event) => addFields(index)} >+</Button>
    <Button variant="outlined"  onClick={() => removeFields(index)} style={{marginLeft:'20px'}}>-</Button>
    </div>

    </div>
     )
    })}
    <div style={{width:'400px',height:'30px',display:'none',marginLeft:'20px',float:'left',marginTop:'20px'}} id="alert">
    <Alert severity="error">Max 3 Skills!</Alert>
    </div>
   </fieldset>
   </form>

    </div>
    
  );
  
}
