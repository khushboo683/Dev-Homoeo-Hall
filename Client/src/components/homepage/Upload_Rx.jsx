import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/Counter.css'

import {useParams} from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import img from '../images/a1.jpg'
import img2 from '../images/a2.jpg'
import Dialog from '@material-ui/core/Dialog';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
// Components
import Slider from './Slider';

import './Slider/slider.css';
import '../stylesheet/Uploadrx.css';
import { blue } from '@material-ui/core/colors';
const Input = styled('input')({
  display: 'none',
});

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    },
  },
  typography: {
    h5: {
      fontWeight: 600 // or 'bold'
    }
  }
});
function Upload_Rx({Id}) {
  const fileInput = useRef(null)
  const [valuess, setValues] = React.useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [presimage,setpresimage]=useState("https://media.istockphoto.com/vectors/medical-prescription-vector-illustration-rx-concepts-modern-flat-vector-id1136667779?k=20&m=1136667779&s=612x612&w=0&h=fUimtkr9BCbqkymYD6tXiQxh9RCspWLKwChy5JX3gvw=");
const [previewSource, setPreviewSource] = useState('');
const [selectedFile, setSelectedFile] = useState();
const [successMsg, setSuccessMsg] = useState('');
const [errMsg, setErrMsg] = useState('');
const [name,setname]= useState("Choose an image")
const [message,setmessage] =useState(false);
const [message2,setmessage2] =useState(false);
const [namerx,setnamerx] =useState("");
const [desp, setdesp] = React.useState();
const uploadrx = () =>{
  if(name!=="Choose an image"){
    setmessage2(false);
    setmessage(true);
    setname("Choose an image");}
    else{
      setmessage(false);
    setmessage2(true);
    }
    setValues('');
};
const handleChanges = (event) => {
 
  setValues(event.target.value);
};
const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setname(e.target.files[0].name);
    setnamerx(e.target.files[0].name);
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
};

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

const handleSubmitFile = (e) => {

    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
   
  
    reader.readAsDataURL(selectedFile);
   // console.log(reader.result)
    // let dataArray = new FormData();
    
   
    // dataArray.append("description", desp);
    // dataArray.append("Id",Id);
    
    
    
    reader.onloadend = () => {
      //dataArray.append("",reader.result);
      const dataArray = {
        description:desp,
        Id:Id,
        base64EncodedImage:reader.result
      };
      uploadImage(dataArray);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        setErrMsg('something went wrong!');
    };
};

const uploadImage = async (dataArray) => {
  //console.log(Array.from(dataArray[0]))
  //console.log(dataArray.base64EncodedImage)
    try {
      setFileInputState('');
      setPreviewSource('');
      setdesp('');
      setnamerx('');
        await fetch(`https://devhomoeoback.herokuapp.com/user/${Id}`, {
            method: 'POST',
            body: JSON.stringify({
              base64EncodedImage:dataArray.base64EncodedImage,
              Id:dataArray.Id,
              description:dataArray.description
          }),
            headers:{'Content-Type': 'application/json'}
        });
  // await axios
  //       .post(`https://devhomoeoback.herokuapp.com/user/${Id}`, dataArray, {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       })
  //       .then((response) => {
       
        setSuccessMsg('Image uploaded successfully');
      //})
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary">
        <Toolbar>
        <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <DescriptionIcon />
      </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Upload RX           </Typography>
         
          <Link to={"/home"} className="link"> <HomeIcon fontSize="large" /> </Link>
          <Link to="/logout" className="link"> <Button variant="outlined" color="inherit">Logout</Button></Link>
        </Toolbar>
      </AppBar>
      {message===true?
        <Alert variant="filled" severity="success" id="acenter">
        <AlertTitle>Prescription successfully sent !!</AlertTitle>
        
      </Alert>
                  :null}    
                  {message2===true?
                    <Alert variant="filled" severity="error" id="acenter">
                    <AlertTitle>Please choose an image to upload...</AlertTitle>
                    
                  </Alert>
                              :null}  
      <div id="prespic">
      <Card elevation={6} sx={{ maxWidth: 400,mt:1,mb:2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
            Rx
          </Avatar>
        }
        
        title="Prescription"
        subheader="Preview"
      />
      <CardMedia
        component="img"
        
        image={previewSource?previewSource:presimage}
        alt="Paella dish"
        id="pres"
      />
      <CardContent>
      <form onSubmit={handleSubmitFile} className="form">
      
      <label htmlFor="fileInput" id="rx">
      <InsertPhotoIcon /> {name}
        </label>
      <input
      id="fileInput"
      type="file"
      name="image"
      encType="multipart/form-data"
      onChange={handleFileInputChange}
      value={fileInputState}
      className="form-input"
      accept="image/*"
  />
  
  <br />
  <br />
  <br />
 
  <TextField
  id="filled-multiline-static"
    label="Describe"
    placeholder="Describe anything here.."
    multiline
    rows={4}
    variant="filled"
    value={desp}
    onChange={(e) => setdesp(e.target.value)}
  />
  
 <br />
    <Button variant="contained" color="secondary" type="submit" id="send" onClick={uploadrx} endIcon={<SendIcon />}>
    Send 
</Button>
        </form>
      </CardContent>
      
    </Card>
    </div>
      </Box>
      </ThemeProvider>
    );
  }

export default Upload_Rx