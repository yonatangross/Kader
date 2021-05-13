import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const kaderApi = axios.create({ baseURL: 'http://kader.cs.colman.ac.il:5000/api' });

kaderApi.interceptors.request.use(
  async function (config) {
    console.log('entered interceptor');

    const token = await SecureStore.getItemAsync('jwt_token');
    if (token !== null) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(`added valid token`);
    } else console.log('TOKEN IS NULL');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

kaderApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const serverCallUrl = new URL(originalRequest.url);
    const status = error.response.status;
    console.log('response returned with error:');

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      console.log(error);
      console.log(originalRequest);
      console.log(serverCallUrl);
      const token = await SecureStore.getItemAsync('jwt_token');

      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token}`;
      return kaderApi(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default kaderApi;
