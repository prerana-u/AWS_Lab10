import React, {  useState, useEffect } from 'react';
import './CSS/search.css';
import Axios from 'axios';
import Verticalnav from  './VerticalNav';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FeedBackCard from './FeedBackCard';
import headimg from './Images/headimg.png';
import { Box } from '@mui/system';


function ViewFeedback() {
  const [fname, setFname] = useState("");
  const [list1,setList1]=useState([]);
  const [tname, setTName]=useState('');
  const[role,setRole]=useState("");

  const fetchdata1 = () => {

Axios.get("http://localhost:3001/get_list_feedback", {

}).then((response) => {
  setList1(response.data)

})
};
  
  
  
  const [profileData, setProfileData]= useState([]);
 
  useEffect(() => {
    console.log(profileData);
    
 }, [profileData]);

  const fetchdata = () => {
  
    Axios.get("http://localhost:3001/get_feedback_result", {
     params: { fname:fname }

    }).then((response) => {
        console.log(response.data);
       
      setProfileData(response.data);
      console.log(profileData);
    })

    };
    const handleChange = (event) => {
        setFname(event.target.value);
      };

     return(
    
      <div className='main' onLoad={fetchdata1}>
      <Verticalnav active="search" role="student"/>

      <div className="container">

    

      <div style={{ width:'fit-content', display:"flex", marginTop:'70px',marginLeft:'-20px'}}>
        <div style={{width:'fit-content'}}>
        <InputLabel id="demo-simple-select-label">Fests</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue="None"
                label="Fests"
                style={{width:'950px'}}
                onChange={handleChange}
            >
                {list1.map((val,key) => {
            return (
                <MenuItem value={val.fname}>{val.fname}</MenuItem>
    
            );
            })}
            
            </Select>
            
        </div>
        <div style={{float:'right',marginTop:'30px',marginLeft:'30px'}}>
        <Button variant="contained" id="searchbtn" onClick={()=>fetchdata()}>Search</Button>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
      <div className='resultGrid'>
      <Grid container spacing={{ xs: 2, md: 6}} columns={{ xs: 4, sm: 8, md: 12 }}>
      {profileData.map((val,key) => {
         return (
          <Grid item xs={2} sm={4} md={4} key={key} display="flex" justifyContent="center" alignItems="center">
           
              <FeedBackCard name={val.name} regno={val.regno} feedback={val.feedback} rating={val.rating}/>
              
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

export default ViewFeedback;