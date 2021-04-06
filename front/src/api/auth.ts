import axios, { AxiosResponse } from 'axios';

const baseUrl: string | undefined = 'http://193.106.55.127:5000/api';

export const getUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedUser: AxiosResponse<any> = await axios.get(`${baseUrl}/users/${userId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    console.log(data);

    const response: AxiosResponse<any> = await axios.post(`${baseUrl}/users/login`, data);
    console.log(`response.headers: `);
    console.log(response.headers);
    console.log(response.data);

    return response;
  } catch (error) {
    console.log(`blal`);

    throw new Error(error);
  }
};
