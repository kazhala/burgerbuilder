import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}


class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            //console.log(response);
            this.setState({
                ingredients: response.data
            });
        }).catch(error => {
            this.setState({
                error: true,
            })
        });
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
        /*
        
        */
        const queryParam = [];
        for (let i in this.state.ingredients) {
            queryParam.push(encodeURI(i) + '=' + encodeURI(this.state.ingredients[i]));
        }
        //console.log(queryParam);
        queryParam.push('price=' + this.state.totalPrice.toFixed(2));
        const queryString = queryParam.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfor = {
            ...this.state.ingredients,
        }
        for (let key in disabledInfor) {
            disabledInfor[key] = disabledInfor[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.cancelPurchase}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);