import axios from 'axios';

export const getGeolocation = async (ip: string) => {
  try {
    const response = await axios.get(`https://ipinfo.io/${ip}/geo?token=your_api_token`);
    return response.data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    throw error;
  }
};
