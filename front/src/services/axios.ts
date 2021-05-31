import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
export const baseUrl = 'http://kader.cs.colman.ac.il:5000/api';
export const imageBaseUrl = 'http://kader.cs.colman.ac.il';

const kaderApi = axios.create({ baseURL: baseUrl });
const kaderPhotoUploadApi = axios.create({ baseURL: baseUrl });

kaderApi.interceptors.request.use(
  async function (config) {
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token !== null) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    } else console.log('TOKEN IS NULL');
    return config;
  },
  function (error) {
    console.log('request returned with error from kaderApi:');

    return Promise.reject(error.response);
  }
);

kaderPhotoUploadApi.interceptors.request.use(
  async function (config) {
    // console.log('entered interceptor');
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token !== null) {
      config.headers = {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
    } else console.log('TOKEN IS NULL');
    return config;
  },
  async function (error) {
    console.log('request returned with error from kaderUploadPhotoApi:');

    return Promise.reject(error.response);
  }
);

kaderApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log('response returned with error from kaderApi:');
    console.log(error);
    return Promise.reject(error.response);
  }
);

kaderPhotoUploadApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log('response returned with error from kaderUploadPhotoApi:');

    return Promise.reject(error.response);
  }
);

export { kaderPhotoUploadApi };
export default kaderApi;
