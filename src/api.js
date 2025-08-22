import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use((config) => {
    const t = import.meta.env.VITE_DEV_TOKEN;
    if (t) config.headers.Authorization = `Token ${t}`;
    return config;
});

export default api;