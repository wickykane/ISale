
import { API_ERROR, API_PENDING, API_SUCCESS, success, error, pending} from '../../status';
import { loginFunction } from './service';

export const ACTION_LOGIN = 'ACTIONLOGIN';
export const ACTION_CHANGE_FORM = 'ACTION_CHANGE_FORM';


function actionLogin(data) {
    login(data).then(res => {
        console.log(res);
    })
}

export function login() {
    return (dispatch, getState) => {
        console.log(dispatch, getState);
        return {
        type: ACTION_LOGIN,
    }
    }
    // console.log('1');
    // return {
    //     type: ACTION_LOGIN,
    // }
    // return (dispatch) => {
    //     dispatch(pending);
     
    // };
       
}

export function formDataChange(e) {
    let user  = {};
    user[e.target.name] = e.target.value;
    return {
        type: ACTION_CHANGE_FORM,
        user
    }
}