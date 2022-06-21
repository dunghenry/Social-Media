import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:4000' });
export const refreshToken = async () => {
    try {
        const response = await API.post('/auth/refresh');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
