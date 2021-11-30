import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import './Counter.css'

import {useParams,useHistory} from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CartState } from "../context/Context";
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
import NoteAddIcon from '@mui/icons-material/NoteAdd';
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
//import { Scrollbars } from "react-custom-scrollbars-2";
import { Scrollbars } from "react-custom-scrollbars-2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Items from "./Items";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import "../stylesheet/order.css";
import PersonIcon from '@mui/icons-material/Person';
import { BoxContainer } from '../accountBox/common';
import Slide from '@mui/material/Slide';
import OrderItem from './OrderItem';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import RxItem from './RxItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    },
  },
  typography: {
    h5: {
      fontWeight: 450 // or 'bold'
    },
    h4:{
      fontSize:'25px',
      fontWeight:450
    },
    h6:{
        fontSize:'18px'
    }
  }
});


function Profile({Id}) {
  console.log(Id);
  
  const {
    state: { cart },
    dispatch,
  } = CartState();
  
 
  const [user,setuser]=useState([]);
  const [order,setorder] = useState([]);
  const [rx,setrx] = useState([]);
  useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/user/${Id}/profile`)
    .then(res => {
console.log(res)
setrx(res.data.Rx)
setuser(res.data)
console.log(res.data);
axios
.get(`https://devhomoeoback.herokuapp.com/user/${Id}/myorders`)
.then(ress => {
console.log(ress)
setorder(ress.data)
console.log(ress.data);

})
.catch(err => {
    console.log(err)
})
    })
    .catch(err => {
        console.log(err)
    })
        
}, [])
const [open,setOpen] = useState(false);
let history = useHistory();
const handleClose = () => {
  setOpen(false);
};
const deleteuser =async () =>{
  console.log(Id);
  const response= await fetch(`https://devhomoeoback.herokuapp.com/user/${Id}/profile/delete`, {
      method:"DELETE"
  });
  
  setOpen(false);
  history.push("/logout");
};
const handleClickOpen = () => {
  setOpen(true);
 
};
const editdet = () =>{
  history.push(`/editprofile/${Id}`);
}
console.log(user);
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary">
      <Toolbar>
      
      <IconButton
        size="large"
        color="inherit"
      >
        
        <PersonAddIcon />
        
      </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
        Profile
        </Typography>
        <Box>
        <Link to="/home" className="link"> <HomeIcon fontSize="large" /> </Link>
        <Link to={"/all_products_user/"+Id} className="link"> <StoreIcon fontSize="large"/> </Link>
        <Link to={"/cart/"+Id} className="link"> 
        <IconButton
        size="large"
        aria-label="show 0 items"
        color="inherit"
      >
        <Badge badgeContent={cart.length} color="error">
        <ShoppingCartIcon />
        
        </Badge>
      </IconButton>
      
       </Link>
        
        </Box>
        </Toolbar>
        </AppBar>
        <div id="newtb">
      
        <Card sx={{ maxWidth: 600,mt:7,pl:1,pr:1 }} elevation={6}>
        <CardMedia
        id="big"
        component="img"
        
        image="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
        alt="green iguana"
        sx={{pl:22,pr:22}}
      />
      <CardMedia
      id="small"
      component="img"
      
      image="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
      alt="green iguana"
      sx={{pl:10,pr:10}}
    />
        <CardContent>
          <Typography  gutterBottom variant="h4" component="div" >
          <div id="mar">  {user.name} </div>
          </Typography>
         
          <Typography variant="h6" color="text.secondary" align="left" sx={{mt:3}}>
           Mobile <span id="mo1">:</span>  {user.mobile}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" align="left">
           Address   <span id="mo5">:</span> {user.address}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="left">
          Pincode <span id="mo3">:</span> {user.pincode}
         </Typography>
         <Typography variant="h6" color="text.secondary" align="left">
          Orders <span id="mo4">:</span> {order.length}
         </Typography>
         <Typography variant="h6" color="text.secondary" align="left">
          Rx <span id="mo6">:</span> {rx.length}
         </Typography>
        </CardContent>
        
        <CardActions sx={{mb:1}}>
          <Button variant="contained" size="small" sx={{mr:1}} onClick={editdet}>Edit Details</Button>
          <a onClick={handleClickOpen} style={{cursor:'pointer'}}>  <Button variant="outlined" color="error" size="small">Delete Account</Button></a>
        </CardActions>
      </Card>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Do you want to delete this account ?"}
      </DialogTitle>
      <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button  onClick={() => deleteuser()} autoFocus>
            Agree
          </Button> 
        </DialogActions>
      </Dialog>
      </div>
      </Box>
      </ThemeProvider>
    );
  }

export default Profile