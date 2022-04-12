import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items: [], 
    totalAmount: 0
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
            const existingCartItemIndex = state.items.findIndex( item => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }
            return {items: updatedItems, totalAmount: updatedAmount}
        case 'REMOVE':
            const existingCartItemIndex2 = state.items.findIndex(item => item.id === action.id);
            const existingCartItem2 = state.items[existingCartItemIndex2];
            const updatedTotalAmount2 = state.totalAmount - existingCartItem2.price;
            let updatedItems2;
            if (existingCartItem2.amount === 1) {
                updatedItems2 = state.items.filter( item => item.id !== action.id);
            } else {
                const updatedItem2 = {...existingCartItem2, amount: existingCartItem2.amount - 1};
                updatedItems2 = [...state.items];
                updatedItems2[existingCartItemIndex2] = updatedItem2;
            }
            return {
                items: updatedItems2, 
                totalAmount: updatedTotalAmount2
            }
        case 'CLEAR':
            return defaultCartState
        default: throw new Error();
    }
}

export default function CartProvider(props) {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    function addItem(item) {
        dispatchCart({
            type: 'ADD',
            item: item
        });
    }

    function removeItem(id) {
        dispatchCart({
            type: 'REMOVE',
            id: id
        });
    }

    function clearCart() {
        dispatchCart({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem, 
        removeItem,
        clearCart
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}