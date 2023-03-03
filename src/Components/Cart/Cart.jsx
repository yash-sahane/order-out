import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './cart.module.css';

const Cart = ({ disableCart }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const amount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartHandler = () => {
        disableCart();
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://react-meals-49df2-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userInfo: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
        console.log(response.status);
    }

    const cartModalContent = <>
        <div>
            <ul className={classes['cart-items']}>
                {cartCtx.items.map(item => {
                    return (
                        <CartItem
                            key={item.id}
                            item={item}
                            onAdd={cartItemAddHandler}
                            onRemove={cartItemRemoveHandler}
                        />
                    )
                })}
            </ul>
        </div>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{amount}</span>
        </div>
        <div>{isCheckout && <Checkout onCancel={cartHandler} onConfirm={submitOrderHandler} />}</div>
        <div className={classes.actions}>
            <button className={classes['btn--alt']} onClick={cartHandler}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    </>

    const isSubmittingContent = <p>Sending your Orders...!</p>

    const didSubmitContent =
        <>
            <p>Your order has been placed successfully !</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={cartHandler}>Close</button>
            </div>
        </>

    return (
        <Modal disableCart={disableCart} >
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {didSubmit && !isSubmitting && didSubmitContent}
        </Modal>
    )
}

export default Cart