
import axios from 'axios';

export const useCelestialData = () => {
  const fetchCelestialData = async (params: {
    latitude: string;
    longitude: string;
    elevation: string;
    from_date: string;
    to_date: string;
    time: string;
  }) => {
    try {
      const response = await axios.get('https://api.astronomyapi.com/api/v2/bodies/positions', {
        params: {
          latitude: params.latitude,
          longitude: params.longitude,
          elevation: params.elevation,
          from_date: params.from_date,
          to_date: params.to_date,
          time: params.time
        },
        headers: {
          'Authorization': 'Basic ' + btoa(`${process.env.NEXT_PUBLIC_ASTRONOMY_API_ID}:${process.env.NEXT_PUBLIC_ASTRONOMY_API_SECRET}`)
        }
      });
      
      console.log('Celestial Data:', response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(`Failed to fetch celestial data: ${err.response.status} ${err.response.statusText}`);
        console.error('Error response:', err.response.data);
      } else {
        console.error('Failed to fetch celestial data. Please try again.');
      }
      console.error('Error fetching celestial data:', err);
    }
  };

  return { fetchCelestialData };
};