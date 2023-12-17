import React from 'react';
import '../App.css';
import AWS from "aws-sdk";
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
function EditProfile() {
        const navigate=useNavigate();
        const [sname, setSname]=useState("");
        const [semail, setSemail]=useState("");
        const [sclass, setSclass]=useState("");
        const[ssem,setSsem]=useState("");
        const [sdep, setSdep]=useState("");
        const [sphn, setsphn]=useState("");
        const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
        //const [FestDets, setFestDets] = useState([]);
        const [sregno, setSregno]=useState("");
      
        //const [props1,setSkill]=useState([]);
   
       

        const update=(e) => {
            
           
            axios.post("http://localhost:3001/studataup", {
                 name:sname,
                 email:semail,
                 class1:sclass,
                 sem:ssem,
                 dep:sdep,
                 phone:sphn,
                 regno:sregno,
            }).then((response) => {
                console.log(response);
               emptyCache();
            });
            
                  
        }
        const fetchdata = () => {
            axios.get("http://localhost:3001/studata", {
                
            }).then((response) => {
      
            setSname(response.data[0].name);
            setSclass(response.data[0].class);
            setSsem(response.data[0].semester);
            setSdep(response.data[0].dep);
            setSregno(response.data[0].regno);
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

    const [file, setFile] = useState(null);


    // Function to upload file to s3
    const uploadFile = async (e) => {
      // S3 Bucket Name
      e.preventDefault();
      const S3_BUCKET = "2247250-bucket";
  
   
  
      // S3 Credentials
      AWS.config.update({
        accessKeyId: 'ASIAZ6PKBUEHD7CO22X4',
        secretAccessKey: 'ZcNSSvP6ibna1OExhFVDECv5c3EQmzqtirtYue/3',
        aws_session_token:'FwoGZXIvYXdzED4aDB0OabbEnojxXXihzyLSAUeuK7vW53XPXMwUWSH4morYdFZYvkdIZOYjdKn1z8akw/0KsMXIRlJcs6foQP6+gkZ7xgdKOyN2qeqhNn+oV5IGD+3AUk3GNX0xlaoxVnUD78ZqisTN2dWfVNXmqRTkhonXpIiKrWy4Vdno2ArbzuG4lSxLbWzxm+Oxj9A1zwE++G1UmcvGQHbMQ9HXb9lT4yvuUty/8DsixgoSbE1S1zvHtA19Cy16PGCmy3j+fmm6HfTAtIZgaCb1kM7zq8Ra4UwQG961G56MwQp8dxc9eO4BbijK4vurBjItyxdIWo2C4A7L85smMxQ9pSBn6z2vSbgQtEpX7R9MZG9YXxihSQ+p6rYwTTV7',
      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: "us-east-1",
      });
  
      // Files Parameters
  
      const params = {
        ACL: 'public-read',
        Bucket: S3_BUCKET,
        Key: sname+".png",
        Body: file,
      };
  
      // Uploading file to s3
  
      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          // File uploading progress
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();
  
      await upload.then((err, data) => {
        console.log(err);
        // Fille successfully uploaded
        console.log("File uploaded successfully.");
      });
    };
    // Function to handle file and store it to file state
    const handleFileChange = (e) => {
      // Uploaded file
      const file = e.target.files[0];
      // Changing file state
      setFile(file);
    };

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
    <Verticalnav role="student"/>
      <div className="Scontainer">
        <div className="Smain_content">
            <form onSubmit={update}>
                <fieldset>
                    <legend style={{color:'#196EDA',fontWeight:'bold'}}>Profile Details</legend>
                    <div className='img1'  style={{display:"flex", flexDirection:"column", alignItems:"center"}}><img src={data.publicUrl} alt="navimg"/></div>
                   
                    <div className="row">
                    <div className="col-25">
                    <label htmlFor="Reg" id="r">Register Number</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="rn" value={sregno} disabled 
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
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="Stu_class" id="r">Class</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="rn" name="lastname" defaultValue={sclass} placeholder="Your Class.." required onChange={(e) =>{
                    setSclass(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label htmlFor="Stu_Sem" id="r">Semester</label>
                    </div>
                    <div className="col-75">
                    <input type="Number" id="rn" name="sem" defaultValue={ssem} placeholder="Your Semester.." required onChange={(e) =>{
                    setSsem(e.target.value)}}/>
                    </div>
                </div>
                <br/>
                 <label>Change Profile Photo:  </label>
                 <input type="file" onChange={handleFileChange} />
                 <button onClick={(e)=>{uploadFile(e)}}>Upload</button>
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
export default EditProfile;