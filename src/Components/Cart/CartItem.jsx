import React from 'react'
import classes from './cartItem.module.css'

const CartItem = (props) => {
    const { name, amount, id } = props.item
    const price = `$${props.item.price.toFixed(2)}`

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {amount}</span>
                </div>
            </div>
            <div className={classes.action}>
                <button onClick={() => props.onRemove(id)}>-</button>
                <button onClick={() => props.onAdd(props.item)}>+</button>
            </div>
        </li>
    )
}

export default CartItem