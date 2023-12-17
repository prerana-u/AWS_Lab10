import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import cardimg from './Images/fest1.png';
import { useNavigate } from "react-router-dom";
import { CardActionArea, CardActions } from '@mui/material';

import {Button} from '@mui/material';
import RegisterPopup from './RegisterPopup';
import { createClient } from "@supabase/supabase-js";
export default function MultiActionAreaCard(props) {

  const navigate=useNavigate();
  const supabase = createClient("https://npropcvowslhzxxaigvi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcm9wY3Zvd3NsaHp4eGFpZ3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTM5OTg3NywiZXhwIjoxOTk0OTc1ODc3fQ.iJ_vCpYUyRFEIP3ZgfYVZvXaQoAHLK7OtierGGpasOA");
  const { data, error } = supabase
  .storage
  .from('pictures')
  .getPublicUrl('public/'+props.fname+'.png') 
  return (
    <Card sx={{ maxWidth: 325 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image={data.publicUrl}
          alt="green iguana"
        />
       
        <CardContent > 
          <Typography gutterBottom variant="h5" component="div" >
           {props.fname}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {props.fdesc}
          </Typography>
        </CardContent>
       
      </CardActionArea>
      <CardActions >
      {sessionStorage.email === undefined || localStorage.email === undefined? <Button onClick={()=>{navigate("/login")}} >Login</Button>:  <RegisterPopup fid={props.fid}/> }
      </CardActions>
    </Card>
  );
}