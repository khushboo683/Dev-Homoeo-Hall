import React, { useContext,useState, useEffect } from "react";

import {useParams} from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import './login.css';
import { useHistory,Link } from 'react-router-dom';
import {Typography,Button,spacing,Box,makeStyles,TextField, SvgIcon} from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MicIcon from '@mui/icons-material/Mic';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const useStyle = makeStyles({
  btn: {
    fontSize:12,
    backgroundColor:'green',
    marginLeft:5
  },
  text: {
    marginLeft:5
  },
  heading: {
    marginTop:10,
    color:'#8b1eba',
    textDecoration: 'underline',
    marginBottom:13
  }
})
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'
export function LoginForm({setIsAuthenticated,message,setMessage,Id,setIsAdmin}) {
  const { switchToSignup } = useContext(AccountContext);
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
 
  const [erroruser,seterroruser]=useState(false);
  const [errorpass,seterrorpass]=useState(false);
  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickuser = ()=>{
    setValues({
      ...values,
      username:'',
    });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const classes=useStyle();
    const [user,newuser]= useState("");
   
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const[message1,setMessage1]=useState('');
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [pmp,setpmp]= useState("");
    const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
    const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setIsListening(prevState => !prevState)
    setNote('');
    setOpen(false);
    
  };
  const showdone = () => {
   
  if(pmp==="3"){
    setValues({
      ...values,
      username:note,
    });
  }
  if(pmp==="4"){
    setValues({
      ...values,
      password:note,
    });
  }
  
    setIsListening(prevState => !prevState)
    setNote('');
    setOpen(false);
    
  };
  const handleClickOpen = (pmps) => {
    setNote('');
    setpmp(pmps);
   
    setOpen(true);
  
  };
  
    const [pass,newpass]= useState("");
    let history=useHistory();
    
    const handleclick=async()=>{
      
      seterrorpass(false);
      seterroruser(false);
      if(values.username==''){
        seterroruser(true);
      }
      if(values.password==''){
        seterrorpass(true);
      }
      try{
        const body={username:values.username,password:values.password};
        console.log(body);
        
        const response= await fetch("https://devhomoeoback.herokuapp.com/login", {
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseRes=await response.json();
        
        if(parseRes.message==='login'||parseRes.message==='admin'){
       
          if(parseRes.message==='admin')
          setIsAdmin(true);
          console.log(values.username);
        setIsAuthenticated(true);
        window.location.reload(false);
       }
        else{
        setMessage1(parseRes.message);
        setIsAuthenticated(false);
        console.log(message);
        }
        localStorage.setItem("token",parseRes.token);
    }catch(err){
      //console.log("22");
        console.log(err.message);
    }
    }
   
  return (
   
    
    <BoxContainer>
    {message1!==''?
    <Typography variant="body1" color="error">{message1}</Typography>
                :null}     
                {message!==''?{message}:null}  
                {console.log(message)}
    <Box sx={{ mb:3 }}>
  
    <FormControl sx={{ ml: 1, width: '29ch',mt:0 }} variant="standard" >
       
    <InputLabel htmlFor="standard-adornment-password" color='secondary' error={erroruser}>Mobile Number </InputLabel>
    <Input
      id="standard-adornment-password"
      label="Mobile Number"
      type={values.showPassword ? 'text' : 'username'}
      value={values.username}
      onChange={handleChange('username')}
      
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="Example"
            onClick={handleClickuser}
          >
          <HighlightOffIcon />
          </IconButton>
          <IconButton
          aria-label="toggle password visibility"
        >
        <a onClick={() => handleClickOpen("3")} style={{cursor:'pointer'}}>
        <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
        </a>
        </IconButton>
        </InputAdornment>
      }
      error={erroruser}
      required
    />
  </FormControl>
  
    <FormControl sx={{ ml: 1, width: '29ch',mt:1 }} variant="standard" >
   
    <InputLabel htmlFor="standard-adornment-password" color='secondary' error={errorpass}>Password </InputLabel>
    <Input
      id="standard-adornment-password"
      label="Password"
      type={values.showPassword ? 'text' : 'password'}
      value={values.password}
      onChange={handleChange('password')}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <IconButton
            aria-label="toggle password visibility"
          >
          <a onClick={() => handleClickOpen("4")} style={{cursor:'pointer'}}>
          <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
          </a>
          </IconButton>
        </InputAdornment>
      }
      error={errorpass}
      required
    />
  </FormControl>
  <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Listening... "}
                        </DialogTitle>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                         {note}
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                          
                            <Button onClick={showdone}  autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
  </Box>
 
      <Marginer direction="vertical" margin={10} />
    
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit"  onClick={handleclick} startIcon={<SendIcon />}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink className="linkme">
        Don't have an account?{" "}
        </MutedLink>
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      
    </BoxContainer>
  );
}
