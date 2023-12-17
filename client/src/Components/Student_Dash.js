import React from "react";
import "../App.css";
import "./CSS/studentdash.css";
import Verticalnav from "./VerticalNav";
import Preview from "./StudentPro";
import Button from "@mui/material/Button";
//import AddFest from './Addfest';
//import AddProj from './AddProj';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import headimg from "./Images/headimg_stu.png";
import skill from "./Images/skill.png";
import ach from "./Images/stats.png";
import festspart from "./Images/festspart.png";
import projectpart from "./Images/projectpart.png";
import nodataicon from "./Images/Circle.json";
import lottie from "lottie-web";
import nodatafound from "./Images/nodatafound.png";
import StudentChart from "./StudentChart";
import ChartPopup from "./ChartPopup";
function Student_Dash() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [sname, setSname] = useState("");
  const [sclass, setSclass] = useState("");
  const [ssem, setSsem] = useState("");
  const [sdep, setSdep] = useState("");
  const [FestDets, setFestDets] = useState([]);
  const [UpFestDets, setUpFestDets] = useState([]);
  const [ProjDets, setProjDets] = useState([]);
  const [sregno, setSregno] = useState("");
  const [NoOfFest, setNoOfFest] = useState(0);
  const [NoCurMonth, setNoCurMonth] = useState(0);
  const [NoOfProject, setNoOfProject] = useState(0);
  const [adv_skills, setAdv_skills] = useState([]);
  const [int_skills, setInt_skills] = useState([]);
  const [new_skills, setNew_skills] = useState([]);
  const [NoOfSlides, setNoOfSlides] = useState(3);
  const url1="https://2247250-bucket.s3.amazonaws.com/skill.png";
  const url2="https://2247250-bucket.s3.amazonaws.com/stats.png";
  //const [props1,setSkill]=useState([]);
  var arr = [];
  var arr1 = [];
  var arr2 = [];
  var i = 0;

  const handleClose = () => {
    setStatus(false);
    localStorage.removeItem("Selected");
  };
  const handleAccept = () => {
    axios
      .post("http://localhost:3001/reg_project", {
        pid: localStorage.getItem("Pid"),
        tid: localStorage.getItem("Tid"),
        regno: localStorage.getItem("Selected"),
      })
      .then((response) => {
        console.log(response);
      });
    handleClose();
    window.location.reload(false);
  };

  const fetchdata = () => {
    arr = [];
    arr1 = [];
    arr2 = [];

    axios.get("http://localhost:3001/studata", {}).then((response) => {
      sessionStorage.studentName = response.data[0].name;
      setSname(response.data[0].name);
      setSclass(response.data[0].class);
      setSsem(response.data[0].semester);
      setSdep(response.data[0].dep);
      setSregno(response.data[0].regno);
      setNoOfFest(response.data[0].no_of_fest);
      setNoOfProject(response.data[0].no_of_project);
      console.log(
        localStorage.getItem("Selected") + " " + response.data[0].regno
      );
      if (localStorage.getItem("Selected") == response.data[0].regno) {
        setStatus(true);
        console.log(status);
      }
    });

    axios
      .get("http://localhost:3001/getskill_studentdash", {
        params: { regno: sessionStorage.getItem("regno") },
      })
      .then((response) => {
        while (response.data.length > 0) {
         // console.log(response.data);

          if (response.data[i].category === "Advanced") {
            arr.push(response.data[i].skill);
            console.log(i + " " + arr);
          } else if (response.data[i].category === "Intermediate") {
            arr1.push(response.data[i].skill);
            console.log(i + " " + arr1);
          } else {
            arr2.push(response.data[i].skill);
            console.log(i + " " + arr2);
          }

          i++;
          if (i >= response.data.length) break;
          //  response.data.length--;
        }
        setAdv_skills(arr);
        setInt_skills(arr1);
        setNew_skills(arr2);
        // console.log(arr);
        console.log(arr);
        // console.log(new_skills);
      });

    // console.log(arr2);
    axios
      .get("http://localhost:3001/get_reg_fest", {
        params: { regno: sessionStorage.getItem("regno") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setFestDets(response.data);
          // console.log(FestDets);
        } else {
          setFestDets(["No Data"]);
          // console.log(FestDets);
        }
      });
    axios
      .get("http://localhost:3001/get_reg_fest_upcoming", {
        params: { regno: sessionStorage.getItem("regno") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setUpFestDets(response.data);
          console.log(UpFestDets);
        } else {
          setUpFestDets(["No Data"]);
          console.log(UpFestDets);
          // console.log(FestDets);
        }
      });
    axios
      .get("http://localhost:3001/get_reg_fest_current_month", {
        params: { regno: sessionStorage.getItem("regno") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          //console.log(response.data[0].curmonth);
          setNoCurMonth(response.data[0].curmonth);
          // console.log(FestDets);
        }
      });

    axios
      .get("http://localhost:3001/get_reg_project", {
        params: { regno: sessionStorage.getItem("regno") },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setProjDets(response.data);
          // console.log(FestDets);
        } else {
          setProjDets(["No Data"]);
          // console.log(FestDets);
        }
      });
  };

  useEffect(() => {
    fetchdata();
    lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: nodataicon,
      loop: false,
    });
    lottie.loadAnimation({
      container: document.querySelector("#react-logo1"),
      animationData: nodataicon,
      loop: false,
    });
  }, []);

  return (
    <div>
      <Verticalnav role="student" />
      <div className="container">
        <Dialog
          open={status}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Project Enquiry"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have been invited to join the {localStorage.getItem("Pname")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Decline</Button>
            <Button onClick={handleAccept} autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
        <div className="heading_sd">
          <div className="headingcontent1">
            <div className="headtext">
              Welcome {sname}
              <p className="studets">
                {ssem}
                {sclass}, Department of {sdep}
              </p>
              <p className="studets">{sregno}</p>
            </div>

            <div className="headimg">
              <img src={headimg} alt="headimg" />
            </div>
          </div>
        </div>
        <div className="main_content1">
          <div className="content_buttons">
            <div className="card_sd">
              <div
                className="content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="edit"
                  onClick={() => {
                    navigate("/skillform");
                  }}
                >
                  <i
                    className="fa-regular fa-pen-to-square fa-2xl"
                    style={{ color: "#196EDA", marginTop: "30px" }}
                  ></i>
                </div>
                <div className="img">
                  <img src={url1} alt="skill" />
                </div>
                <div className="content-text">
                  <label className="l1">
                    {" "}
                    Your Skill Set
                    <hr
                      style={{
                        width: "100%",
                        marginTop: "2%",
                        height: "3px",
                        backgroundColor: "black",
                      }}
                    />
                  </label>
                </div>
                <div className="content-text">
                  <div className="skill">
                    <div
                      style={{
                        padding: "10px",
                        height: "fit-content",
                        overflow: "hidden",
                        width: "fit-content",
                      }}
                    >
                      <div
                        style={{
                          float: "left",
                          alignItems: "center",
                          padding: "5px",
                          width: "150px",
                        }}
                      >
                        Developed Skills:{" "}
                      </div>
                      <div
                        style={{ width: "fit-content", marginLeft: "150px" }}
                      >
                        <ul type="disc">
                          {adv_skills.map((val, key) => {
                            return <li key={key}>{val}</li>;
                          })}
                        </ul>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        height: "fit-content",
                        overflow: "hidden",
                        width: "400px",
                      }}
                    >
                      <div
                        style={{
                          float: "left",
                          alignItems: "center",
                          padding: "5px",
                          width: "150px",
                        }}
                      >
                        Intermediate Skills:{" "}
                      </div>
                      <div style={{}}>
                        <ul type="disc">
                          {int_skills.map((val, key) => {
                            return <li key={key}>{val}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        height: "fit-content",
                        overflow: "hidden",
                        width: "400px",
                      }}
                    >
                      <div
                        style={{
                          float: "left",
                          alignItems: "center",
                          padding: "5px",
                          width: "150px",
                        }}
                      >
                        Interested Skills:{" "}
                      </div>
                      <div style={{}}>
                        <ul type="disc">
                          {new_skills.map((val, key) => {
                            return <li key={key}>{val}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card_sd2">
              <div
                className="content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="edit">
                  <ChartPopup role="student"/>
                </div>
                <img src={url2} alt="skill" />
                <div className="content-text">
                  <label
                    className="l1"
                    style={{ textAlign: "center", marginLeft: "40px" }}
                  >
                    Your Statistics
                    <hr
                      style={{
                        width: "102%",
                        marginTop: "2%",
                        height: "3px",
                        backgroundColor: "black",
                        marginBottom: "20px",
                      }}
                    />
                  </label>
                  <div className="stats">
                    <div
                      style={{
                        float: "left",
                        alignItems: "center",
                        padding: "5px",
                        width: "fit-content",
                      }}
                    >
                      <div className="stats-text">
                        {" "}
                        <i className="fa fa-medal"></i> No. of Fests:{" "}
                      </div>
                      <div className="stat-value"> {NoOfFest}</div>
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
                      <div className="stat-value"> {NoOfProject} </div>
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
                      <div className="stat-value"> {NoCurMonth}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project_worked">
          <div className="text_data">
            <div className="project_img">
              <img src={festspart} alt="skill" />
            </div>
            <div className="project_text">Fests Participated In</div>
          </div>
          <div className="vl"></div>
          <div className="fest-card">
            <Swiper
              modules={[Keyboard, Navigation, Pagination]}
              spaceBetween={50}
              centeredSlides={false}
              slidesPerView={2}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="swiper1"
            >
              {FestDets.map((val, key) => {
                if (FestDets[0] !== "No Data") {
                  return (
                    <SwiperSlide key={key}>
                      <Preview
                        fid={val.fid}
                        name={val.fname}
                        org={val.org}
                        start={val.start}
                        end={val.end}
                        fed={0}
                      />
                    </SwiperSlide>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </Swiper>
          </div>
        </div>
        <div className="project_worked">
          <div className="text_data">
            <div className="project_img">
              <img src={festspart} alt="skill" />
            </div>
            <div className="project_text">Upcoming Fests </div>
          </div>
          <div className="vl"></div>
          <div className="fest-card">
            <Swiper
              modules={[Keyboard, Navigation, Pagination]}
              spaceBetween={50}
              centeredSlides={false}
              slidesPerView={2}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="swiper1"
            >
              {UpFestDets.map((val, key) => {
                if (UpFestDets[0] !== "No Data") {
                  return (
                    <SwiperSlide key={key}>
                      <Preview
                        name={val.fname}
                        org={val.org}
                        start={val.start}
                        end={val.end}
                        fed={1}
                      />
                    </SwiperSlide>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </Swiper>
          </div>
        </div>

        <div className="project_worked">
          <div className="text_data">
            <div className="project_img">
              <img src={projectpart} alt="skill" />
            </div>
            <div className="project_text">Projects Worked on</div>
          </div>
          <div className="vl"></div>
          <div className="fest-card">
            <Swiper
              modules={[Keyboard, Navigation, Pagination]}
              spaceBetween={50}
              centeredSlides={false}
              slidesPerView={2}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="swiper1"
            >
              {ProjDets.map((val, key) => {
                if (ProjDets[0] !== "No Data") {
                  return (
                    <SwiperSlide key={key}>
                      <Preview
                        name={val.pname}
                        org={val.skill1}
                        start={val.start}
                        end={val.end}
                      />
                    </SwiperSlide>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student_Dash;
