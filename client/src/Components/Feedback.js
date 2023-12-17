import React,{ useState } from 'react';
import Popup from 'reactjs-popup';
import './CSS/popup.css';
import Axios from 'axios';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function Feedback(props) {
    const labels = {
        0.5: '.5 Stars',
        1: '1 Star',
        1.5: '1.5 Stars',
        2: '2 Stars',
        2.5: '2.5 Stars',
        3: '3 Stars',
        3.5: '3.5 Stars',
        4: '4 Stars',
        4.5: '4.5 Stars',
        5: '5',
      };
      
      function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }
      const [value, setValue] = React.useState(2);
      const [hover, setHover] = React.useState(-1);
    const [name, setname] = useState("");
    console.log(props.fid);
    const feedback=(e)=>{
       
       
      
        Axios.post("http://localhost:3001/get_feedback", {
            fid:props.fid,
            rating:value,
            reg:props.regno,
            feedback: name,
        }).then((response) => {
            console.log(response);
         });
    }
    
    // const StyledRating = styled(Rating)({
    //     '& .MuiRating-iconFilled': {
    //       color: '#ff6d75',
    //     },
    //     '& .MuiRating-iconHover': {
    //       color: '#ff3d47',
    //     },
    //   });
    return (
     
        <div>
            <Popup trigger=
                {<Button > Feedback</Button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <Grid columnspacing={3}>
                                <br />
                                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                                <Typography gutterbottom variant="h3" align="center">
                                    Feedback
                                </Typography>
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary" component="p" align="center" gutterBottom>
                                    Share your experience with your peers
                                    </Typography>
                                    <br/>
                                <form>
                                <Grid container spacing={1}>
                                <Grid xs={12} item>
                                    <TextField label="Type your response here" multiline minRows={5} placeholder="Type your answer here" variant="outlined" fullWidth  onChange={(e)=>{setname(e.target.value);}} required/>
                                </Grid>
                                <Grid xs={12} align="center" item>
                                <Typography component="legend">Did you love it?</Typography>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                                
                                </Grid>
                                <Grid xs={12} item>
                                <Button type="submit" variant="contained" color="primary" onClick={(e)=>{feedback(e)}} endIcon={<SendIcon />} fullWidth>submit</Button>
                                </Grid>
                                </Grid>
                                </form>
                                </CardContent>
                                </Card>
                            </Grid>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};