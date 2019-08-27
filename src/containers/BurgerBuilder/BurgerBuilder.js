import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}


class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients,
        };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, num) => {
            return sum + num;
        }, 0);
        this.setState({
            purchaseable: sum > 0,
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const price = INGREDIENT_PRICES[type];
        const oldpirce = this.state.totalPrice;
        const newprice = oldpirce + price;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newprice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 1) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const price = INGREDIENT_PRICES[type];
        const oldpirce = this.state.totalPrice;
        const newprice = oldpirce - price;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newprice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfor = {
            ...this.state.ingredients,
        }
        for (let key in disabledInfor) {
            disabledInfor[key] = disabledInfor[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfor}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice} />
            </Aux>

        );
    }
}

export default BurgerBuilder;