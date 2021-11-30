import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/Counter.css'

import {useParams,useHistory} from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core';

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
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Select from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { CartState } from "../context/Context";
import StoreIcon from '@mui/icons-material/Store';
// Components
import Slider from './Slider';

import './Slider/slider.css';
const drawerWidth = 230;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `0px`,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

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
    },
    info:{
      main:'#2F4F4F'
    },
    primary:{
      main:'#DE3163'
    }
  },
  typography: {
    h5: {
      fontWeight: 450 // or 'bold'
    },
    h4:{
      fontSize:'20px',
      fontWeight:400,
      color:"	#2F4F4F"
    }
  }
});
const options1 = [
  'Low to High',
  'High to Low'
  
];
const options2 =[
  'Fast Delivery',
  'Include out of stock'
];
const clearf =[
  'Clear Filter'
];
const ITEM_HEIGHT = 48;
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:"#296E85",
    minHeight: "30px !important"
  },
  minHeight: {
    minHeight: "5px !important",
  },
smallTypo:{
fontSize:"5px"
}
}));
function All_products() {
  const [message,setmessage]=useState(false);
  const [selected, setSelected] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toolbarSt = useStyles();
  const shoot=()=>{
    setmessage(true);
}
  const [open, setOpen] = useState(false);
  let history=useHistory();
  const handleDialogOpen = (product) => {
    history.push(`/product/unregistered/${product.name}/${product._id}`);
  };
  const handleDrawerOpen =() => {
    setOpen(true);
    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [show,setshow]=useState([]);
  useEffect(() => {
    axios
        .get(`https://devhomoeoback.herokuapp.com/admin/products`)
        .then(res => {
    console.log(res)
    setshow(res.data)
    console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
}, [])

 
const searchHandler = (searchTerm) => {
  setSearchTerm(searchTerm);
  console.log(searchTerm);
  if (searchTerm !== "") {
    const newProductList = show.filter((row) => {
        console.log(Object.values(row.name).join("").toLowerCase());
        console.log(searchTerm.toLowerCase());
      return Object.values(row.name)
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setSearchResults(newProductList);
    console.log(searchResults);
  } else {
    setSearchResults(show);
  }
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = show.map((n) => n.name);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};
const inputEl = useRef("");
    
  
  const getSearchTerm = () => {
      
    searchHandler(inputEl.current.value);
  };
  const clicked = () =>{

  };
  const {
    state: { cart,products },
    dispatch,
  } = CartState();
  const {
    productDispatch,
    productState: { isAvailable, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();
  //filter
  const transformProducts = () => {
    let sortedProducts = show;
   
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!isAvailable) {
      sortedProducts = sortedProducts.filter((prod) => prod.isAvailable);
    }
   
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
   
    return sortedProducts;
  };
  
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="fixed" color="secondary" open={open}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} id="title">
          Store
          </Typography>
          <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
          inputRef={inputEl}
          type="text"
            placeholder="Search.."
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
           
          />
        </Search>
          <Link to="/account" className="link"> <Button variant="outlined" color="inherit">Login</Button></Link>
         
         
         
        </Toolbar>
        <Toolbar  variant="dense"  className={toolbarSt.root}>
        
        <Button onClick={ shoot } variant="" component="div"  startIcon={<FavoriteIcon />}>
           
           Wishlist  </Button>
          
        <Link to={"/"} className="link">
        <Button variant="" component="div"  startIcon={<HomeIcon />} id="searchl">
        Home
        </Button>
       
         </Link>
         <Link to={"/home"} className="link">
        <Button variant="" component="div"  startIcon={<HomeIcon />} id="searchp">
        Home
        </Button>
       
         </Link>
        </Toolbar>
      </AppBar>
      <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
    <DrawerHeader id="drawtitle">
        
    <StoreIcon id="icontop"/><strong>Store</strong>
  
      <IconButton onClick={handleDrawerClose} >
        {theme.direction === 'ltr' ? <ChevronLeftIcon id="icontop" /> : <ChevronRightIcon id="icontop" />}
      </IconButton>
    </DrawerHeader>
     
      <Divider />
    
      
      <List >
     
      
      <ListItem>
      <Typography variant="h4" align="center">
      <FilterAltIcon />
      Filter Products
      </Typography>
      </ListItem>
      
      <ListItem>
      <FormControl component="fieldset">
     
      <RadioGroup
        aria-label="price"
        name="radio-buttons-group"
       
      >
      <FormControlLabel value="Low" control={<Radio color="info"/>} label="Low to High" onChange={() =>
        productDispatch({
          type: "SORT_BY_PRICE",
          payload: "lowToHigh",
        })
      }
      checked={sort === "lowToHigh" ? true : false} />
      <FormControlLabel value="High" control={<Radio color="info"/>} label="High to Low"  onChange={() =>
        productDispatch({
          type: "SORT_BY_PRICE",
          payload: "highToLow",
        })
      }
      checked={sort === "highToLow" ? true : false} />
        
      </RadioGroup>
      <FormControlLabel control={<Checkbox />} label="Include Out Of Stock"  onChange={() =>
        productDispatch({
          type: "FILTER_BY_STOCK",
        })
      }
      checked={isAvailable}/>
    
    </FormControl>
    </ListItem>
    <ListItem disablePadding >
    
    <ListItemButton onClick={() =>
      productDispatch({
        type: "CLEAR_FILTERS",
      })
    }>
      <ListItemIcon>
        <DeleteIcon color="info" />
      </ListItemIcon>
      <ListItemText primary="Clear Filter" />
    </ListItemButton>
    
  </ListItem>
      </List>
      
      <Divider />
      <ListItem disablePadding>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <HomeIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </ListItem>
    
      
      <Divider />
      <ListItem disablePadding >
    
      <ListItemButton component={Link} to="/account">
        <ListItemIcon>
          <ExitToAppIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Login/SignUp" />
      </ListItemButton>
      
    </ListItem>
      <Divider />
     
      
      
    </Drawer>

    <Main open={open} >
    <DrawerHeader />
    {message===true?
      <Alert variant="filled" severity="error" id="acenter">
      <AlertTitle><Link to="/account" className="link">Please Login !!</Link></AlertTitle>
      
    </Alert>
                :null}    
    <Grid sx={{ flexGrow: 1 }} container spacing={2} id="itemss">
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={10} id="griditem">
        {transformProducts().map(product => (
          <Grid item id="cardgrid">
          
           <Card sx={{ maxWidth: 250 }}  >
           <a onClick={() => handleDialogOpen(product)} style={{cursor:'pointer'}}>
           <CardMedia
        component="img"
         
        image={product.img_url}
        alt="product"
        id="carditem"
        
      />
      </a>
      <CardContent id="cdp">
      <a onClick={() => handleDialogOpen(product)} style={{cursor:'pointer'}}>
        <Typography gutterBottom variant="body2" component="div" id="titlecart">
        <strong>   {product.name} </strong>
        </Typography>
        </a>
        <Typography variant="body2" color="text.secondary">
        Pack size : {product.size}
        </Typography>
        <Typography variant="h6" color="text.secondary" id="titlecart2">
        MRP: ₹{product.price}.00
        <Fab onClick={shoot} size="small"  sx={{ml:5,mb:1}}  aria-label="like">
        <FavoriteBorderIcon color="primary"/>
      </Fab>
        </Typography>
        <div id="cartbutton">
        
        <Button variant="contained" color="success" onClick={ shoot } disabled={!product.isAvailable}> {!product.isAvailable ? "Out of Stock" : "Add To Cart"}</Button>
     
        </div>
        </CardContent>
             </Card>
             
            
          </Grid>
          ))}
       
        </Grid>
      </Grid>
      </Grid>
  </Main>
      </Box>
      </ThemeProvider>
    );
  }

export default All_products