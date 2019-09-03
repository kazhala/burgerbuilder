import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {

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
                    ingredients={this.props.ings}
                    cancel={this.cancelHandler}
                    continue={this.continueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);