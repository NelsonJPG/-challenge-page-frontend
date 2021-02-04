import axios from 'axios';

import swal from 'sweetalert'
import { config } from '../config';

/**
 * Service to kill the session and remove the token 
 * from the server
 * @param {*} history 
 */
export const killSession = async history => {
    
    const response = await axios.get(`${config.apiURL}/auth/logout`, {
        headers: {authorization: JSON.parse(localStorage.getItem('user')).token}
    })

    console.log("respinse", response)
    /*
    if(data.statusCode === 401 || data.statusCode === 200) {
        localStorage.removeItem('user');
        swal('Logout successfully', 'success');
        history.push('/');
    }*/
}