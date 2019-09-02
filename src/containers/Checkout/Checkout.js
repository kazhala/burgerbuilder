import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        },
        totalPrice: 0,
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            }
            if (param[0] !== 'price') {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }

    cancelHandler = () => {
        this.props.history.push('/');
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.cancelHandler}
                    continue={this.continueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} render={() => {
                    return <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
                }} />
            </React.Fragment>
        )
    }
}

export default Checkout;