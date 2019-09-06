import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logOut = () => {
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationTime');
    //localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITLOGOUT,
    }
}

export const logOutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime,
    };
}

export const auth = (email, password, isSignup) => {
    /*return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABcEZyDdGnIXYioIuO3zIMUyYQUZfjSXg';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABcEZyDdGnIXYioIuO3zIMUyYQUZfjSXg';
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationData);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                //console.log(error);
                dispatch(authFailed(error.response.data.error));
            })
    }*/
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                //console.log((expirationTime.getTime() - new Date().getTime()) / 1000);
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logOut());
            }
        }
    }
}