import React from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../context/cart-context";

import styles from './MealItem.module.css';

export default function MealItem(props) {
    const ctx = React.useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    function addToCartHandler(amount) {
        ctx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }

    return <li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
        </div>
    </li>
}