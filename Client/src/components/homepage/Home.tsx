import React,{useState,useEffect} from 'react';
import { Link,useHistory } from 'react-router-dom';
import '../stylesheet/Counter.css'
import {useParams} from 'react-router-dom';
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
import FileCopy from '@mui/icons-material/FileCopy';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios'
import img from '../images/a1.jpg'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import img2 from '../images/a2.jpg'
import Dialog from '@material-ui/core/Dialog';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { CartState } from "../context/Context";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@mui/icons-material/Person';

// Components
import Slider from './Slider';

import './Slider/slider.css';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

//drawer
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
    width: `calc(100% )`,
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
  textAlign:"center",
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

// Types
export type Character = {
  
  id:string;
  img_url: string;
  name: string;
  price:string;
 
};

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    },
    info:{
      main:'#2F4F4F'
    }
  },
  typography: {
    h5: {
      fontWeight: 600 // or 'bold'
    }
  }
});

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

function Counter({Id,cartprd,iscart,setiscart}) {
  console.log(cartprd)

  const toolbarSt = useStyles();
  const [open, setOpen] = useState(false);
  
  const handleDrawerOpen =() => {
    setOpen(true);
    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  //store data
  const [show,setshow]=useState([]);

  let history=useHistory();
    const handleDialogOpen = (product) => {
      history.push(`/product/registered/${product.name}/${product._id}`);
    };
    const [nutrition,setnutrition] = useState([]);
    const [medicine,setmedicine] = useState([]);
    const [beauty,setbeauty] = useState([]);
    const [personalcare,setpersonalcare] = useState([]);
    const [homecare,sethomecare] = useState([]);
    
    useEffect(() => {
      axios
          .get(`https://devhomoeoback.herokuapp.com/admin/products`)
          .then(res => {
      console.log(res)
      setshow(res.data)
      console.log(res.data);
      const nut=[],med=[],bea=[],per=[],hom=[];
      res.data.map((p)=>{
       
        if(p.category==="nutrition"&&p.showOnHomePage===true)
        {
          nut.push(p);
        }
        if(p.category==="medicine"&&p.showOnHomePage===true)
        {
          med.push(p);
        }
        if(p.category==="beauty"&&p.showOnHomePage===true)
        {
          bea.push(p);
        }
        if(p.category==="personal care"&&p.showOnHomePage===true)
        {
          per.push(p);
        }
        if(p.category==="home care"&&p.showOnHomePage===true)
        {
          hom.push(p);
        }
      })
      setnutrition(nut);
      setmedicine(med);
      setbeauty(bea);
      setpersonalcare(per);
      sethomecare(hom);
          })
          .catch(err => {
              console.log(err)
          })
  }, [])
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '45vw'
}
const {
  state: { cart },
  dispatch,
} = CartState();
const [total, setTotal] = useState();
if(cart.length===0&&cartprd.length!==0)
{
  
  var sum=0;
  console.log(cartprd);
  cartprd.map((prodt)=>{
    cart.push(prodt)
    sum=sum+prodt.price*prodt.qty;
  })
  
}

useEffect(() => {
  
  setTotal(
    cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
  );
 
}, [cart]);



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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Dev Homoeo Hall
          </Typography>
         
          <Link to={"/cart/"+Id} className="link"> 
          <IconButton
          size="large"
          aria-label="show 1 items"
          color="inherit"
        >
          <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
          
          </Badge>
          {total!==0?
          <Typography ml={1} variant="body2" component="div" sx={{ flexGrow: 1 }}><span id="hide">₹ {total}.00</span></Typography>
          :null
          }
          
          
        </IconButton>
        
         </Link>
         
          
        </Toolbar>
       
        <Toolbar  variant="dense"  className={toolbarSt.root}>
        <Link to={"/uploadrx/"+Id} className="link">
        <Button variant="" component="div"  startIcon={<FileCopy />}>
           
           Upload Rx  </Button>
           </Link>
        <Link to={"/all_products_user/"+Id} className="link">
        <Button variant="" component="div"  startIcon={<SearchIcon />} id="searchl">
        Search / View all products
        </Button>
       
         </Link>
         <Link to={"/all_products_user/"+Id} className="link">
        <Button variant="" component="div"  startIcon={<SearchIcon />} id="searchp">
        Search products
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
        
      <HomeIcon id="icontop"/><strong>HOME</strong>
    
        <IconButton onClick={handleDrawerClose} >
          {theme.direction === 'ltr' ? <ChevronLeftIcon id="icontop" /> : <ChevronRightIcon id="icontop" />}
        </IconButton>
      </DrawerHeader>
     
      <Divider />
    
      
      <List >
      <ListItem disablePadding>
      <ListItemButton component={Link} to={"/profile/"+Id}>
        <ListItemIcon>
          <PersonIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </ListItem>
    <Divider />
      <ListItem disablePadding>
      <ListItemButton component={Link} to={"/all_products_user/"+Id}>
        <ListItemIcon>
          <StoreIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Store" />
      </ListItemButton>
    </ListItem>
    <Divider />
    <ListItem disablePadding>
      <ListItemButton component={Link} to={"/wishlist/"+Id}>
        <ListItemIcon>
          <FavoriteIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Wishlist" />
      </ListItemButton>
    </ListItem>
    <Divider />
    <ListItem disablePadding >
    
    <ListItemButton component={Link} to={"/uploadrx/"+Id}>
      <ListItemIcon>
        <FileCopyIcon color="info" />
      </ListItemIcon>
      <ListItemText primary="Upload Rx" />
    </ListItemButton>
    
  </ListItem>
      
      <Divider />
      <ListItem disablePadding >
    
    <ListItemButton component={Link} to={"/userrx/"+Id}>
      <ListItemIcon>
        <NoteAddIcon color="info" />
      </ListItemIcon>
      <ListItemText primary="Your Rx" />
    </ListItemButton>
    
  </ListItem>
  
  <Divider />
      <ListItem disablePadding >
    
    <ListItemButton component={Link} to={"/orders/"+Id}>
      <ListItemIcon>
        <ShoppingBasketIcon color="info" />
      </ListItemIcon>
      <ListItemText primary="Your Orders" />
    </ListItemButton>
    
  </ListItem>
  
  <Divider />
  <ListItem disablePadding >
    
    <ListItemButton component={Link} to={"/cart/"+Id}>
      <ListItemIcon>
        <AddShoppingCartIcon color="info" />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
    
  </ListItem>
      
      <Divider />
      <ListItem disablePadding >
    
    <ListItemButton target="_blank" component="a" href="https://www.google.com/maps/place/Dev+Homoeo+Hall/@23.3453194,85.2953165,14z/data=!4m6!3m5!1s0x39f4e1f01a3648b1:0x8113bbfbbb0592c9!8m2!3d23.3453194!4d85.312826!15sChVkZXYgaG9tZW8gaGFsbCByYW5jaGmSASFhbHRlcm5hdGl2ZV9tZWRpY2luZV9wcmFjdGl0aW9uZXI?shorturl=1">
      <ListItemIcon>
        <PermContactCalendarIcon  color="info" />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItemButton>
    
  </ListItem>
   
    
  <Divider />
      <ListItem disablePadding >
    
      <ListItemButton component={Link} to="/logout">
        <ListItemIcon>
          <LogoutIcon  color="info" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      
    </ListItem>
     
      
    <Divider />
   
      </List>
      
     
     
     
      
      
    </Drawer>
   
    <Box pt={13} id="viewall">
    
    
    </Box>
    <h3 className="title" style={{ color: '	#FFFFFF',marginBottom:'0px'}}>Nutrition</h3>
     
     <Slider {...SliderProps}>
       {nutrition.map(product => (
         <div key={product._id} onClick={() => handleDialogOpen(product)}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
       component="img"
     
       image={product.img_url}
       alt="product"
     />
     
     <CardContent id="front">
       <Typography gutterBottom variant="body2" component="div">
     <strong id="textxst">  {product.name} </strong>
       </Typography>
       </CardContent>
            </Card>
            
            
         </div>
       ))}
     </Slider>
     <h3 className="title" style={{ color: '	#FFFFFF',marginBottom:'0px',marginTop:'3%'}}>Medicine</h3>
     
     <Slider {...SliderProps}>
       {medicine.map(product => (
         <div key={product._id} onClick={() => handleDialogOpen(product)}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
       component="img"
     
       image={product.img_url}
       alt="product"
     />
     
     <CardContent id="front">
       <Typography gutterBottom variant="body2" component="div">
       <p id="textx"><strong>    {product.name} </strong> </p>
       </Typography>
       </CardContent>
            </Card>
            
            
         </div>
       ))}
     </Slider>
     <h3 className="title" style={{ color: '	#FFFFFF',marginBottom:'0px'}}>Beauty</h3>
     
     <Slider {...SliderProps}>
       {beauty.map(product => (
         <div key={product._id} onClick={() => handleDialogOpen(product)}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
       component="img"
     
       image={product.img_url}
       alt="product"
     />
     
     <CardContent id="front">
       <Typography gutterBottom variant="body2" component="div">
     <strong>  {product.name} </strong>
       </Typography>
       </CardContent>
            </Card>
            
            
         </div>
       ))}
     </Slider>
     <h3 className="title" style={{ color: '	#FFFFFF',marginBottom:'0px',marginTop:'3%'}}>Personal Care</h3>
     
     <Slider {...SliderProps}>
       {personalcare.map(product => (
         <div key={product._id} onClick={() => handleDialogOpen(product)}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
       component="img"
     
       image={product.img_url}
       alt="product"
     />
     
     <CardContent id="front">
       <Typography gutterBottom variant="body2" component="div">
       <p id="textx"><strong>    {product.name} </strong> </p>
       </Typography>
       </CardContent>
            </Card>
            
            
         </div>
       ))}
     </Slider>
     <h3 className="title" style={{ color: '	#FFFFFF',marginBottom:'0px',marginTop:'3%'}}>Home Care</h3>
     
     <Slider {...SliderProps}>
       {homecare.map(product => (
         <div key={product._id} onClick={() => handleDialogOpen(product)}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
       component="img"
     
       image={product.img_url}
       alt="product"
     />
     
     <CardContent id="front">
       <Typography gutterBottom variant="body2" component="div">
       <p id="textx"><strong>    {product.name} </strong> </p>
       </Typography>
       </CardContent>
            </Card>
            
            
         </div>
       ))}
     </Slider>
      </Box>
      </ThemeProvider>
    );
  }

export default Counter