import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

//get the token
const token = getUserFromStorage();
//add category
export const addCategoryAPI = async ({ name, type }) => {
    const response = await axios.post(`${BASE_URL}/category/create`, { name, type }, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });

    return response.data;
};
//list all categories
export const listCategoryAPI = async () => {
    const response = await axios.get(`${BASE_URL}/category/lists`, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
};

//delete category
export const deleteCategoryAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
};

//update category
export const updateCategoryAPI = async ({ id, name, type }) => {
    const response = await axios.put(`${BASE_URL}/category/update/${id}`, { name, type }, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
};
