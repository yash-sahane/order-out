import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon.jsx'
import CartContext from '../store/cart-context.js';
import classes from './headerCardButton.module.css';

const HeaderCardButton = ({ cartHandler }) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const items = cartCtx.items;
    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`

    // items = [{name : sushi, amount: 2}, {name : mashroom, amount: 1}]
    // we might can also use cartCtx.items.length and our data looke like above then the ans will be 2 but actually there are 3 items in the cart if we consider amount.
    // so instead of length we are using reduce method which helps to get the curr item and add the amount it into numberOfCartItems
    const numberOfCartItems = items.reduce((accumulator, curr) => {
        return accumulator + curr.amount
    }, 0)

    useEffect(() => {

        if (items.length === 0) return;

        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={cartHandler}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Card</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button >
    )
}

export default HeaderCardButton