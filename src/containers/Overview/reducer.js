import { fromJS } from 'immutable';

export const initialState = fromJS({
    user: '12312',
})

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGEUSER':
            return state.set('user', action.user);
        default:
            return state;
    }
}

export default reducer;