import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it taste well!</h1>
        <div className={classes.Burger}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continue}>CONFIRM</Button>

    </div>
)

export default CheckoutSummary;