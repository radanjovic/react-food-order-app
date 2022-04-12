import React from 'react';
import styles from './Header.module.css';
import mealsImage from '../../media/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

export default function Header(props) {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="A table full of food" />
            </div>
        </React.Fragment>
    );
}