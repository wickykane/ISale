import { createSelector } from 'reselect';
import { initialState } from './reducer';

const parentState = state => state.get('login', initialState);
const makeSelectUser = () => createSelector(parentState, state => state.get('user'));
export { makeSelectUser }