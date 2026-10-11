import React from 'react'

function cartReducer(state, { type, payload }) {

  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, payload]
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item?.product?.id !== payload?.id)
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [] 
      };
    default:
      return state
  }
}

export default cartReducer

