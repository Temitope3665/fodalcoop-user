import axios from 'axios';
import { getToken } from './actions';
import { DASHBOARD_HOME_URL, LOGIN_URL } from '@/config/paths';
import { toast } from 'sonner';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 36000,
});

// Add a request interceptor
client.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const response = await getToken();
    const token = response?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error?.response && error?.response?.status === 403) {
      window.location.replace(DASHBOARD_HOME_URL);
      toast.error(error?.response?.data?.message);
    }

    if (
      error?.response &&
      error?.response?.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      // Call refresh token
      try {
        window.location.replace(LOGIN_URL);

        return client(originalConfig);
      } catch (_error: any) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }

    if (error?.response?.status === 500) {
      error.response.data.message = 'Something went wrong, Please try again!';
    }
    return Promise.reject(error);
  }
);

export default client;
