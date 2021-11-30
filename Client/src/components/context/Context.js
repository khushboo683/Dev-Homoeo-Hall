import { createContext, useContext, useReducer, useState, useEffect } from "react";
import axios from 'axios'
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();


const Context = ({ children,Id,prod,allprd,cartprd }) => {
  console.log(Id);
  
  
  console.log(cartprd);
  // const cartproducts = cartprd.map((prod) => ({
  //   id: prod._id,
    
  // }));
  
  const [state, dispatch] = useReducer(cartReducer, {
    products: allprd,
    cart: cartprd,
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    isAvailable: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);
  
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;