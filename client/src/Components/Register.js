import React, {  useState } from "react";
import './CSS/register.css';
import StudentReg from "./StudentReg";
import TeacherReg from "./TeacherReg";
function Register() {
   const [isStudent, setIsStudent] = useState(true);
   function check()
   {
     setIsStudent(true);
     document.getElementById('stubtn').className="active";
     document.getElementById('teachbtn').className="inactive";
   }
   function check1()
   {
      setIsStudent(false);
     document.getElementById('stubtn').className="inactive";
     document.getElementById('teachbtn').className="active";
   }
   return (
      <div>
        <button id="stubtn" className="active" onClick={check}>Student</button>
        <button id="teachbtn" className="inactive" onClick={check1}>Teacher</button>
        { isStudent ? <StudentReg/> : <TeacherReg/> }
      </div>
    );
 }
  
 export default Register;