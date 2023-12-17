import React from 'react';
import '../App.css';
//import './CSS/studentdash.css';
import './CSS/editstu.css';
import Verticalnav from  './VerticalNav';
//import Preview from './StudentPro';
//import AddFest from './Addfest';
//import AddProj from './AddProj';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
//import Preview from './component/preview_festcard';
//import 'bootstrap/dist/css/bootstrap.css';
//import headimg from './Images/headimg_stu.png';

import { createClient } from "@supabase/supabase-js";
function EditProfileTeach() {
        const navigate=useNavigate();
        const [sname, setSname]=useState("");
        const [semail, setSemail]=useState("");
        
        const [sdep, setSdep]=useState("");
        const [sphn, setsphn]=useState("");
        const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
        //const [FestDets, setFestDets] = useState([]);
        const [tid, setTid]=useState("");
      
        //const [props1,setSkill]=useState([]);
   
       

        const update=(e) => {
            
           
            axios.post("http://localhost:3001/teachdataup", {
                 name:sname,
                 email:semail,
                 dep:sdep,
                 phone:sphn,
                 tid:tid,
            }).then((response) => {
                console.log(response);
               emptyCache();
            });
                  
        }
        const fetchdata = () => {
            axios.get("http://localhost:3001/teachdata", {
                
            }).then((response) => {
      
            setSname(response.data[0].name);
          
            setSdep(response.data[0].dep);
            setTid(response.data[0].tid);
            setsphn(response.data[0].phone);
            setSemail(response.data[0].email);
            //console.log(response);
            //console.log(response.data);
        })
        
    }

    async function upload(event) 
    {
        const avatarFile = event.target.files[0]
        const { data, error } = await supabase
          .storage
          .from('pictures')
          .update('public/'+sname+'.png', avatarFile, {
            cacheControl: '3600',
            upsert: true
          })
    }

    function emptyCache(){
       
        if('caches' in window){
        caches.keys().then((names) => {
                // Delete all the cache files
                names.forEach(name => {
                    caches.delete(name);
                })
            });
    
            // Makes sure the page reloads. Changes are only visible after you refresh.
            window.location.reload(true);
        }
    }

    useEffect(() => {
        fetchdata();         
      }, []);

    
      const { data, error } = supabase
        .storage
        .from('pictures')
        .getPublicUrl('public/'+sname+'.png')

 return (
   <div >
    <Verticalnav role="teacher"/>
      <div className="Scontainer">
        <div className="Smain_content">
            <form onSubmit={update}>
                <fieldset>
                    <legend style={{color:'#196EDA',fontWeight:'bold'}}>Profile Details</legend>
                    <div className='img1'  style={{display:"flex", flexDirection:"column", alignItems:"center"}}><img src={data.publicUrl} alt="navimg"/></div>
                   
                    <div className="row">
                    <div className="col-25">
                    <label htmlFor="Reg" id="r">Teacher ID</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="rn" value={tid} disabled 
                  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="fname" id="r">Name</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="rn" name="firstname" defaultValue={sname} placeholder="Your name.." required onChange={(e) =>{
                    setSname(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="Stu_email" id="r">Email</label>
                    </div>
                    <div className="col-75">
                    <input type="email" id="rn" name="Semail" defaultValue={semail} placeholder="Your Email.." required onChange={(e) =>{
                    setSemail(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="Stu_dep" id="r">Department</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="rn" name="Sdept" defaultValue={sdep} placeholder="Your Department name.." required onChange={(e) =>{
                    setSdep(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="Stu_phn" id="r">Phone Number</label>
                    </div>
                    <div className="col-75">
                    <input type="Number" id="rn" name="phn" defaultValue={sphn} placeholder="Your Phone number.." required onChange={(e) =>{
                    setsphn(e.target.value)}}/>
                    </div>
                </div>
               
                <br/>
                 <label>Change Profile Photo:  </label>
                <input type="file" id="myfile" name="myfile"  onChange={(e)=>(upload(e))}></input>
                <br/>
                <div className="row">
                    <input type="submit" value="Submit"/>
                </div>
                </fieldset>
               
            </form>
        </div>  
    </div>
</div>
   
 );
}
export default EditProfileTeach;