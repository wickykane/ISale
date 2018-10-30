import { success, error, pending } from '../../status';
import { push } from 'react-router-redux';
import { getListPrescription } from './service';
import { makeSelectPageData } from './selector';

export const ACTION_PAGE_DATA = 'ACTION_PAGE_DATA';
export const ACTION_CHANGE_FORM = 'ACTION_CHANGE_FORM';

export function fnListPrescription() {
    return async(dispatch, getState) => {
        dispatch(pending());
        try {
            const data = await getListPrescription();
            dispatch({
                type: ACTION_PAGE_DATA,
                payload: {
                    key: 'list',
                    data: [{ id: 1, code: 1, name: 'this is us' }]
                }
            });
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