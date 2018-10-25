import { fromJS } from 'immutable';
import { ACTION_LOGIN, ACTION_CHANGE_FORM } from './action';
import { API_STATUS } from '../../status'

export const initialState = fromJS({
    user: {
        email: null,
        password: null,
        ...API_STATUS,
    },
})

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_LOGIN:
            const { email, password } = state.get('user');
            return state;
        case ACTION_CHANGE_FORM:
            const user = action.user;
            return state.set('user', { ...state.get('user'), ...user });
        default:
            return state;
    }
}

export default reducer;