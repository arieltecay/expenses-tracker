import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

//get the token
const token = getUserFromStorage();

//login
export const loginAPI = async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });
    //Return a promise
    return response.data;
};

//register
export const registerAPI = async ({ email, password, username }) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        email,
        password,
        username,
    });
    //Return a promise
    return response.data;
}

//change password
export const changePasswordAPI = async (newPassword) => {
    const response = await axios.put(`${BASE_URL}/users/change-password`, {
        newPassword,
    }, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    //Return a promise
    return response.data;
}

//update user profile
export const updateUserProfileAPI = async ({ username, email }) => {
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
        username,
        email,
    }, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    //Return a promise
    return response.data;
}
