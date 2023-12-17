import * as React from 'react';
import './CSS/skillform.css';
import DevelopedSkills from './AdvancedSkills';
import IntermediateSkills from './IntermediateSkills';
import NewSkills from './NewSkills';


export default function AddSkills() 
{
  
  return (
   
    <div>
      <div style={{height:'fit-content',overflow: 'hidden',marginBottom:'40px'}}>
      <DevelopedSkills />
      </div>
      <div style={{height:'fit-content',overflow: 'hidden',marginBottom:'40px'}}>
      <IntermediateSkills />
      </div>
      <div style={{height:'fit-content',overflow: 'hidden',marginBottom:'40px'}}>
      <NewSkills/>
      </div> 
   </div>
 
  );
  
}
