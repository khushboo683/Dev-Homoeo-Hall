import React, { useContext,useState,useEffect,Redirect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import AppBar from '@mui/material/AppBar';
import MicIcon from '@mui/icons-material/Mic';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './login.css';
import { useHistory,Link } from 'react-router-dom';
import {Typography,spacing,makeStyles,TextField, SvgIcon} from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
export function SignupForm({setauthenticated,message,setMessage}) {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
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
  const { switchToSignin } = useContext(AccountContext);
  const [values, setValues] = useState({
    name:'',
    mobile: '',
    password: '',
    confirmpass: '',
    
    pincode:'',
    address:'',
   
    showPassword: false,
    showcPassword: false
  });
  
  const [errorpincode,seterrorpincode]=useState(false);
  const [erroraddress,seterroraddress]=useState(false);
  

  const [erroruser,seterroruser]=useState(false);
  const [errorpass,seterrorpass]=useState(false);
  const [errorname,seterrorname]=useState(false);
  const [errorcpass,seterrorcpass]=useState(false);
  const [open, setOpen] = React.useState(false);
  const [pmp,setpmp]= useState("");
  const handleClose = () => {
    setIsListening(prevState => !prevState)
    setNote('');
    setOpen(false);
    
  };
  const showdone = () => {
    if(pmp==="1"){
    setValues({
      ...values,
      name:note,
    });
  }
  if(pmp==="2"){
    setValues({
      ...values,
      mobile:note,
    });
  }
  
  if(pmp==="4"){
    setValues({
      ...values,
      pincode:note,
    });
  }
  if(pmp==="5"){
    setValues({
      ...values,
      address:note,
    });
  }
  
  if(pmp==="7"){
    setValues({
      ...values,
      password:note,
    });
  }
  if(pmp==="8"){
    setValues({
      ...values,
      confirmpass:note,
    });
  }
    setIsListening(prevState => !prevState)
    setNote('');
    setOpen(false);
    
  };
  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickmobile = ()=>{
    setValues({
      ...values,
      mobile:'',
    });
  };
  const handleClickname = ()=>{
    setValues({
      ...values,
      name:'',
    });
  };
  const handleClickpin = ()=>{
    setValues({
      ...values,
      pincode:'',
    });
  };
 
  const handleClickaddress = ()=>{
    setValues({
      ...values,
      address:'',
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
    
    const [change,setChange]=useState(false)
    const [check,setCheck]=useState(false);
    //const[message,setMessage]=useState('');
    let history=useHistory();
    const handleclick=async()=>{
      seterrorpass(false);
      seterroruser(false);
      seterrorname(false);
      seterrorcpass(false);
     
      seterroraddress(false);
      seterrorpincode(false);
     
      if(values.name=='')
      {
        seterrorname(true);
      }
      if(values.mobile==''){
        seterroruser(true);
      }
      if(values.password==''){
        seterrorpass(true);
      }
      if(values.confirmpass==''){
        seterrorcpass(true);
      }
     
      if(values.pincode==''){
        seterrorpincode(true);
      }
      if(values.address==''){
        seterroraddress(true);
      }
     
      try{
        if(!(values.name==''||values.mobile==''||values.password==''||values.confirmpass==''||values.pincode==''||values.address=='')){
        const body={name:values.name,mobile:values.mobile,password:values.password,confirmPassword:values.confirmpass,address:values.address,pincode:values.pincode};
        console.log(body);
        const response= await fetch("https://devhomoeoback.herokuapp.com/register", {
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parseRes=await response.json();
        console.log(parseRes)
        if(parseRes.message==="Succesfull Register"){
        setMessage(parseRes.message)
        console.log(message);
          setChange(true);
          window.location.reload(false);
        }
        else{
          setChange(true);
        setMessage(parseRes.message)
        }
        console.log("hi");
        setCheck(true);
        console.log(check);
      }

    }catch(err){
        console.log(err.message);
    }
      
      
    }
    const handleClickShowcPassword = () => {
      setValues({
        ...values,
        showcPassword: !values.showcPassword,
      });
    };
    
    const handleMouseDowncPassword = (event) => {
      event.preventDefault();
    };
   
    const sub=()=>{
      console.log("fgfgeg");
      window.location.reload(false);
    }
    const handleClickOpen = (pmps) => {
      setNote('');
      setpmp(pmps);
     
      setOpen(true);
    
    };
    
  return (

   
    <BoxContainer>
    {change?
      <Typography variant="body1" color="error">{message}</Typography>
     :null}       
    <Box sx={{ mb:3,mt:1 }}>
    
    <FormControl sx={{ ml: 1, width: '29ch',mt:0 }} variant="standard" >
       
    <InputLabel htmlFor="standard-adornment-password" color='secondary' error={errorname}>Full Name </InputLabel>
    <Input
      id="standard-adornment-password"
      color='secondary'
      label="Mobile Number"
      
      value={values.name}
      onChange={handleChange('name')}
      endAdornment={
        <InputAdornment position="end">
        <IconButton
        aria-label="Example"
        onClick={handleClickname}
      >
      <HighlightOffIcon />
      </IconButton>
          <IconButton
            aria-label="toggle password visibility"
          >
          <a onClick={() => handleClickOpen("1")} style={{cursor:'pointer'}}>
           <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
           </a>
          </IconButton>
        
        </InputAdornment>
      }
      error={errorname}
      required
    />
  </FormControl>
   
  
  <FormControl sx={{ ml: 1, width: '29ch',mt:1 }} variant="standard" >
       
  <InputLabel htmlFor="standard-adornment-password" color='secondary' error={erroraddress}>Address </InputLabel>
  <Input
    id="standard-adornment-password"
    color='secondary'
    label="Mobile Number"
  
    value={values.address}
    onChange={handleChange('address')}
    endAdornment={
      <InputAdornment position="end">
      <IconButton
      aria-label="Example"
      onClick={handleClickaddress}
    >
    <HighlightOffIcon />
    </IconButton>
        <IconButton
          aria-label="toggle password visibility"
        >
        <a onClick={() => handleClickOpen("5")} style={{cursor:'pointer'}}>
         <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
         </a>
        </IconButton>
      
      </InputAdornment>
    }
    
    error={erroraddress}
    required
  />
</FormControl>
  <FormControl sx={{ ml: 1, width: '29ch',mt:1 }} variant="standard" >
       
  <InputLabel htmlFor="standard-adornment-password" color='secondary' error={errorpincode}>Pincode </InputLabel>
  <Input
    id="standard-adornment-password"
    color='secondary'
    
  
    value={values.pincode}
    onChange={handleChange('pincode')}
    endAdornment={
      <InputAdornment position="end">
      <IconButton
      aria-label="Example"
      onClick={handleClickpin}
    >
    <HighlightOffIcon />
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
    
    error={errorpincode}
    required
  />
</FormControl>
<FormControl sx={{ ml: 1, width: '29ch',mt:1 }} variant="standard" >
       
<InputLabel htmlFor="standard-adornment-password" color='secondary' error={erroruser}>Mobile Number </InputLabel>
<Input
  id="standard-adornment-password"
  color='secondary'
  label="Mobile Number"

  value={values.mobile}
  onChange={handleChange('mobile')}
  endAdornment={
    
    <InputAdornment position="end">
    <IconButton
    aria-label="Example"
    onClick={handleClickmobile}
  >
  <HighlightOffIcon />
  </IconButton>
      <IconButton
        aria-label="toggle password visibility"
      >
      <a onClick={() => handleClickOpen("2")} style={{cursor:'pointer'}}>
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
      color='secondary'
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
        {values.showPassword ? <VisibilityOff /> : <Visibility  />}
      </IconButton>
    
          <IconButton
            aria-label="toggle password visibility"
          >
          <a onClick={() => handleClickOpen("7")} style={{cursor:'pointer'}}>
          <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
          </a>
          </IconButton>
        
        </InputAdornment>
      }
      error={errorpass}
      required
    />
  </FormControl>
  <FormControl sx={{ ml: 1, width: '29ch',mt:1 }} variant="standard" >
   
    <InputLabel htmlFor="standard-adornment-password" color='secondary' error={errorcpass}>Confirm Password </InputLabel>
    <Input
      id="standard-adornment-password"
      color='secondary'
      label="Confirm Password"
      type={values.showcPassword ? 'text' : 'password'}
      value={values.confirmpass}
      onChange={handleChange('confirmpass')}
      endAdornment={
        <InputAdornment position="end">
        <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowcPassword}
        onMouseDown={handleMouseDowncPassword}
      >
        {values.showcPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    
          <IconButton
            aria-label="toggle password visibility"
          >
          <a onClick={() => handleClickOpen("8")} style={{cursor:'pointer'}}>
          <MicIcon onClick={() => setIsListening(prevState => !prevState)}/> 
          </a>
          </IconButton>
        
        </InputAdornment>
      }
      error={errorcpass}
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
      <SubmitButton type="submit"  onClick={handleclick} startIcon={<SendIcon />}>Register</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink className="linkme">
        Already have an account?
        
      </MutedLink>
      <BoldLink href="#" onClick={!check? switchToSignin :sub }>
          Signin
        </BoldLink>
    </BoxContainer>
   
  );
}
