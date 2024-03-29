import React, { useState, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";



const MealItemForm: React.FC<{ onAddToCart: (amount: number) => void; id: string}>= (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount;


    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber); 
;
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        inputElement={{
          label: "Amount",
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
