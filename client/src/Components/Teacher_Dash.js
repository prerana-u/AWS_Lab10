import React from 'react';
import '../App.css';
import Verticalnav from  './VerticalNav';
import Preview from './preview_festcard';
import PreviewProj from './PreviewProject';
import PreviewUpcoming from './PreviewUpcoming';
import AddFest from './Addfest';
import AddProj from './AddProj';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import nodatafound from "./Images/nodatafound.png";
//import Preview from './component/preview_festcard';
import nodataicon from "./Images/Circle.json";
import lottie from "lottie-web";
import headimg from './Images/headimg.png';
import ach from "./Images/stats.png";
import ChartPopup from './ChartPopup';
//import Popup from 'reactjs-popup';
//import axios from 'axios';
//import {Carousel} from '@trendyol-js/react-carousel';

   

function TeachDash(props) {
  
      const [tname, setTName]=useState('');

      const fetchdata = () => {
      axios.get("http://localhost:3001/teachdata", {
    
      }).then((response) => {
         sessionStorage.teacherName=response.data[0].name;
     
         setTName(response.data[0].name);
     
    })
    };

    const [FestDets, setFestDets] = useState([]);
    const [UpFestDets, setUpFestDets] = useState([]);
    const [ProjDets, setProjDets] = useState([]);
    const [UpProjDets, setUpProjDets] = useState([]);
    const [NoCurMonth,setNoCurMonth] = useState(0);
    useEffect(() => { 
        axios.get("http://localhost:3001/preview_fest", {
       params:{tid:sessionStorage.getItem("tid")}
        }).then((response) => {
         if(response.data.length>0)
         {
            setFestDets(response.data);
           console.log(FestDets);
         }
        else{
           setFestDets(["No Data"]);
          // console.log(FestDets);
        }
         //console.log(response.data);
      });
    
    },[]);

    useEffect(() => { 
      axios.get("http://localhost:3001/upcoming_fest", {
         params:{tid:sessionStorage.getItem("tid")}
        }).then((response) => {
            if(response.data.length>0)
            {
               setUpFestDets(response.data);
            }
           else{
              setUpFestDets(["No Data"]);
           }
           
          // console.log(response.data);
      })
      axios.get("http://localhost:3001/get_no_of_fest_cur_month", {
        params:{tid:sessionStorage.getItem("tid")}
       }).then((response) => {
           if(response.data.length>0)
           {
              setNoCurMonth(response.data[0].fest_this_month);
           }
        
          
         // console.log(response.data);
     })
     
 
  },[]);

  
  useEffect(() => { 
   axios.get("http://localhost:3001/preview_proj", {
  params:{tid:sessionStorage.getItem("tid")}
   }).then((response) => {
    if(response.data.length>0)
    {
       setProjDets(response.data);
      
    }
   else{
      setProjDets(["No Data"]);
     console.log(FestDets);
   }
    //console.log(response.data);
 })

   },[]);

   useEffect(() => { 
      axios.get("http://localhost:3001/upcoming_proj", {
     params:{tid:sessionStorage.getItem("tid")}
      }).then((response) => {
       if(response.data.length>0)
       {
          setUpProjDets(response.data);
         
       }
      else{
         setUpProjDets(["No Data"]);
        // console.log(FestDets);
      }
       //console.log(response.data);
    })
   
      }, []);



   

 return (
    <div onLoad={fetchdata}>
    <Verticalnav role="teacher" cpage="dashboard"/>
      <div className="container">
         <div className="heading">
            <div className='headingcontent1'>
               <div className='headtext'>Welcome {tname}</div>
               <div className='headimg'><img src={headimg} alt="headimg"/></div>
            </div>
         </div>
         <div className="main_content">
            <div className='content_buttons'>
               <div className='card1'><AddFest /></div>
               <div className='card2'><AddProj/></div>
            </div>
         </div>
         <div className="card_td">
       
          <div className="text_data">
          <div className="edit" style={{marginLeft:'190%',marginTop:'-30px'}}>
                  <ChartPopup role="teacher"/>
          </div>
            <div className="project_img">
              <img src={ach} alt="skill" />
            </div>
            <div className="project_text" style={{marginBottom:'50px',marginLeft:'0px', fontSize:'38px'}}>Your Statistics</div>

          </div>
          <div className="vl" style={{marginLeft:'180px',marginTop:'13px'}}></div>
          
          <div className="stats" style={{marginTop:'50px',marginLeft:'160px',fontSize:'24px', color:'#196EDA', fontFamily:'Gugi,cursive'}}>
         
                    <div
                      style={{
                        float: "left",
                        alignItems: "center",
                        padding: "5px",
                        width: "fit-content",
                        
                      }}
                    >
                      <div className="stats-text" >
                        {" "}
                        <i className="fa fa-medal"></i> No. of Fests: 
                      </div>
                      <div className="stat-value">{FestDets.length+UpFestDets.length}</div>
                    </div>
                    <br />
                    <div
                      style={{
                        float: "left",
                        alignItems: "left",
                        padding: "5px",
                        width: "fit-content",
                      }}
                    >
                      <div className="stats-text">
                        {" "}
                        <i className="fa-solid fa-laptop-code"></i> No. of
                        Projects:
                      </div>
                      <div className="stat-value">{ProjDets.length+UpProjDets.length}  </div>
                    </div>
                    <br />
                    <div
                      style={{
                        float: "left",
                        alignItems: "left",
                        padding: "5px",
                        width: "fit-content",
                      }}
                    >
                      <div className="stats-text">
                        <i className="fa-solid fa-clock"></i> Upcoming Fests:{" "}
                      </div>{" "}
                      <div className="stat-value">{UpFestDets.length}</div>
                    </div>
                    <br />
                    <div
                      style={{
                        float: "left",
                        alignItems: "left",
                        padding: "5px",
                        width: "fit-content",
                      }}
                    >
                      <div className="stats-text">
                        {" "}
                        <i className="fa-solid fa-calendar-days"></i> Fests This
                        Month:{" "}
                      </div>
                      <div className="stat-value"> {NoCurMonth} </div>
                    </div>
                  </div>
        </div>
        <br/>
         <div className="view_previous_fest">
            <div className='fest-text'>View Previous Fests </div>
            <div className='fest-card'>
            <Swiper
               modules={[Keyboard, Navigation, Pagination]}
                spaceBetween={50}
                centeredSlides={false}
                slidesPerView={3}
                navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    keyboard={{
                        enabled: true,
                      }}
                      breakpoints={{
                        769: {
                          slidesPerView: 3,
                          slidesPerGroup: 2,
                        },
                      }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="swiper1"
            >
            {FestDets.map((val,key) => {
              // console.log(FestDets[0]);
              if(FestDets[0]!=="No Data")
              {
              
                 return (
               <SwiperSlide key={key}><Preview name={val.fname} org={val.org} start={val.start} end={val.end} fid={val.fid}/></SwiperSlide>
               );
              }
              else{
                 
                 return(
                  <div key={key}>
                  <div
                    id="react-logo3"
                    style={{ marginTop: "-350px", marginLeft: "100px" }}
                  >
                    <img
                      style={{ width: "400px", height: "350px" }}
                      src={nodatafound}
                      alt="no data"
                    ></img>
                  </div>
                </div>
                 )
              }
                })} 
            </Swiper> 
            </div>
         </div>
         <br></br>
         <div className="view_previous_fest">
            <div className='fest-text'>View Upcoming Fests </div>
            <div className='fest-card'>
            <Swiper
                 modules={[Keyboard, Navigation, Pagination]}
                 spaceBetween={50}
                 centeredSlides={false}
                 slidesPerView={3}
                 navigation={true}
                     pagination={{
                       clickable: true,
                     }}
                     keyboard={{
                         enabled: true,
                       }}
                       breakpoints={{
                         769: {
                           slidesPerView: 3,
                           slidesPerGroup: 2,
                         },
                       }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="swiper1"
            >
            {UpFestDets.map((val,key) => {
              
               if(UpFestDets[0]!=="No Data")
               {
                 
                  return (
                <SwiperSlide key={key}><Preview name={val.fname} org={val.org} start={val.start} end={val.end} fid={val.fid}/></SwiperSlide>
                );
               }
               else{
                  
                  return(
                     
                     <div key={key}>
                     <div
                       id="react-logo3"
                       style={{ marginTop: "-350px", marginLeft: "100px" }}
                     >
                       <img
                         style={{ width: "400px", height: "350px" }}
                         src={nodatafound}
                         alt="no data"
                       ></img>
                     </div>
                   </div>
                  )
               }
                })}
            </Swiper> 
            </div>
         </div>
         <div className="view_previous_fest">
            <div className='fest-text'>View Previous Projects </div>
            <div className='fest-card'>
            <Swiper
                  modules={[Keyboard, Navigation, Pagination]}
                  spaceBetween={50}
                  centeredSlides={false}
                  slidesPerView={3}
                  navigation={true}
                      pagination={{
                        clickable: true,
                      }}
                      keyboard={{
                          enabled: true,
                        }}
                        breakpoints={{
                          769: {
                            slidesPerView: 3,
                            slidesPerGroup: 2,
                          },
                        }}
                 onSlideChange={() => console.log('slide change')}
                 onSwiper={(swiper) => console.log(swiper)}
                className="swiper1"
            >
            {ProjDets.map((val,key) => {
            if(ProjDets[0]!=="No Data")
         {
         
            return (
          <SwiperSlide key={key}><PreviewProj pid={val.pid} name={val.pname} org={val.skill1} start={val.start} end={val.duration+" Month(s)"}/></SwiperSlide>
          );
         }
         else{
            
            return(
               <div key={key}>
               <div
                 id="react-logo3"
                 style={{ marginTop: "-350px", marginLeft: "100px" }}
               >
                 <img
                   style={{ width: "400px", height: "350px" }}
                   src={nodatafound}
                   alt="no data"
                 ></img>
               </div>
             </div>
            )
         }
           })} 
            </Swiper> 
            </div>
         </div>
         <div className="view_previous_fest">
            <div className='fest-text'>View Upcoming Projects </div>
            <div className='fest-card'>
            <Swiper
                modules={[Keyboard, Navigation, Pagination]}
                spaceBetween={50}
                centeredSlides={false}
                slidesPerView={3}
                navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    keyboard={{
                        enabled: true,
                      }}
                      breakpoints={{
                        769: {
                          slidesPerView: 3,
                          slidesPerGroup: 2,
                        },
                      }}
               onSlideChange={() => console.log('slide change')}
               onSwiper={(swiper) => console.log(swiper)}
                className="swiper1"
            >
            {UpProjDets.map((val,key) => {
            if(UpProjDets[0]!=="No Data")
            {
            
               return (
             <SwiperSlide key={key}><PreviewUpcoming pid={val.pid} name={val.pname} org={val.skill1} start={val.start} end={val.duration+" Month(s)"} /></SwiperSlide>
             );
            }
            else{
               
               return(
                  <div key={key}>
                  <div
                    id="react-logo3"
                    style={{ marginTop: "-350px", marginLeft: "100px" }}
                  >
                    <img
                      style={{ width: "400px", height: "350px" }}
                      src={nodatafound}
                      alt="no data"
                    ></img>
                  </div>
                </div>
               )
            }
              })} 
            </Swiper> 
            </div>
         </div>
      </div>
   </div>
   
 );
}

export default TeachDash;