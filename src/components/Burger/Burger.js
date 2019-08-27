import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import './Burger.css';

const Burger = props => {
    let transformedIngredient = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log(transformedIngredient);
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>plz enter</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="top-bread" />
            {transformedIngredient}
            <BurgerIngredient type="bottom-bread" />


        </div>
    );
}

export default Burger;