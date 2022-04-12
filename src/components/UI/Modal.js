import React from "react";
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

function Backdrop(props) {
    return <div onClick={props.onHideCart} className={styles.backdrop}></div>
}

function Overlay(props) {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portal = document.getElementById('overlays');

export default function Modal(props) {
    return (
        <>
           {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portal)}
           {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portal)}
        </>
    )
}