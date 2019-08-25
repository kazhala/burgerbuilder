import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import './Burger.css';

const Burger = props => {
    return (
        <div className="Burger">
            <BurgerIngredient type="top-bread" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="bacon" />
            <BurgerIngredient type="bottom-bread" />


        </div>
    );
}

export default Burger;