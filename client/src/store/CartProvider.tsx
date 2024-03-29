import React, { useReducer } from "react";

import CartContext, { iCartContext } from "./cart-context";
import Item from "../model/Item";

interface iDefaultCartState {
  items: Item[];
  totalAmount: number;
}
const defaultCartState: iDefaultCartState = {
  items: [],
  totalAmount: 0.0,
};

type ACTIONTYPE = { type: "ADD"; item: Item } | { type: "REMOVE"; id: string };

const cartReducer = (state: typeof defaultCartState, action: ACTIONTYPE) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //get the index of a particular element
    const existingItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.item.id
    );

    //returns the element based on the index if it exists else it returns null
    const existingItem: Item = state.items[existingItemIndex];

    let updatedItems: Item[];
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      //keep a copy of old array of items
      updatedItems = [...state.items];

      //update only the item of that particular id
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item: Item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext: iCartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
