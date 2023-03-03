import { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

// Cart Provider is used to update the initial values set in the cart-context. The updated values can be uesd further through the app. This Provdier can also be created in the app.jsx but to keep our app.jsx clean we are using it here. With the below cartContext object refers to the CartContext object.

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            {// create an new array and concat new item comes from addIntoCartHandler into this array and also update the total amount by multiply amount of item with total items
                const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount
                const existingItemCartIndex = state.items.findIndex(item => item.id === action.item.id)
                const existingCartItem = state.items[existingItemCartIndex]
                let updatedItems;
                if (existingCartItem) {
                    const updatedItem = {
                        ...existingCartItem,
                        amount: existingCartItem.amount + action.item.amount
                    }
                    updatedItems = [...state.items];
                    updatedItems[existingItemCartIndex] = updatedItem;
                } else {
                    updatedItems = state.items.concat(action.item)
                }

                return {
                    items: updatedItems,
                    totalAmount: updateTotalAmount
                }
            }
        case 'remove':
            {
                const existingItemCartIndex = state.items.findIndex(item => item.id === action.id);
                const existingCartItem = state.items[existingItemCartIndex];
                const updateTotalAmount = state.totalAmount - existingCartItem.price;

                let updatedItems;
                if (existingCartItem.amount === 1) {
                    updatedItems = state.items.filter(item => item.id !== action.id);
                } else {
                    const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
                    updatedItems = [...state.items];
                    updatedItems[existingItemCartIndex] = updatedItem;
                }

                return {
                    items: updatedItems,
                    totalAmount: updateTotalAmount
                }
            }
        case 'clear':
            return defaultCartState;
        default:
            return defaultCartState;
    }
}

// Main Component
const CartProvider = (props) => {

    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

    const addIntoCartHandler = (item) => {
        console.log(item)
        dispatch({ type: 'add', item: item })
    }

    const removeFromCartHandler = (id) => {
        dispatch({ type: 'remove', id: id })
    }

    const clearCartHandler = () => {
        dispatch({ type: 'clear' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addIntoCartHandler,
        removeItem: removeFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider