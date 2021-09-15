import axios from 'axios';
import Router from 'next/router';

import { destroyCookie } from 'nookies'

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

// api.interceptors.response.use(undefined, err => {
//     if (err?.response?.status === 401 || err?.response?.status === 403) {
//         destroyCookie({}, 'authority.token', {
//             path: '/'
//         });
//         Router.push('/');
//     }
//     return Promise.reject(err);
// })

export default api;