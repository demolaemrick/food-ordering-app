import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton: React.FC<{click: () => void}>= (props) => {
  const [ btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCxt = useContext(CartContext);

  const numberofCartItems = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`

  const { items } = cartCxt

  useEffect(() => {
    if(items.length === 0){
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() =>{
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])
  

  return (
    <button className={btnClasses} onClick={props.click}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberofCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
