const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const oneDay = 1000 * 60 * 60 * 24;
const sessions = require('express-session');
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    })
   );


const db = mysql.createConnection({
    user: "admin",
    host: "projectdata-2247250.cyemrepqmjpi.us-east-1.rds.amazonaws.com",
    password: "12345678",
    database: "projectdata",
    
 });

 app.post('/register', (req, res)=> {
    const name = req.body.name;
    const email = req.body.email;
    const dep=req.body.dep;
    const regno=req.body.regno;
    const password = req.body.password;
    const phone=req.body.phone;
    const class1=req.body.class1;
    const sem=req.body.semester;
   // console.log("ho");
    db.execute(
      "INSERT INTO student (name,regno,email, password,dep,phone,semester,class) VALUES (?,?,?,?,?,?,?,?)",
      [name,regno,email, password,dep,phone,sem,class1],
      (err, result)=> {
    //  console.log(err);
     // console.log(result);
      res.send(result);
      }
    );
 });
 
 app.post('/registerTeach', (req, res)=> {
  const name = req.body.name;
  const email = req.body.email;
  const dep=req.body.dep;
  const password = req.body.password;
  const phone=req.body.phone;
 // console.log("ho");
  db.execute(
    "INSERT INTO teacher (name,dep,email, password,phone) VALUES (?,?,?,?,?)",
    [name,dep, email, password,phone],
    (err, result)=> {
   // console.log(err);
    //console.log(result);
    res.send(result);
    }
  );
});
 
 app.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.password;
   
   db.execute(
       "SELECT * FROM student WHERE email = ? AND password = ?",
       [email, password],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
   
           if (result.length > 0) {

               sessions.email = email;
                
              // console.log(result);
               console.log(sessions.email)
         
               res.send( result);
               }
               else{
                res.send(result);
                console.log("Invalid Details!!");
               }
           }
       
   );
  });

  app.post('/loginTeach', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  //  console.log("Hi");
    db.execute(
        "SELECT * FROM teacher WHERE email = ? AND password = ?",
        [email, password],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) 
            {
                sessions.teach_email = email;
               // console.log(result);
                res.send( result);
            }

             else{
              res.send(result);
              console.log("Invalid Details!!");
             }
             
            }
        
    );
   });
   app.get('/festdata', (req, res)=> {
    db.execute(
      "Select fid,fname,fdesc from fest  where sdate >= CURDATE()",
      (err, result)=> {
     // console.log(err);
   //   console.log(result);
      res.send(result);
      }
    );
 });

 app.get('/projdata', (req, res)=> {
  db.execute(
    "Select pid,pname,skill1 from project",
    (err, result)=> {
    //console.log(err);
    //console.log(result);
    res.send(result);
    }
  );
});
app.get('/teachdata', (req, res)=> {
  db.execute(
    "Select tid,name,dep,email,phone from teacher where email=?",
    [sessions.teach_email],
    (err, result)=> {
    //console.log(err);
    //console.log(result);
    res.send(result);
    }
  );
});

app.get('/studata', (req, res)=> {
  console.log("Hi"+sessions.email);
  db.execute(
    "Select name,semester,class,dep,regno,email,phone,no_of_fest,no_of_project from student where email=?",
    [sessions.email],
    (err, result)=> {
    //console.log(err);
    //console.log(result);
    res.send(result);
    }
  );
});

app.post('/studataup', (req, res)=> {
  const name = req.body.name;
  const email = req.body.email;
  const dep=req.body.dep;
  const regno=req.body.regno;
  const phone=req.body.phone;
  const class1=req.body.class1;
  const sem=req.body.sem;
  console.log("Hi"+name,email,dep,regno,phone,class1,sem);
  db.execute(
    "UPDATE student SET name='"+name+"',semester="+sem+",class='"+class1+"',dep='"+dep+"',email='"+email+"',phone='"+phone+"' where regno="+regno,
    (err, result)=> {
    console.log(err);
    //console.log(result);
    res.send(result);
    }
  );
});

app.post('/teachdataup', (req, res)=> {
  const name = req.body.name;
  const email = req.body.email;
  const dep=req.body.dep;
  const tid=req.body.tid;
  const phone=req.body.phone;
 

db.execute(
  "UPDATE teacher SET name='"+name+"',dep='"+dep+"',email='"+email+"',phone='"+phone+"' where tid="+tid,
  (err, result)=> {
  console.log(err);
  //console.log(result);
  res.send(result);
  }
);
});

