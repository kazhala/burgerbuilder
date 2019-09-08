import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = props => {

    const [purchasingState, setPurchasingState] = useState(false);
    const { ings, purchased, onInitIngredients } = props;

    useEffect(() => {
        if (ings === null || purchased) {
            onInitIngredients();
        }
    }, [ings, purchased, onInitIngredients]);

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasingState(true);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const cancelPurchase = () => {
        setPurchasingState(false);
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, num) => {
            return sum + num;
        }, 0);
        return sum > 0;
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfor = {
        ...ings,
    }
    for (var key in disabledInfor) {
        disabledInfor[key] = disabledInfor[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfor}
                    purchaseable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={props.price}
                    isAuth={props.isAuthenticated} />
            </Aux>
        );
        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                purchaseCanceled={cancelPurchase}
                purchaseContinued={purchaseContinueHandler}
                price={props.price}
            />
        );
    }
    /*
    if (this.state.loading) {
        orderSummary = <Spinner />
    } */
    return (
        <Aux>
            <Modal show={purchasingState} modalClosed={cancelPurchase}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));