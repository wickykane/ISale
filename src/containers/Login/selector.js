import { createSelector } from 'reselect';
import { initialState } from './reducer';

const user = state => state.get('login', initialState);
const makeSelectUser = () => createSelector(user, state => state.get('user'));
export { makeSelectUser }