app.get('/getskills_search', (req, res)=> {
  const skill = req.query.skill;
  console.log(skill);
  db.execute(
    "select name,student.regno,class,semester,dep, skills.skill, skills.category from student inner join skills on student.regno=skills.regno where  skills.skill like '%"+skill+"%'",
    [skill],
    (err, result)=> {
   // console.log(err);
    console.log(result);
    res.send(result);
    }
  );
});

app.get('/getskills', (req, res) => {
  const skill = req.query.skill;
  const regno=req.query.regno;
  const category=req.query.category;
 // console.log(skill);

    db.execute(
          "select * from skills where regno="+regno+" and skill='"+skill+"' and category='"+category+"';",
        
          (err, result)=> {
          //console.log(err);
         // console.log("Hi"+result);
          res.send(result);
          }
        );
  });

  app.get('/getskill_studentdash', (req, res) => {
    const regno=req.query.regno;
    console.log(regno);
    db.execute(
      "select * from skills where regno="+regno,
          (err, result)=> {
          //console.log(err);
         console.log("Skills"+result);
          res.send(result[0]);
          }
        );
  });

  app.get('/get_reg_fest', (req, res) => {
    const regno=req.query.regno;
    db.execute(
          "SELECT distinct f.fid,f.fname,f.org,DATE_FORMAT(f.sdate,'%d-%m-%y') as start,DATE_FORMAT(f.edate,'%d-%m-%y') as end  from fest f, reg_fests r where f.fid=r.festid and r.regno="+regno+" and f.sdate<curdate()",
          
          (err, result)=> {
         // console.log(err);
        //  console.log(result);
          res.send(result);
          }
        );
  });

  app.post('/get_feedback',(req,res)=>{
    const fid=req.body.fid;
    const regno=req.body.reg;
    const feed=req.body.feedback;
    const rating=req.body.rating;
    console.log(fid, regno,feed);
    db.execute(
        "insert into fest_feedback values(?,?,?,?)",[regno,fid,feed,rating],
        (err, result)=> {
          // console.log(err);
         //  console.log(result);
           res.send(result);
        }
    );
  });

  app.get('/get_reg_fest_upcoming', (req, res) => {
    const regno=req.query.regno;
    db.execute(
          "SELECT distinct f.fid,f.fname,f.org,DATE_FORMAT(f.sdate,'%d-%m-%y') as start,DATE_FORMAT(f.edate,'%d-%m-%y') as end  from fest f, reg_fests r where f.fid=r.festid and r.regno="+regno+" and f.sdate>=curdate()",
          
          (err, result)=> {
         // console.log(err);
        //  console.log(result);
          res.send(result);
          }
        );
  });

  app.get('/get_reg_fest_current_month', (req, res) => {
    const regno=req.query.regno;
    db.execute(
          " select count(*) as curmonth from reg_fests where festid in (select fid from fest where month(sdate)=month(now())) and regno="+regno,
          
          (err, result)=> {
         // console.log(err);
         console.log(result);
          res.send(result);
          }
        );
  });

  app.get('/get_reg_project', (req, res) => {
    const regno=req.query.regno;
    db.execute(
          " SELECT distinct p.pid,p.pname,p.skill1,DATE_FORMAT(p.sdate,'%d-%m-%y') as start, date_format(DATE_ADD(p.sdate, INTERVAL +2 MONTH), '%d-%m-%y') as end from project p, reg_projects r where p.pid=r.pid and r.regno="+regno+" order by p.sdate",
          
          (err, result)=> {
         // console.log(err);
        //  console.log(result);
          res.send(result);
          }
        );
  });

