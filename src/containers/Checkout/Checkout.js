import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        let burger = <Redirect to='/' />;
        if (this.props.ings) {
            burger = (<CheckoutSummary
                ingredients={this.props.ings}
                cancel={this.cancelHandler}
                continue={this.continueHandler}
            />);
        }
        return (
            <React.Fragment>
                {burger}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);