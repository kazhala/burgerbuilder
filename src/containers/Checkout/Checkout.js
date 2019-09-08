import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {


    const cancelHandler = () => {
        props.history.push('/');
    }

    const continueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let burger = <Redirect to='/' />;
    if (props.ings) {
        const purchasedRedirect = props.redirect ? <Redirect to="/" /> : null;
        burger = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    cancel={cancelHandler}
                    continue={continueHandler}
                />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
    return (
        <React.Fragment>
            {burger}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        redirect: state.order.purchased,
    }
}



export default connect(mapStateToProps)(Checkout);