//Insert into skill table
app.post('/setskills', (req, res)=> {
    const askill1 = req.body.skill;
 
    const regno=req.body.regno;
    const category=req.body.category;
 
    db.execute(
      
      "Insert into skills values(?,?,?)",
      [regno,askill1,category],
      (err, result)=> {
     //console.log(err);
      //console.log(result);
      res.send(result);
      }
    );
  });

  //Update skill table
  app.post('/updateskills', (req, res)=> {
    const askill1 = req.body.skill;
    const newskill=req.body.newskill;
    const regno=req.body.regno;
   
  
    db.execute(
      
      "update skills set skill=? where skill=? and regno=?",
      [newskill,askill1,regno],
      (err, result)=> {
     // console.log(err);
      //console.log(result);
      res.send(result);
      }
    );
  });



    app.get('/preview_fest', (req, res) => {

      const tid=req.query.tid;
      db.execute(
          "SELECT fid,fname,org,DATE_FORMAT(sdate,'%d-%m-%y') as start,DATE_FORMAT(edate,'%d-%m-%y') as end FROM fest where sdate <= CURDATE() and tid="+tid+" order by sdate",
          (err, result)=> {
              if (err) {
                  res.send({err: err});
              }
              if (result) {
                
                  res.send(result);
                  }else(res.send({message: "No data found"}));
              }
        )
      });

      app.get('/upcoming_fest', (req, res) => {

        const tid=req.query.tid;
      
        db.execute(
            "SELECT fid, fname,org,DATE_FORMAT(sdate,'%d-%m-%y') as start, DATE_FORMAT(edate,'%d-%m-%y') as end FROM fest where sdate >= CURDATE() and tid="+tid+" order by sdate",
            (err, result)=> {
                if (err) {
                    res.send({err: err});
                }
                if (result) {
                  // console.log(result);
                    res.send(result);
                    }else(res.send({fname: "No data found"}));
                }
           )
            });

            
    app.get('/preview_proj', (req, res) => {

      const tid=req.query.tid;
      db.execute(
          "SELECT pid, pname,duration,skill1,DATE_FORMAT(sdate,'%d-%m-%y') as start FROM project where sdate <= CURDATE() and tid="+tid,
          (err, result)=> {
              if (err) {
                 // console.log(err);
              }
              res.send(result)
              }
        )
      });

      //get details of students who have registered for a particular fest
      app.get('/get_reg_students', (req, res) => {

        const fid=req.query.fid;
        db.execute(
            "select r.regno,s.name, s.semester,s.class,r.event_name,s.no_of_fest from student s join reg_fests r on r.regno=s.regno and r.festid="+fid,
            (err, result)=> {
                if (err) {
                    //console.log(err);
                }
                if (result) {
                  
                    res.send(result);
                    }else(res.send({message: "No data found"}));
                }
          ) 
        });

        app.get('/get_reg_students_proj', (req, res) => {

          const pid=req.query.pid;
          db.execute(
              "select r.regno,s.name, s.semester,s.class,s.no_of_project from student s join reg_projects r on r.regno=s.regno and r.pid="+pid,
              (err, result)=> {
                  if (err) {
                      //console.log(err);
                  }
                  if (result) {
                    
                      res.send(result);
                      }else(res.send({message: "No data found"}));
                  }
            )
          });

      app.get('/upcoming_proj', (req, res) => {

        const tid=req.query.tid;
      
        db.execute(
            "SELECT pid, pname,duration,skill1,DATE_FORMAT(sdate,'%d-%m-%y') as start FROM project where sdate >= CURDATE() and tid="+tid,
            (err, result)=> {
                if (err) {
                    res.send({err: err});
                }
                if (result.length > 0) {
                  // console.log(result);
                    res.send(result);
                    }else(res.send({fname: "No data found"}));
                }
           )
            });

            app.get('/get_eventlist', (req, res) => {
              const fid = req.query.fid;
             // console.log(fid);
            
                db.execute(
                      "Select event1,event2,event3,event4,event5 from fest where fid="+fid,
                    
                      (err, result)=> {
                      //console.log(err);
                    //  console.log(result);
                      res.send(result);
                      }
                    );
              });

      app.post('/multicard', (req, res)=> {
          const name = req.body.name;
          const organization= req.body.organization;
          const mode = req.body.mode_1;
          const startdate = req.body.startdate_1;
          const enddate = req.body.enddate_1;
          const description = req.body.Description;
          const type = req.body.Type;
          const event1=req.body.event1;
          const event2=req.body.event2;
          const event3=req.body.event3;
          const event4=req.body.event4;
          const event5=req.body.event5;
          const tid=req.body.tid;
          console.log(event1, event2,event3,event4,event5 );
          db.execute(
            "INSERT INTO fest (fname,org,mode,sdate,edate,fdesc,type,event1,event2,event3,event4,event5,tid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [name,organization,mode,startdate,enddate,description,type,event1,event2,event3,event4,event5,tid],
            (err, result)=> {
              if (err) {
                  res.send({err: err});
                  console.log(err);
              }
      
              if (result.length > 0) {
                  res.send(result);
                  }else(res.send({message: "Wrong username/password combination!"}));
          }
          );
      });
      app.post('/multicard1', (req, res)=> {
          const name = req.body.Name;
          const required= req.body.Required;
          const duration = req.body.duration;
          const startdate = req.body.startdate_1;
          const tid=req.body.tid;
          db.execute(
            "INSERT INTO project (pname,duration,skill1,sdate,tid) VALUES (?,?,?,?,?)",
            [name,duration,required,startdate,tid],
            (err, result)=> {
              if (err) {
                  res.send({err: err});
              }
      
              if (result.length > 0) {
                  res.send(result);
                  }else(res.send({message: "Wrong username/password comination!"}));
          }
          );
      });

      app.post('/register_event', (req, res)=> {
       const fid=req.body.fid;
       const eventname=req.body.eventname;
       const regno= req.body.regno;
        db.execute(
          "INSERT INTO reg_fests values(?,?,?)",
          [fid, eventname, regno],
          (err, result)=> {
            if (err) {
                console.log(err);
            }
    
            if (result.length > 0) {
                res.send(result);
                }else(res.send({message: "Error!"}));
        }
        );
    });

    app.post('/reg_project', (req, res)=> {
      const pid=req.body.pid;
      const tid=req.body.tid;
      const regno= req.body.regno;
      console.log(pid, tid, regno);
       db.execute(
         "INSERT INTO reg_projects values(?,?,?)",
         [pid, tid, regno],
         (err, result)=> {
           if (err) {
               console.log(err);
           }
   
           if (result.length > 0) {
               res.send(result);
               }else(res.send({message: "Error!"}));
       }
       );
   });

    app.get('/student-logout', function (req, res, next) {
      sessions.email = undefined;
      res.send('success');
  });

  app.get('/getchart', (req, res)=> {
    const regno = req.query.regno;
    
    db.execute(
      "select count(*) as y, monthname(sdate) as x from fest where fid in(select distinct festid from reg_fests where regno="+regno+") group by month(sdate) order by sdate;",
    
      (err, result)=> {
   //  console.log(err);
      console.log(result);
      res.send(result);
      }
    );
  });

  app.get('/getchartproject', (req, res)=> {
    const regno = req.query.regno;
    
    db.execute(
      "select count(*) as y, monthname(sdate) as x from project where pid in(select distinct pid from reg_projects where regno="+regno+") group by month(sdate) order by sdate;",
    
      (err, result)=> {
   //  console.log(err);
      console.log(result);
      res.send(result);
      }
    );
  });

  app.get('/getchartteach', (req, res)=> {
    const tid = req.query.tid;
    
    db.execute(
      "select count(*) as y, monthname(sdate) as x from fest where tid="+tid+"  group by month(sdate) order by sdate;",
    
      (err, result)=> {
   //  console.log(err);
      console.log(result);
      res.send(result);
      }
    );
  });

  app.get('/getchartprojectteach', (req, res)=> {
    const tid = req.query.tid;
    
    db.execute(
      "select count(*) as y, monthname(sdate) as x from project where tid="+tid+"  group by month(sdate) order by sdate;",
    
      (err, result)=> {
   //  console.log(err);
      console.log(result);
      res.send(result);
      }
    );
  });

  app.get('/get_no_of_fest_cur_month', (req, res) => {
    const tid=req.query.tid;
    db.execute(
          "  select count(*) as fest_this_month from fest where tid="+tid+" and month(sdate)=month(now())",
          
          (err, result)=> {
         // console.log(err);
      //   console.log(result);
          res.send(result);
          }
        );
  });

  app.get('/get_list_feedback', (req, res) => {
  
    db.execute(
          "select distinct f.fname from fest f, fest_feedback r where f.fid=r.fid;",
          
          (err, result)=> {
         // console.log(err);
      //   console.log(result);
          res.send(result);
          }
        );
  });
  
  app.get('/get_feedback_result', (req, res) => {
    var fname=req.query.fname;
    db.execute(
          "select s.name,s.regno,r.feedback,r.rating from student s, fest_feedback r where s.regno=r.regno and fid=(select fid from fest where fname='"+fname+"');",
          
          (err, result)=> {
         // console.log(err);
      //   console.log(result);
          res.send(result);
          }
        );
  });

app.listen(3001, () => {
   console.log("running server");
});