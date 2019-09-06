import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* initIngredientSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientFailed());
    }
}
