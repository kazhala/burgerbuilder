import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.totalPrice);
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
            setTimeout(() => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            }, 1000);
        }).catch(error => {
            console.log(error);
            this.setState({
                loading: false,
                purchasing: false
            })
        });
    }


    render() {
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {spinner}
                <h4>Enter your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your address" />
                    <input className={classes.Input} type="text" name="postcode" placeholder="Your postcode" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;