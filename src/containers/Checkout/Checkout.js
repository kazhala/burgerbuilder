import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Checkout extends React.Component {


    cancelHandler = () => {
        this.props.history.push('/');
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let burger = <Redirect to='/' />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.redirect ? <Redirect to="/" /> : null;
            burger = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancel={this.cancelHandler}
                        continue={this.continueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return (
            <React.Fragment>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        redirect: state.order.purchased,
    }
}



export default connect(mapStateToProps)(Checkout);