import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    });
    it('should store the token', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'random',
                userId: 'random'
            })).toEqual({
                token: 'random',
                userId: 'random',
                error: null,
                loading: false,
                authRedirectPath: '/',
            })
    });
})
