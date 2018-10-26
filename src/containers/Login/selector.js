import { createSelector } from 'reselect';
import { initialState } from './reducer';

const parentState = state => state.get('login', initialState);
const makeSelectUser = () => createSelector(parentState, state => state.get('user'));
const makeSelectStatus = () => createSelector(parentState, state => { return { error: state.get('error'), success: state.get('success'), pending: state.get('pending') } });

export { makeSelectUser, makeSelectStatus }