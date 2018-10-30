export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const API_PENDING = 'API_PENDING';
export const API_RESET = 'API_RESET';


export function pending() {
    return {
        type: API_PENDING,
    }
}

export function success(message) {
    return {
        type: API_SUCCESS,
        success: message,
    }
}

export function error(message) {
    return {
        type: API_ERROR,
        error: message,
    }
}

export function reset() {
    return {
        type: API_RESET,
    }
}

export const API_STATUS = {
    pending: false,
    success: false,
    error: false,
}