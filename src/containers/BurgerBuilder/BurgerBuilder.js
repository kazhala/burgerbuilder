import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';


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
        purchasing: false
    }


    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }

    cancelPurchase = () => {
        this.setState({
            purchasing: false,
        })
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

    purchaseContinueHandler = () => {
        //alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kevin',
                address: {
                    street: 'lol 1',
                    zipCode: 124124,
                    country: 'Australia'
                },
                email: 'test@test.com',
            },
            speed: 'fast'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
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
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.cancelPurchase}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfor}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>

        );
    }
}

export default BurgerBuilder;