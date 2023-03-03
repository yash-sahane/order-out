import React, { useContext } from 'react'
import CartContext from '../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './mealItem.module.css'

const MealItem = ({ meal }) => {
    console.log(meal.price);
    const { name, description, price, id } = meal;

    const mealPrice = `$${price.toFixed(2)}`;

    const cartCtx = useContext(CartContext)

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{mealPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem