import axios, { AxiosResponse } from 'axios';

const baseUrl: string | undefined = 'http://193.106.55.127:5000/api';

const getUser = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const requestedUser: AxiosResponse<any> = await axios.get(`${baseUrl}/users/${userId}`);
    return requestedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async (email: string, password: string): Promise<AxiosResponse<AuthData>> => {
  try {
    let data = { username: email, password };

    const response: AxiosResponse<any> = await axios.post(`${baseUrl}/users/login`, data);

    return response;
  } catch (error) {
    console.log(`error in signIn authService, ${error}`);

    throw new Error(error);
  }
};
export type AuthData = {
  token: string;
  // expiration: Date;
  userId: string;
};

export const authService = {
  signIn,
  getUser,
};
