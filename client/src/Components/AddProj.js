import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import Popup1 from './popup1';
import './CSS/multicard.css';
import cardimg from './Images/project.jpg';


const AddProj = () => {
    return(
    <Card sx={{ maxWidth: "480px", height: "300px", backgroundImage:`url(${cardimg})`, maskRepeat: 'no-repeat' , backgroundSize: 'cover', marginTop: "2%",marginLeft: "7%",borderRadius:"6%",filter:"black",opacity:"90%"}} id="#card">
    <CardActionArea sx={{}}>
      <CardContent>
        <Popup1 />
      </CardContent>
    </CardActionArea>
  </Card>
    );
}
export default AddProj;