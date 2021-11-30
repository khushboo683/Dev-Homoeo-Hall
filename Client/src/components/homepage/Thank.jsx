import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/thanks.css'
import { CartState } from "../context/Context";
function Thank({Id}) {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  
  console.log(cart);
  useEffect(() => {
    dispatch({
      type: "CLEAR_CART",
      payload: cart,
    })
    fetch(`https://devhomoeoback.herokuapp.com/user/${Id}/cart/clearCart`, {
      method: 'PUT',
     
  });
    
  }, [])
    return (
      
      <div className="backmai">
      <div className="content">
      
  <div className="wrapper-1">
    <div className="wrapper-2">
      <h1>Order Confirmed !</h1>
      <p>Thank you for shopping with us !!  </p>
      <p>Your order will be delivered soon.  </p>
      <p>We will contact you shortly.  </p>
      <Link to={"/home"} className="link">
      <button className="go-home">
      go home
      </button>
      </Link>
    </div>

    <div className="footer-like">
    <Link to={"/orders/"+Id} className="link">
      <p>
     Click here to see your order status.
      </p>
      </Link>
    </div>
</div>
</div>



    </div>
      
    );
  }

export default Thank