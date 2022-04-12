import React from "react";
import Input from "../../UI/Input";

import styles from './MealItemForm.module.css';

export default function MealItemForm(props){
    const [amountIsValid, setAmountIsValid] = React.useState(true);

    const amountInputRef = React.useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button type="submit">+Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}