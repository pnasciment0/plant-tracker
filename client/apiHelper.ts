// apiHelper.ts

const API_URL = 'http://localhost:81/api/plants/'; // replace with your API URL

export const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Those plants seem to be hiding, because we couldn\'t find what you\'re looking for!');
        } else {
          throw new Error(`Some kind of alien tech is meddling with us: ${response.statusText}`);
        }
      }
      const json = await response.json();
      return json;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(`Error while trying to fetch data: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  };