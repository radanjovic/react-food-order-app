import React from "react";
import CartContext from "../../context/cart-context";
import CartIcon from "../Cart/CartIcon";

import styles from './HeaderCartButton.module.css';

export default function HeaderCartButton(props) {
    const [btnAnim, setBtnAnim] = React.useState(false);
    const ctx = React.useContext(CartContext);

    const numberOfItems = ctx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${btnAnim ? styles.bump : ''}`;

    React.useEffect( () => {
        if (ctx.items.length === 0) {
            return;
        }
        setBtnAnim(true);
        const timer = setTimeout(() => {
            setBtnAnim(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [ctx.items])

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={styles.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfItems}</span>
        </button>
    )
}