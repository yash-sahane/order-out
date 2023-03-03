import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './mealItemForm.module.css'

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const inputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        let enteredInputValue = inputRef.current.value;
        enteredInputValue = +enteredInputValue; // change to integer

        if (enteredInputValue <= 0 || enteredInputValue > 5) {
            setAmountIsValid(false);
            return;
        }

        console.log(enteredInputValue);
        props.onAddToCart(enteredInputValue);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' ref={inputRef} input={
                {
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }
            } />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount from (0 - 5)</p>}
        </form>
    )
}

export default MealItemForm