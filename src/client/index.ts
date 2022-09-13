import { cookies } from '@utils';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    const token = cookies.get('token');
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
