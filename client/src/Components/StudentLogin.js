import React, {  useState } from "react";
import '../App.css';
import Axios from 'axios';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Alert from '@mui/material/Alert';
import { useAuth0 } from "@auth0/auth0-react"

function StudentLogin() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState ("");
    const[loginStatus,setLoginStatus]=useState(false);
    const students="https://2247250-bucket.s3.amazonaws.com/loginstu.png";
    const navigate=useNavigate();
    useEffect(() => {
    console.log(loginStatus);
    }, [loginStatus]);
  
    const login1 = (event) => {
      event.preventDefault();
        Axios.post("http://localhost:3001/login", {
           email: email,
           password: password,
        
        }).then((response) => {
           if (response.data.length>0) {
              console.log("Successfully logged in");
              console.log(response);
              setLoginStatus(true);
              localStorage.setItem("email",true);
              sessionStorage.setItem("email",email);
              sessionStorage.setItem("regno",response.data[0].regno);
              navigate('/studentdash');
            
           } else {
              setLoginStatus(false);
              document.getElementById('alert1').style.display = 'inline-block';
           }
        }); 
        
     
      
      }
     



    return (
      <div id="logindiv">
       
      <div className="registration">
      <h1 >Student Login</h1>
      <h3 >Enter Your Details Below</h3>
          <form>
         
          <div id="fimg-1">
          <img src={students} alt="studentimage"></img>
          </div>
         <div id="finput-1" >
         <div className="fontuser">

         <label>Email ID</label>
          <input type="email" required onChange={(e) => {
             setemail(e.target.value);
       
          }}/>
         <i className="fa fa-envelope fa-lg"></i>
          <br/>

         </div>
         

         <div className="fontuser password">
         <label>Password</label>
         <input type="password" required onChange={(e) =>{
               setPassword(e.target.value);
            }}/> 
          <i className="fa fa-lock fa-lg"></i>
         </div>
   
          <button onClick={(e)=>login1(e)} id="regbtn"> Login</button>
          </div>
          <div style={{width:'400px',height:'30px',display:'none',marginLeft:'20px',float:'left',marginTop:'20px'}} id="alert1">
            <Alert severity="error">Invaild ID or Password</Alert>
         </div>
          </form>
         
       </div>
       
  </div>
    );
 }
  
 export default StudentLogin;