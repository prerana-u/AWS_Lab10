import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import './CSS/navbar.css';
import { useEffect, useState } from 'react';
import logo from './Images/sflogo.png';
const Navbar= () =>{
  const [nlink,setnlink]=useState("/register");
  
  function fetchdata()
  {
    
      if(sessionStorage.email !== undefined)
      {
        document.getElementById("login").innerHTML="<b>Logout</b>";
        document.getElementById('ricon').className="fa fa-user";
        if(sessionStorage.studentName !== undefined)
        {
          document.getElementById("register").innerHTML="<b> DashBoard</b>";
          setnlink("/studentdash");
        }
        else {
          document.getElementById("register").innerHTML="<b> DashBoard</b>";
          setnlink("/td");
        }
        
      }
     
  }
  function logout()
 {
    sessionStorage.clear();
    localStorage.removeItem("email");
    
    window.location="http://localhost:3000/login";
 }
  useEffect(()=>{
    fetchdata();
  },[]);
   
  return (
  <div>
    <Link to="/"> <img src={logo} alt="logo" id="logo"></img></Link>
    <nav>
    
        <ul>
            <li>
              <Link to="/"><b><em> SkillFord</em></b></Link>
            </li>
            <li id="ab">
            <HashLink to="/#about"><b><i className="fa fa-info-circle"></i>  About</b></HashLink>
              </li>
            <li id="log">
              <Link to={nlink} > <i className="fa fa-user-plus" id="ricon"></i><b id="register">  Register</b></Link>
            </li>
            <li id="log">
              <Link to="/" onClick={logout} > <i className="fa fa-sign-in"></i> <b id="login"> Login</b></Link>
              </li>
        </ul>
        
    </nav>
    <Outlet />
  </div>
  );

}
export default Navbar;