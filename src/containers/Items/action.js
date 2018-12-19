import { success, error, pending } from '../../status';
import { push } from 'react-router-redux';
import { getListPrescription } from './service';
import { makeSelectPageData } from './selector';

export const ACTION_PAGE_DATA = 'ACTION_PAGE_DATA';
export const ACTION_CHANGE_FORM = 'ACTION_CHANGE_FORM';

export function actionPageData(key, data) {
    return {
        type: ACTION_PAGE_DATA,
        payload: {
            key,
            data
        }
    }
}

export function fnListPrescription() {
    return async(dispatch, getState) => {
        dispatch(pending());
        try {
            const data = [{ id: 1, code: 1, name: 'this is us' }] || await getListPrescription();
            dispatch(actionPageData('list', data));
            dispatch(success());
        } catch (err) {
            dispatch(error(err.response.data.message))
        }
    }
}