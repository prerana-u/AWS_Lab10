import * as React from 'react';
import './CSS/register.css';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
//import ValidationTextFields from './ValidationTextFields';


export default function FestReg(props) {
  const [DevSkills, setDevSkills] = useState([
    { skill:'Enter Skill'}
  ])


  const handleFormChange = (index,event) => {
    let data = [...DevSkills];
    data[index][event.target.name] = event.target.value;
    setDevSkills(data);
    props.sendData(DevSkills);
    //console.log(DevSkills[index]);
  }

  return (
    <div>
        <div id="freg">
            <form >
                
            </form>
        </div>
       

    </div>
    
  );
  
}
