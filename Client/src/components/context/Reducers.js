export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((c) => c._id !== action.payload._id),
        };
      case "DECREMENT":
        return {
          ...state,
          cart: state.cart.filter((c) =>
            c === action.payload ? (c.qty = c.qty-1) : c.qty
          ),
        };
        case "INCREMENT":
        return {
          ...state,
          cart: state.cart.filter((c) =>
            c === action.payload ? (c.qty = c.qty+1) : c.qty
          ),
        };
      case "CLEAR_CART":
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  
  export const productReducer = (state, action) => {
    switch (action.type) {
      case "SORT_BY_PRICE":
        return { ...state, sort: action.payload };
      case "FILTER_BY_STOCK":
        return { ...state, isAvailable: !state.isAvailable };
      case "FILTER_BY_DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
      case "FILTER_BY_RATING":
        return { ...state, byRating: action.payload };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { isAvailable: false, byFastDelivery: false, byRating: 0 };
      default:
        return state;
    }
  };