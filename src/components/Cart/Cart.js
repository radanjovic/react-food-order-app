import React from "react";
import Modal from "../UI/Modal";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import styles from './Cart.module.css';

export default function Cart(props) {
    const [isCheckout, setIsCheckout] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [didSubmit, setDidSubmit] = React.useState(false);

    const ctx = React.useContext(CartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    function cartItemRemoveHandler(id) {
        ctx.removeItem(id);
    }

    function cartItemAddHandler(item) {
        ctx.addItem({...item, amount: 1});
    }

    function handleOrder() {
        setIsCheckout(true);
    }

    async function submitOrder(userData) {
        setIsSubmitting(true);
        await fetch(process.env.FIREBASE, {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: ctx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();
    }

    const cartItems = <ul className={styles['cart-items']}>
    {ctx.items.map(item => <CartItem key={item.id} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} name={item.name} amount={item.amount} price={item.price} />)}</ul>

    const modalContent = <>{cartItems}
    <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrder} onCancel={props.onHideCart} />}
    {!isCheckout && <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={styles.button} onClick={handleOrder}>Order</button>}
    </div>}</>;

    const submittingModalContent = <p>Sending order data...</p>;

    const submittedModalContent = <>
        <p>Successfully sent the order!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>Close</button>
        </div>
    </>

    return (
        <Modal onHideCart={props.onHideCart} >
            {!isSubmitting && !didSubmit && modalContent}
            {isSubmitting && submittingModalContent}
            {!isSubmitting && didSubmit && submittedModalContent}
        </Modal>
    )
}