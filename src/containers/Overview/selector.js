import { createSelector } from 'reselect';
import { initialState } from './reducer';

const user = state => state.get('home', initialState);
const makeSelectUser = () => createSelector(user, state => state.get('user'));
export { makeSelectUser }