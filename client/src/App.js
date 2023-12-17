import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SkillForm from './Components/SkillForm';
import SearchBar from './Components/SearchBar';
import TeachDash from './Components/Teacher_Dash';
import StudentDash from './Components/Student_Dash';
import FestReg from './Components/FestReg';
import EditProfile from './Components/EditProfile';
import EditProfileTeach from './Components/EditProfileTeach';
import ViewFeedback from './Components/ViewFeedback';
import ViewFeedbackTeacher from './Components/ViewFeedbackTeacher';

function App() {
 
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
      
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
    
      </Route>
        <Route path="td" element={<TeachDash />} />
        <Route path="skillform" element={<SkillForm />} />
        <Route path="studentdash" element={<StudentDash />} />
        <Route path="search" element={<SearchBar />} />
        <Route path="viewfeedback" element={<ViewFeedback />} />
        <Route path="viewfeedbackteach" element={<ViewFeedbackTeacher />} />
        <Route path="festreg" element={<FestReg/>}/>
        <Route path="editprofile" element={<EditProfile/>}/>
        <Route path="editprofileteach" element={<EditProfileTeach/>}/>
       

    </Routes>
 
  </BrowserRouter>
  );
}

export default App;
