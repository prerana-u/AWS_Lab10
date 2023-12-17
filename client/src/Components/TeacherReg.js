import React, {  useState } from "react";
import './CSS/register.css';
import Axios from 'axios';
import { createClient } from "@supabase/supabase-js";
import teacher from './Images/teacher.png';
function TeacherReg() {
    const [emailReg, setemailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState ("");
    const [namereg, setnameReg] = useState ("");
    const [depReg, setdepReg] = useState ("");
    const [phreg, setphReg] = useState ("");
    const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
    const letters = /^[A-Za-z]+$/;
    const register1 = () => {
     if(letters.test(namereg))
     {
         if(phreg.length === 10)
         {
            Axios.post("http://localhost:3001/registerTeach", {
               name:namereg,
               email: emailReg,
               password: passwordReg,
               dep:depReg,
               phone:phreg,
            }).then((response) => {
               console.log(response);
            });
         }
         else
         {
            alert("Please Enter Correct Phone Number.(10 digit)");
         }
     }
     else
     {
        alert("Name can't contain digits");
     }
       
      };
 
      async function upload(event) 
      {
         console.log(namereg);
         const avatarFile = event.target.files[0]
         const { data, error } = await supabase
         .storage
         .from('pictures')
         .upload('public/'+namereg+'.png', avatarFile, {
            cacheControl: '3600',
            upsert: false
         })
         console.log("hello");
      }

    return (

        <div id="reg">
      
          <div className="registration">
          <h1>Teacher Registration</h1>
          <h3>Enter Your Details Below</h3>
            <form>
            <div id="fimg" style={{padding:"30px"}}>
            <img src={teacher} alt="studentimage"></img>
            </div>
           <div id="finput" >
            <label>Name</label><br></br>
            <input type="text" className="input1" onKeyDown={(e)=>{return /[A-Za-z]/i.test(e.target.key)}} required onChange={(e) =>{
               setnameReg(e.target.value);
            }}/> <br />
            <label>Department</label>
            <input type="text" className="input1" required onChange={(e) =>
            {
                setdepReg(e.target.value);
            }
             }/>
             <br/>
            <label>Email ID</label>
            <input type="email" required onChange={(e) => {
               setemailReg(e.target.value);
            }}/><br/>

             <div style={{display:"flex", width:"445px"}}>
             <div style={{display: "inline-block"}}>
                  <label>Password</label>
                  <input type="password" required onChange={(e) =>{
                        setPasswordReg(e.target.value);
                     }}/> 
                 
               </div>
               <div style={{display: "inline-block",width:"300px"}}>
                  <label>Confirm Password</label>
                     <input type="password" required onChange={(e) =>{
                           setPasswordReg(e.target.value);
                        }}/> 
               </div>
           </div>
           
            <label>Phone Number</label>
            <input type="tel" required onChange={(e) =>{
               setphReg(e.target.value);
            }}/> <br />
             <label>Choose a Profile Photo:  </label>
            <input type="file" id="myfile" name="myfile" required onChange={(e)=>(upload(e))}></input>
            <br></br>
            <button onClick={register1} id="regbtn"> Register</button>
            </div>
            </form>
           
         </div>
    </div>
    );
 }
  
 export default TeacherReg;