import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions} from '@mui/material';

import Feedback from './Feedback';
import { createClient } from "@supabase/supabase-js";
import './CSS/multicard.css';

const StudentPro = (props) => {
  const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
  const { data, error } = supabase
  .storage
  .from('pictures')
  .getPublicUrl('public/'+props.name+'.png') 
  const reg = sessionStorage.regno;

    return(
    <Card sx={{ maxWidth: "390px", height: "340px", backgroundColor: "white",MozBoxShadow:"0 0 5px #ccc",WebkitBoxShadow:"0 0 3px #ccc",boxShadow:"0 0 3px #ccc", marginTop: "5%",marginLeft: "2%"}} id="#card">
   <CardActionArea>
        <CardMedia
          component="img"
          height="190"
          image={data.publicUrl}
          alt="fest image"
          sx={{maxWidth: "390px",marginTop:"-8%"}}
        />
       
        <CardContent style={{}}> 
          <Typography gutterBottom variant="h5" style={{textAlign:'center',color:'#196EDA',fontFamily:'Gugi,cursive'}}>
           {props.name}
          </Typography>
          <Typography gutterBottom variant="body2" style={{textAlign:'center',color:'#000',fontSize:'18px',fontFamily:'Gugi,cursive'}} >
           {props.org}
          </Typography>
          <Typography variant="body1" style={{textAlign:'center',color:'#000',fontSize:'14px',fontFamily:'Gugi,cursive'}}>
           ( {props.start} to {props.end} )
          </Typography>
        </CardContent>
        <CardActions id='cd1'>
          {props.fed===0? <Feedback fid={props.fid} regno={reg} etype="fest"/> :console.log("")}
      </CardActions>
    </CardActionArea>
  </Card>
    );
}
export default StudentPro;