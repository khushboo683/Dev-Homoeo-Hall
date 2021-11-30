import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {useParams,useHistory} from 'react-router-dom';
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
import img from '../images/a1.jpg'
import img2 from '../images/a2.jpg'
import Dialog from '@material-ui/core/Dialog';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputUnstyled from '@mui/core/InputUnstyled';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import BallotIcon from '@mui/icons-material/Ballot';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { BoxContainer } from '../accountBox/common';
import SecurityIcon from '@mui/icons-material/Security';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ShopSharpIcon from '@mui/icons-material/ShopSharp';
import ExtensionIcon from '@mui/icons-material/Extension';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../adminpage/Form.css';
import axios from 'axios'
const SliderProps = {
  zoomFactor: 8, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 6,
  pageTransition: 500 // Transition when flipping pages
};



const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    }
  },
  typography: {
    h5: {
      fontWeight: 450 // or 'bold'
    },
    h4:{
      fontSize:'23px',
      fontWeight:420
    }
  }
});

function Editprofile({Id}) {
  console.log(Id);
 
    const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [message,setMessage] = useState("");
  const [change, setchange] = useState(false);
  //const [newname,setnewname]= useState(edititem.name);
  const [valuess, setValuess] = useState([]);
  const [user,setuser] = useState([]);
   useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/user/${Id}/profile`)
    .then(res => {
console.log(res)

setValuess(res.data)
setuser(res.data);
console.log(res.data);

    })
    .catch(err => {
        console.log(err)
    })
        
}, [])

const handleChange = event => {
    setValuess({
      ...valuess,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit = async(body) => {
   
    
    if(body.name==='')
    body.name=user.name;
    if(body.address==='')
    body.address=user.address;
    if(body.pincode==='')
    body.pincode=user.pincode;
    if(body.mobile==='')
    body.mobile=user.mobile;
 
   
    console.log(body);
   
    const response= await fetch(`https://devhomoeoback.herokuapp.com/user/${Id}/profile/edit`, {
        method:"PUT",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const parseRes=await response.json();
    console.log(parseRes)
    if(parseRes.message==="Successfully changed mobile")
    {
      history.push("/logout");
    }
    else if(parseRes.message==="Successfully changed your details"){
    setMessage(parseRes.message)
    console.log(message);
     setchange(true);
      
    }
    else{
      console.log("false");
    setchange(false);
    setMessage(parseRes.message)
    }
    
    
  };

  var history= useHistory();
  const handleDialogOpen1 = (product) => {
    history.push(`/product/${product.name}/${product.id}`);
  };
  const handleDialogOpen2 = (product) => {
    history.push(`/product/${product.name}/${product.id}`);
  };
  const handleDialogOpen3 = (product) => {
    history.push(`/product/${product.name}/${product.id}`);
  };
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary">
        <Toolbar>
        
        <IconButton
          size="large"
          aria-label="show 3 items"
          color="inherit"
        >
          
        <AddCircleIcon />
         
        </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
          Edit Profile
          </Typography>
          <Box>
        
        
          <Link to="/logout" className="link"> <Button variant="outlined" color="inherit">Logout</Button></Link>
          </Box>
          </Toolbar>
          </AppBar>
                 
<div class="containers">
<form onSubmit={handleSubmit(onSubmit)} >

  <div id="prm"><ReceiptIcon /> Edit Profile Details</div>
  <div id="midme">
  {change?<Typography variant="body1" color="success"><div id="success1"><strong>{message} !!</strong></div></Typography>:<Typography variant="body1" color="error"><div id="error1"><strong>{message}</strong></div></Typography>}
  </div>
  <div class="form-groups">
    <input {...register("name")} value={valuess.name} onChange={handleChange}  type="text" required="required" />
    <label for="input" class="control-label">Full Name</label><i class="bar"></i>
  </div>
  <div class="form-groups">
  <input {...register("mobile")} value={valuess.mobile} onChange={handleChange} type="text" required="required"/>
  <label for="input" class="control-label">Mobile</label><i class="bar"></i>
</div>
  <div class="form-groups">
  <input {...register("pincode")} value={valuess.pincode} onChange={handleChange} type="text" required="required"/>
  <label for="input" class="control-label">Pincode</label><i class="bar"></i>
</div>
<div class="form-groups">
    <input type="text" {...register("address")} value={valuess.address} onChange={handleChange} required="required"/>
    <label for="input" class="control-label">Address</label><i class="bar"></i>
  </div>

  
  
  <div id="buttonarrange">

  <button type="submit" class="button"> <span><strong>+ </strong> Edit Details</span></button>
  
</div>
</form>

</div>
   
      </Box>
      </ThemeProvider>
    );
  }

export default Editprofile