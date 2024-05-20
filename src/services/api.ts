import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const fetchProgress = async () => {
    const response = await api.get('/progress');
    return response.data;
};

export const addProgress = async (progress: { user_id: number; date: string; value: number; }) => {
    const response = await api.post('/progress', progress);
    return response.data;
};

export const fetchProgressByUserId = async (userId: number) => {
    const response = await api.get(`/progress/${userId}`);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};
