import axios from 'axios';
import { Message, APIResponse, Plant, User, LoginResponse } from '../types/types';
import { Platform } from 'react-native';

//TODO: Besa replaces android IP with his actual IP
const BASE_API_URL = Platform.select({
  ios: 'http://localhost:81/api',
  android: 'http://XX.X.X.X:3000/api',
});

// ================== HTTP Helper Functions ==================== //

async function getFromAPI<T>(endpoint: string): Promise<APIResponse<T>> {
  try {
      // Fetch the data from the API.
      const response = await axios.get<T>(endpoint);

      // Return the data as part of the response.
      return { data: response.data };
  } catch (error: any) {
      // If there was an error, return it as part of the response.
      // TODO: Maybe unique error messages per HTTP response code
      return { error: error.message };
  }
}

async function postToAPI<T, U>(endpoint: string, payload: U): Promise<APIResponse<T>> {
  try {
    // Send a POST request to the API.
    const response = await axios.post<T>(endpoint, payload);

    // Return the data as part of the response.
    return { data: response.data };
  } catch (error: any) {
    // If there was an error, return it as part of the response.
    return { error: error.message };
  }
}

async function putToAPI<T, U>(endpoint: string, payload: U): Promise<APIResponse<T>> {
  try {
    // Send a PUT request to the API.
    const response = await axios.put<T>(endpoint, payload);

    // Return the data as part of the response.
    return { data: response.data };
  } catch (error: any) {
      // If there was an error, return it as part of the response.
      return { error: error.message };
  }
}

// ============== Basic API Functions ================ //

async function fetchAllPlants(): Promise<APIResponse<Plant[]>> {
  try {
    const plantData = await getFromAPI<Plant[]>(`${BASE_API_URL}/plants`);
    return plantData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getMe(): Promise<APIResponse<User, string>> {
  // TODO: convert the axios.get call to using getFromAPI() found in this file
  console.log("GETME")
  try {
    const res = await axios.get(`${BASE_API_URL}/users/me`, { withCredentials: true });
    return res.data;
  } catch (error: any) {
    throw error;
  } 
}

async function userLogout(): Promise<Message> {
  try {
    const response = await postToAPI(`${BASE_API_URL}/users/logout`, {});
    return { msg: response.data as string}
  } catch (error: any) {
    throw error;
  }
}

async function registerUser(username: string, password: string): Promise<APIResponse<Message>> {
   try {
    const payload = {
      username,
      password
    }
    const response = await postToAPI(`${BASE_API_URL}/users/register`, payload);
    return { data: response.data as Message};
   } catch (error: any) {
    return {error: error.response?.data?.msg || error.message }
   }

}

async function userLogin(username: string, password: string): Promise<APIResponse<LoginResponse>> {
  try {
    const payload = {
      username,
      password
    }
    const response = await postToAPI(`${BASE_API_URL}/users/login`, payload);
    return { data: response.data as LoginResponse};
  } catch (error: any) {
    return {error: error.response?.data?.msg || error.message }
  }
}

// ============== Export ================ //

const fns = { 
  getFromAPI,
  postToAPI,
  putToAPI,
  fetchAllPlants,
  getMe,
  registerUser,
  userLogin,
  userLogout
};

export default fns;