import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controlsState, setControlsState] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignupState, setIsSignupState] = useState(true);
    const { ingredients, buildingBurger, onSetRedirectPath } = props;

    useEffect(() => {
        let sum = 0;
        for (var ingredient in ingredients) {
            sum = sum + ingredients[ingredient];
        }
        if (!buildingBurger || sum === 0) {
            onSetRedirectPath('/');
        }
    }, [ingredients, buildingBurger, onSetRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controlsState,
            [controlName]: {
                ...controlsState[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controlsState[controlName].validation),
                touched: true
            }
        }
        setControlsState(updatedControls);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAuth(controlsState.email.value, controlsState.password.value, isSignupState);
    }

    const switchAuthModeHandler = () => {
        setIsSignupState(!isSignupState);
    }

    const formElementArray = [];
    for (var key in controlsState) {
        formElementArray.push({
            id: key,
            config: controlsState[key]
        });
    }
    let form = <Spinner />;
    if (!props.loading) {
        form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => inputChangedHandler(e, formElement.id)}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
            />
        ))
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    return (
        <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={handleSubmit}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            {props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : null}
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignupState ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        ingredients: state.burgerBuilder.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);