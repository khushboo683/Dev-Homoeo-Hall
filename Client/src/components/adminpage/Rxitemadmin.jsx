import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/Counter.css'

import {useParams,useHistory, useLocation} from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CartState } from "../context/Context";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotesIcon from '@mui/icons-material/Notes';
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
import ButtonGroup from '@mui/material/ButtonGroup';
import StoreIcon from '@mui/icons-material/Store';
//import { Scrollbars } from "react-custom-scrollbars-2";
import { Scrollbars } from "react-custom-scrollbars-2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import "../stylesheet/cart.css";

import { BoxContainer } from '../accountBox/common';
import Slide from '@mui/material/Slide';


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

function Rxitemadmin() {
  const params = useParams();
  const Id=params.id;
  console.log(Id);
  const [rx,setrx] = useState([]);
  const [amount,setamount] = useState();
  useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/admin/rxes/${Id}`)
    .then(res => {
console.log(res)
setrx(res.data.Rx)
setamount(res.data.amount);
console.log(res.data);
    })
    .catch(err => {
        console.log(err)
    })
        
}, [])
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
          
          <SpeakerNotesIcon />
          
          
        </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
          RxDetails
          </Typography>
          <Box>
          <Link to="/adminhome" className="link"> <HomeIcon fontSize="large" /> </Link>
          </Box>
          </Toolbar>
          </AppBar>
          
          <div id="reveiw">
          <Typography variant="h4" color="text.secondary" mt={3} id="revname" > 
          <strong>   <NotesIcon /> Description </strong></Typography>
          <Typography variant="body1" color="text.secondary" mr={3} id="desp">
        <strong>{rx.description}</strong>
        
      </Typography>
     
       
      </div>
      <div id="buttonarrange">
          <img src = {rx.url} />
          </div>
      <div id="buttonarrange">
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{mt:4,mb:3}}>
        <Button>Amount</Button>
        <Button variant="outlined">₹{amount}.00</Button>
        </ButtonGroup>
        </div>
        
      </Box>
      </ThemeProvider>
    );
  }

export default Rxitemadmin