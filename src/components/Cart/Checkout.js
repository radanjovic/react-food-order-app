import styles from './Checkout.module.css';
import { useRef, useState } from 'react';

function isEmpty(value) {
    return value.trim() === '';
}

function isFiveChars(value) {
    return value.trim().length === 5;
}

export default function Checkout (props) {
    const [inputValidity, setInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postal = postalRef.current.value;
        const city = cityRef.current.value;

        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const cityIsValid = !isEmpty(city);
        const postalIsValid = isFiveChars(postal);

        setInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid,
        })

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        if (!formIsValid) {
            return;
        }

        // Submiting via props - in cart:
        props.onConfirm({
            name,
            street,
            city,
            postal
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.control} ${inputValidity.name ? '' : styles.invalid}`}>
                <label htmlFor="name">Name:</label>
                <input type='text' id='name' ref={nameRef} />
                {!inputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${inputValidity.street ? '' : styles.invalid}`}>
                <label htmlFor="street">Street:</label>
                <input type='text' id='street' ref={streetRef} />
                {!inputValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${inputValidity.postal ? '' : styles.invalid}`}>
                <label htmlFor="postal">Postal Code:</label>
                <input type='text' id='postal' ref={postalRef} />
                {!inputValidity.postal && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={`${styles.control} ${inputValidity.city ? '' : styles.invalid}`}>
                <label htmlFor="city">City:</label>
                <input type='text' id='city' ref={cityRef} />
                {!inputValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit" className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
}