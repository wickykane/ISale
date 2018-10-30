import { fromJS } from 'immutable';
import { ACTION_PAGE_DATA, ACTION_CHANGE_FORM } from './action';
import { API_STATUS, API_SUCCESS, API_ERROR, API_PENDING, API_RESET } from '../../status'



export const initialState = fromJS({
    page_data: {},
    search_data: {},
    ...API_STATUS,
})

function reducer(state = initialState, action) {
    switch (action.type) {
        case API_RESET:
            return state.set('error', false)
                .set('pending', false)
                .set('success', false)
        case API_ERROR:
            return state.set('error', action.error)
                .set('pending', false)
                .set('success', false)
        case API_PENDING:
            return state.set('error', false)
                .set('success', false)
                .set('pending', true);
        case API_SUCCESS:
            return state.set('error', false)
                .set('pending', false)
                .set('success', action.success);
        case ACTION_PAGE_DATA:
            const { key, data} = action.payload;
            const newVal = {...state.get('page_data') };
            newVal[key] = data; 
            return state.set('page_data', newVal);
        case ACTION_CHANGE_FORM:
            const user = action.user;
            return state.set('user', {...state.get('user'), ...user });
        default:
            return state;
    }
}

export default reducer;