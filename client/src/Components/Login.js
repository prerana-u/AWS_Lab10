import React, {  useState } from "react";
import './CSS/register.css';
import StudentLogin from "./StudentLogin";
import TeacherLogin from "./TeacherLogin";
function Login() {

   const [isStudent, setIsStudent] = useState(true);
   function check()
   {
     setIsStudent(true);
     document.getElementById('stubtn1').className="active";
     document.getElementById('teachbtn1').className="inactive";
   }
   
   function check1()
   {
      setIsStudent(false);
      document.getElementById('stubtn1').className="inactive";
     document.getElementById('teachbtn1').className="active";
   } 

   return (
      <div>
        <button id="stubtn1" className="active" onClick={check}>Student</button>
        <button id="teachbtn1" className="inactive" onClick={check1}>Teacher</button>
        { isStudent ? <StudentLogin/> : <TeacherLogin/> }
      </div>
    );
 }
  
 export default Login;