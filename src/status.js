export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const API_PENDING = 'API_PENDING';

export function pending() {
    return {
        type: API_PENDING,
    }
}

export function success() {
    return {
        type: API_SUCCESS,
    }
}

export function error() {
    return {
        type: API_ERROR,
    }
}

export const API_STATUS = {
    pending: false,
    success: false,
    error: false,
}