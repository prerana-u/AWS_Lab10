import React, {  useState, useEffect } from 'react';
import './CSS/search.css';
import Axios from 'axios';
import Verticalnav from  './VerticalNav';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ProfileCard from './ProfileCard';
import headimg from './Images/headimg.png';
import { Box } from '@mui/system';

function SearchBar() {
  const [skills, setSkills] = useState("");
  const [tname, setTName]=useState('');
	
  const fetchdata1 = () => {
  Axios.get("http://localhost:3001/teachdata", {

  }).then((response) => {
     sessionStorage.teacherName=response.data[0].name;
     setTName(response.data[0].name);
     console.log(response);
     console.log(response.data);
     var s=document.getElementById('input-with-icon-adornment');
     if(sessionStorage.getItem("Skills")!=undefined && s.value=="Search for a Skill..." )
     {
      s.value=sessionStorage.getItem("Skills");
      setSkills(sessionStorage.getItem("Skills"));
     }
})
};
  
  
  
  const [profileData, setProfileData]= useState([]);
 
  useEffect(() => {
    console.log(profileData);
    
 }, [profileData]);
  const fetchdata = () => {
  
    Axios.get("http://localhost:3001/getskills_search", {
      params: { skill:skills }

    }).then((response) => {
        console.log(response.data);
       
      setProfileData(response.data);
      console.log(profileData);
    })

    };

  const clearInput = () => {
    if( document.getElementById('input-with-icon-adornment').value==="Search for a Skill...")
    document.getElementById('input-with-icon-adornment').value="";

  }
  const defaultInput=()=>{
    var s=document.getElementById('input-with-icon-adornment').value;
    if(s==="")
    document.getElementById('input-with-icon-adornment').value="Search for a Skill...";
    else
    console.log(skills);

  }
     return(
    
      <div className='main' onLoad={fetchdata1}>
      <Verticalnav active="search" role="teacher"/>
      <div className="container">

      <div className="heading">
            <div className='headingcontent1'>
               <div className='headtext'>Welcome {tname}</div>
               <div className='headimg'><img src={headimg} alt="headimg"/></div>
            </div>
      </div>

      <div>
      <div style={{float:'left', marginLeft:'200px'}}>
      <Input
          id="input-with-icon-adornment"
          className="searchBar"
          defaultValue="Search for a Skill..."
          onChange={(e) =>{
            setSkills(e.target.value);
         }}
          onFocus={clearInput}
          onBlur={defaultInput}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon id='sicon'/>
            </InputAdornment>
          }
        />
        
      </div>
      <div style={{float:'right',marginTop:'50px',marginLeft:'30px'}}>
      <Button variant="contained" id="searchbtn" onClick={()=>fetchdata()}>Search</Button>
      </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
      <div className='resultGrid'>
      <Grid container spacing={{ xs: 2, md: 6}} columns={{ xs: 4, sm: 8, md: 12 }}>
      {profileData.map((val,key) => {
         return (
          <Grid item xs={2} sm={4} md={4} key={key} display="flex" justifyContent="center" alignItems="center">
           
              <ProfileCard name={val.name} sclass={val.class} semester={val.semester} dep={val.dep} regno={val.regno}/>
              
          </Grid>
          );
         })}
      </Grid>
      
      </div>
      </Box>
        
      </div>
      </div>
        

     );

}

export default SearchBar;