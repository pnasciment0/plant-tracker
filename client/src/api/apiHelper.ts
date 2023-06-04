import axios from 'axios';
import { APIResponse, Plant, User } from '../types/types';

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
  const API_URL = 'http://localhost:81/api/plants/';
  try {
    const plantData = await getFromAPI<Plant[]>(API_URL);
    return plantData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getMe(): Promise<APIResponse<User>> {
  const API_URL = 'http://localhost:81/users/me'
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
}

// ============== Export ================ //

const fns = { 
  getFromAPI,
  postToAPI,
  putToAPI,
  fetchAllPlants,
  getMe
};

export default fns;


// const API_URL = 'http://localhost:81/api/plants/'; // replace with your API URL

// export const fetchData = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error('Those plants seem to be hiding, because we couldn\'t find what you\'re looking for!');
//         } else {
//           throw new Error(`Some kind of alien tech is meddling with us: ${response.statusText}`);
//         }
//       }
//       const json = await response.json();
//       return json;
//     } catch (error: any) {
//       if (error instanceof Error) {
//         throw new Error(`Error while trying to fetch data: ${error.message}`);
//       } else {
//         throw new Error('Unknown error occurred');
//       }
//     }
//   };