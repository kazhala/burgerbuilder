import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "salad", type: "salad" },
    { label: "meat", type: "meat" },
    { label: "cheese", type: "cheese" },
    { label: "bacon", type: "bacon" },

]


const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    type={control.type}
                    ingredientAdded={() => props.ingredientAdded(control.type)}
                    ingredientRemoved={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]} />
            ))}
            <button className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP'}</button>
        </div>
    )
}

export default BuildControls;