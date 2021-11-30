import React,{ useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Homelogin from './components/homepage/Homelogin';
import Error from './components/error';
import {createTheme,ThemeProvider} from '@material-ui/core';
import { purple, red } from '@material-ui/core/colors';
import Layout from './components/homepage/Layout';
import { AccountBox } from "./components/accountBox";
import Logout from "./components/accountBox/logout"
import Home from './components/homepage/Home';
import All_products from './components/homepage/All_products';
import All_products_user from './components/homepage/All_products_user';
import Cart from './components/homepage/Cart';
import Upload_Rx from './components/homepage/Upload_Rx';
import Products from './components/homepage/Products';
import Adminhome from './components/adminpage/Adminhome';
import AdminProducts from './components/adminpage/ProductAdmin';
import UserInfo from './components/adminpage/UserInfo';
import AdminOrders from './components/adminpage/OrdersAdmin';
import AddProduct from './components/adminpage/AddProduct';
import EditProduct from './components/adminpage/EditProduct';
import Productreg from './components/homepage/Productreg';
import Productview from './components/adminpage/Productview';

import Orders from './components/homepage/Orders';
import Context from "./components/context/Context";
import axios from 'axios'
import Thank from './components/homepage/Thank';
import OrderDetails from './components/homepage/OrderDetails';
import YourRx from './components/homepage/YourRx';
import RxDetails from './components/homepage/RxDetails';
import Pending from './components/adminpage/Pending';
import Delivered from './components/adminpage/Delivered';
import Cancelled from './components/adminpage/Cancelled';
import AdminRx from './components/adminpage/Adminrx';
import PendingRx from './components/adminpage/Pendingrx';
import Deliveredrx from './components/adminpage/Deliveredrx';
import CancelledRx from './components/adminpage/Cancelledrx';
import Profile from './components/homepage/Profile';
import Userdetail from './components/adminpage/Userdetail';

import Rxitemadmin from './components/adminpage/Rxitemadmin';
import Wishlist from './components/homepage/Wishlist';
import Editprofile from './components/homepage/Editprofile';
function App() {
  
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  const [val,setVal]=useState(false);
  const [Id,setId]=useState("");
  const [allprd,setallprd] = useState([]);
  const [edititem,setedititem]=useState("me");
  const checkAuthenticated =async () =>{
    //console.log("check");
    //console.log(setIsAuthenticated);
    try{
      const response=await fetch("https://devhomoeoback.herokuapp.com/check", {
        method: "POST",
        headers: {
          Authorization : "Bearer " +localStorage.token
        }
      });
      const parseRes = await response.json();
      
    console.log(parseRes);
    if(localStorage.getItem("token")==="adminhaizinda"){
      setIsAdmin(true);
      setIsAuthenticated(true);
    }
    else{
        console.log(parseRes.decoded.mobile);
        setId(parseRes.decoded.mobile);
        

        if(parseRes.decoded.mobile!==""){
        setIsAuthenticated(true)
        console.log(parseRes.decoded.mobile);
        const fetchData = async () => {
          const data = await getData(parseRes.decoded.mobile);
          console.log(data);
          setprod(data);
          const data2 = await getData2();
          console.log(data2);
          setallprd(data2);
       }
     
      await fetchData();
        return true;
        }
        else{
        setIsAuthenticated(false);
        return false;
        }
        
    }
      console.log(isAdmin);
    }catch(err){
      
      console.log(err.message)
      return false;
    }
  };
  
  async function getData(userId) {
    const data = await axios.get(`https://devhomoeoback.herokuapp.com/user/${userId}/cart`)
        .then(promise => {
            return promise.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
}
async function getData2() {
  const data = await axios.get(`https://devhomoeoback.herokuapp.com/admin/products`)
      .then(promise => {
          return promise.data;
      })
      .catch(e => {
          console.error(e);
      })
      return data;
}

  useEffect(() => {
    const pathname = window.location.pathname;
    
    console.log(pathname);
   console.log(isAdmin);
    if(pathname!=="/account" || localStorage.getItem("token") !== null){
        console.log(localStorage.getItem("token"));
        const check= checkAuthenticated();
        
        console.log(check);
       // checkLogin();
        console.log(val);
        console.log(Id);
        console.log(prod);
        
   }
   return () => {
    setprod([]); // This worked for me
    setIsAuthenticated(false);
    setAdmin(false);
    setVal(false);
    setId("");
  };
  },[]);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  const setAdmin = boolean => {
    setIsAdmin(boolean);
  };
  const logout = boolean => {
    setIsAuthenticated(false);
   // localStorage.removeItem("token");
  }
  const [prod,setprod] = useState([])
  console.log(Id);
  const cartprd = [];
  

  allprd.map(function(pr) {
    prod.map(function(product){
    if(product.productId===pr._id)
    {
      pr.qty=product.productQty;
      cartprd.push(pr);
    }
    })
  })
    const [iscart,setiscart] = useState([]);
    console.log(allprd);
    console.log(prod);
    console.log(cartprd);
  console.log(prod);
 
  return (
    <Context Id={Id} prod={prod} allprd={allprd} cartprd={cartprd}>
    <Router>
    <Layout>
      <Switch>
      <Route path="/" exact render={props=>!isAuthenticated?<Homelogin />:isAdmin?<Redirect to="/adminhome"></Redirect>:<Redirect to={"/home"}></Redirect>} ></Route>
      <Route path="/account" exact render={props=>!isAuthenticated?<AccountBox setIsAuthenticated={setIsAuthenticated} Id={Id}  setIsAdmin={setIsAdmin}/>:<Redirect to={"/home"}></Redirect>} ></Route>
      <Route path="/adminhome" exact render={props=>isAdmin?<Adminhome setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/productsinfo" exact render={props=>isAdmin?<AdminProducts setIsAdmin={setIsAdmin} Id={Id} setedititem={setedititem}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/userdetail/:id" exact render={props=>isAdmin?<Userdetail setIsAdmin={setIsAdmin} Id={Id} setedititem={setedititem}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/rxpage/:id" exact render={props=>isAdmin?<Rxitemadmin setIsAdmin={setIsAdmin} Id={Id} setedititem={setedititem}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/userinfo" exact render={props=>isAdmin?<UserInfo setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/product/admin/:name/:id" exact render={props=>isAdmin?<Productview setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminorders" exact render={props=>isAdmin?<AdminOrders setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminrx" exact render={props=>isAdmin?<AdminRx setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminorders/pending" exact render={props=>isAdmin?<Pending setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminorders/delivered" exact render={props=>isAdmin?<Delivered setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminorders/cancelled" exact render={props=>isAdmin?<Cancelled setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminRx/pending" exact render={props=>isAdmin?<PendingRx setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminRx/delivered" exact render={props=>isAdmin?<Deliveredrx setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/adminRx/cancelled" exact render={props=>isAdmin?<CancelledRx setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/addproduct" exact render={props=>isAdmin?<AddProduct setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/editproduct/:id" exact render={props=>isAdmin?<EditProduct edititem={edititem} setIsAdmin={setIsAdmin} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route path="/home" exact render={props=>isAdmin?<Redirect to="/adminhome"></Redirect>:isAuthenticated?<Home setIsAuthenticated={setIsAuthenticated} Id={Id} cartprd={cartprd} setiscart={setiscart} iscart={iscart}/>:<Redirect to="/"></Redirect>} ></Route>
     
      <Route exact path="/logout" render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? <Logout  setIsAuthenticated={setIsAuthenticated} logout={logout} setIsAdmin={setIsAdmin}/>: <Redirect to="/" />):null
     }
     />
     <Route path="/all_products_user/:id" exact render={props=>isAuthenticated?<All_products_user setIsAuthenticated={setIsAuthenticated} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/wishlist/:id" exact render={props=>isAuthenticated?<Wishlist setIsAuthenticated={setIsAuthenticated} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/cart/:id" exact render={props=>isAuthenticated?<Cart setIsAuthenticated={setIsAuthenticated} Id={Id} />:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/profile/:id" exact render={props=>isAuthenticated?<Profile setIsAuthenticated={setIsAuthenticated} Id={Id} />:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/editprofile/:id" exact render={props=>isAuthenticated?<Editprofile setIsAuthenticated={setIsAuthenticated} Id={Id} />:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/thank/:id" exact render={props=>isAuthenticated?<Thank setIsAuthenticated={setIsAuthenticated} Id={Id} setiscart={setiscart} iscart={iscart}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/orderdetail/:id" exact render={props=>isAuthenticated?<OrderDetails setIsAuthenticated={setIsAuthenticated} Id={Id} setiscart={setiscart} iscart={iscart}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/rxdetail/:id" exact render={props=>isAuthenticated?<RxDetails setIsAuthenticated={setIsAuthenticated} Id={Id} setiscart={setiscart} iscart={iscart}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/userrx/:id" exact render={props=>isAuthenticated?<YourRx setIsAuthenticated={setIsAuthenticated} Id={Id} setiscart={setiscart} iscart={iscart}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/orders/:id" exact render={props=>isAuthenticated?<Orders setIsAuthenticated={setIsAuthenticated} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/product/registered/:name/:id" exact render={props=>isAuthenticated?<Productreg setIsAuthenticated={setIsAuthenticated} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
     <Route path="/all_products" exact render={props=>!isAuthenticated?<All_products />:<Redirect to="/home"></Redirect>} ></Route> 
     <Route path="/product/unregistered/:name/:id" exact render={props=>!isAuthenticated?<Products />:<Redirect to="/home"></Redirect>} ></Route> 
     <Route path="/uploadrx/:id" exact render={props=>isAuthenticated?<Upload_Rx setIsAuthenticated={setIsAuthenticated} Id={Id}/>:<Redirect to="/"></Redirect>} ></Route>
      <Route component={Error}></Route>
      </Switch>
     
    </Layout>
    </Router>
   </Context>
  );
}

export default App;
