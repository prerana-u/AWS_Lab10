import '../App.css';
import wave from './Images/Vector.png';
import Axios from 'axios';
import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import target from "./Images/target.png";
import contact from "./Images/contact.png";
import loc from "./Images/location.png";
import { useState } from 'react';
import MultiActionAreaCard from './MultiActionAreaCard';
function Homepage() {
  const [NoOfSlides,setNoOfSlides] = useState(3);
  const [FestDets, setFestDets] = useState([]);
  const [ProjDets, setProjDets] = useState([]);
  const dp="https://2247250-bucket.s3.amazonaws.com/cuate.png";
  const fetchdata = () => {
  Axios.get("http://localhost:3001/festdata", {

  }).then((response) => {
    
     setFestDets(response.data);
     if(FestDets.length===2)
     {
      setNoOfSlides(2);
     }
     else if(FestDets.length===1)
     {
      setNoOfSlides(1);
     }
     else if(FestDets.length===0)
     {
        setNoOfSlides(0);
     }
     else
     setNoOfSlides(3);
  })
  Axios.get("http://localhost:3001/projdata", {
  
}).then((response) => {
   
   setProjDets(response.data);
   
})
  };



 
  return (
    <div id="a"  onLoad={fetchdata}>

      <img src={dp} alt="food bowl" id="bowl"/>
  
    <div id="d1">
        <h1>SKILLFORD</h1>
        <h2>Talent Recognition Platform </h2>
  
    </div>
    <img src={wave} id="wave" alt="wave"/>
    <h3 id="uftext">Upcoming Fests</h3>
    <div id="uf">
    <Swiper
               modules={[Keyboard, Navigation, Pagination]}
                spaceBetween={50}
                centeredSlides={false}
                slidesPerView={NoOfSlides}
                navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    keyboard={{
                        enabled: true,
                      }}
                      breakpoints={{
                        769: {
                          slidesPerView: {NoOfSlides},
                          slidesPerGroup: 2,
                        },
                      }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="swiper1"
            >
            {FestDets.map((val,key) => {
            return (
                <SwiperSlide key={key}><MultiActionAreaCard fid={val.fid} fname={val.fname} fdesc={val.fdesc} /></SwiperSlide>
                );
                })} 
            </Swiper> 
    </div>
    <div id="about" >
        <h1 style={{color: 'white',fontFamily:'Gugi,cursive',marginBottom:'30px'}}>About Us</h1>
        <p id="abouttext">
        SkillFord is a talent recognition platform that provides universities a one stop solution towards student skill management and event registrations. Students can share skill details based on their capabilities and interests, and teachers can then utilize these skills for different projects or college fests based on requirements. 
        </p>
        <div class="cards">
            <div class="card_ab" style={{float: "left;"}}>
                <img src={target} alt="Avatar" style={{width: "fit-content",height: "240px"}}/>
                <div class="container1">
                    <h4><b>Our Goals</b></h4>
                   <ol >
                    <li>Easier Fest Management</li>
                    <li>Greater Skill Recognition</li>
                    <li>Better Organization</li>
                   </ol>
                </div>
            </div>
            <div class="card_ab1" style={{float: "right;"}}>
                <img src={contact} alt="Avatar" style={{width: "fit-content",height: "240px"}}/>
                <div class="container1">
                <h4><b>Contact Us</b></h4>
                <ol >
                    <li>Email: abcd@gmail.com</li>
                    <li>Phone: +91 1201290201</li>
                    <li>Instagram: @skillFord</li>
                   </ol>
                </div>
            </div>
            <div class="card_ab1" style={{float: "right;"}}>
                <img src={loc} alt="Avatar" style={{width: "fit-content",height: "240px"}}/>
                <div class="container1">
                <h4><b>Built For</b></h4>
                <ol>
                    <li>Universities</li>
                    <li>Colleges</li>
                    <li>Postgraduate Students</li>
                   </ol>
                </div>
            </div>
            
        </div>
    </div>
  
    </div>
  );
}

export default Homepage;
