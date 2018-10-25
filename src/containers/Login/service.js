import axios from 'axios';
import { ENV } from '../../env'

function loginFunction(params) {
    const url = ENV.api_common + 'login';
    return axios.post(url, params);
}

export { loginFunction}