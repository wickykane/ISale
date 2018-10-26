import { API_ERROR, API_PENDING, API_SUCCESS, success, error, pending } from '../../status';
import { push } from 'react-router-redux';
import { loginFunction } from './service';
import { makeSelectUser } from './selector';

export const ACTION_LOGIN = 'ACTIONLOGIN';
export const ACTION_CHANGE_FORM = 'ACTION_CHANGE_FORM';

export function login() {
    return async(dispatch, getState) => {
        dispatch(pending());
        const { email, password } = makeSelectUser()(getState());
        try {
            const user = await loginFunction({ username: email, password });
            
            const token = user.data.data.token;
            if(token) {
                localStorage.setItem('app_token', token);
                dispatch(success());
                dispatch(push('/'));
            }
        } catch (err) {
            dispatch(error(err.response.data.message))
        }
    }
}

export function formDataChange(e) {
    let user = {};
    user[e.target.name] = e.target.value;
    return {
        type: ACTION_CHANGE_FORM,
        user
    }
}