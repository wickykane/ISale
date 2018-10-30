import { createSelector } from 'reselect';
import { initialState } from './reducer';

const prescription = state => state.get('prescription', initialState);
const makeSelectPageData = () => createSelector(prescription, state => state.get('page_data'));
export { makeSelectPageData }