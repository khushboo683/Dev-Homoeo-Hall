import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import './Counter.css'

import {useParams} from 'react-router-dom';
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

import { BoxContainer } from '../accountBox/common';
import Slide from '@mui/material/Slide';
import OrderItem from './OrderItem';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import RxItem from './RxItem';

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
      fontSize:'22px',
      fontWeight:420
    }
  }
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function YourRx({Id}) {
  console.log(Id);
  
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [rx,setrx]=useState([]);
  useEffect(() => {
    axios
        .get(`https://devhomoeoback.herokuapp.com/user/${Id}/myrxes`)
        .then(res => {
    console.log(res)
    setrx(res.data)
    console.log(res.data);
    
        })
        .catch(err => {
            console.log(err)
        })
}, [])
console.log(rx);
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary">
      <Toolbar>
      
      <IconButton
        size="large"
        color="inherit"
      >
        
        <NoteAddIcon />
        
      </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
        Rx
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
         
          <section className="main-cart-section">
         
          
          <div className="cart-items">
            <div className="cart-items-containers">
            <hr />
              <Scrollbars>
                {rx.slice(0).reverse().map((curItem) => {
                  return <RxItem key={curItem._id} {...curItem} Id={Id} />;
                })}
              </Scrollbars>
            </div>
          </div>
                
          <div id="cartnews" >
          
          
  
    <Button color="success" variant="contained" onClick={() => window.open('https://goo.gl/maps/P6QM4gczQ326ANoZA')}  endIcon={<ContactSupportIcon />}>
    Contact Us
  </Button>

      
    </div>
    
        </section>
   
      
        
        
      </Box>
      </ThemeProvider>
    );
  }

export default YourRx