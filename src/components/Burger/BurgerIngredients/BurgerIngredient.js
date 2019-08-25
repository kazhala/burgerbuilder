import React from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredient.css';

const BurgerIngredient = props => {
    let ingredient = null;
    switch (props.type) {
        case 'bottom-bread':
            ingredient = <div className="BreadBottom"></div>;
            break;
        case 'top-bread':
            ingredient = (
                <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
            );
            break;
        case 'meat':
            ingredient = <div className="Meat"></div>;
            break;
        case 'cheese':
            ingredient = <div className="Cheese"></div>;
            break;
        case 'salad':
            ingredient = <div className="Salad"></div>;
            break;
        case 'bacon':
            ingredient = <div className="Bacon"></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
}

BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;