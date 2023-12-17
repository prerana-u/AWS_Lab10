import React, { useEffect } from 'react'
import './CSS/nav.css';

import sflogo from './Images/sflogo.png';
import { HashLink } from 'react-router-hash-link';
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Verticalnav = (props)=> {
  //console.log(props.role);
  const [uname,setUname]=useState("");
  const [nlink,setnlink]=useState("");
  const [elink,setelink]=useState("");
  const [slink,setslink]=useState("");
  const [flink,setflink]=useState("");

  const url="https://2247250-bucket.s3.amazonaws.com/Prerana+Udupa.png";

  const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
 (function(){
      localStorage.getItem("email")==="true" ? console.log("verfied") : window.location.href='http://localhost:3000/login';
      
 })()

  function fetchdata()
 {
    if(props.role==="teacher")
    {
      setUname(sessionStorage.teacherName);
     
      setnlink("/td");
      setslink("/search");
      setelink("/editprofileteach");
      setflink("/viewfeedbackteach");
      console.log(uname);
    }
    else
    {
      setUname(sessionStorage.studentName);
     
      setnlink("/studentdash");
      console.log(uname);
    //  console.log( document.getElementById("s").value);
      document.getElementById("s").innerHTML="<b>Edit Skills</b>";
      document.getElementById('sicon').className="fa fa-pencil";
      setslink("/skillform");
      setflink("/viewfeedback");
      setelink("/editprofile");
    }


    
 }
 function logout()
 {
   
    sessionStorage.clear();
    localStorage.removeItem("email");
    window.location="http://localhost:3000/login";
 }

 const recruit=()=>{ console.log("HI");localStorage.setItem("isRecruit","false");}
 
 const { data, error } = supabase
 .storage
 .from('pictures')
 .getPublicUrl('public/'+uname+'.png')
 //console.log(data.publicUrl);

 useEffect(()=>{
  fetchdata();
  console.log(uname);
},[uname]);
 


 
  
  return (
    <div className='VNavContainer' >
      <nav className='vnav'>
         <div className="profile">
          <div className='logo1'><img src={sflogo} alt="navimg" /></div>
          <div className='img1'><img src={url} alt="navimg"/></div>
         </div>
         <div className="nav1">
         <ul>
            <li>
            <NavLink to={nlink} name="dashboard" activeClassname='active' id="link"><b><i className="fa fa-user" style={{color: "#FFF"}}></i>  Dashboard</b></NavLink>
            </li>
            <br/>
            <li>
            <NavLink to={slink} activeClassname='active'  name="search" id="link" onClick={recruit}><i id="sicon" className="fa fa-search" ></i> <b id="s"> Search</b></NavLink>
            </li>
            <br/>
            <li>
            <NavLink to="/"  name="home" activeClassname='active' id="link"><b><i className="fa fa-home"></i>  Home</b></NavLink>
            </li>
            <br/>
            <li>
            <HashLink to="/#about" name="about" activeClassname='active' id="link"><b><i className="fa fa-info-circle"></i>  About</b></HashLink>
         
            </li>
            <br/>
           
            <li>
            <NavLink to={flink}  name="viewfeedback" activeClassname='active' id="link"><b><i className="fa-sharp fa-solid fa-comment"></i> Feedback</b></NavLink>
            </li>
            <li>
          
            <NavLink to={elink} name="editprofile" activeClassname='active' id="link"><b><i className="fa fa-user-pen"></i>  Edit Profile</b></NavLink>
            </li>
            <br/>
            
            <li>
            <NavLink to="/"  id="link" onClick={logout}><b><i className="fa fa-sign-out"></i>  Logout</b></NavLink>
            </li>
         
         </ul>
         </div>
      </nav>
    </div>
  )
}
export default Verticalnav;
