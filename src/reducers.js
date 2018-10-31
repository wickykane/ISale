import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';

const initRouteState = fromJS({
    location: null
});

export function routeReducer(state = initRouteState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
        default:
            return state;
    }
}

export default function initReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        form: formReducer,
        ...injectedReducers,
    })
}