import { useState } from 'react';
import axios from 'axios';

interface GeocodingResult {
  latitude: string;
  longitude: string;
}

export const useGeocoding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCoordinates = async (location: string): Promise<GeocodingResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: location,
          key: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
          limit: 1
        }
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return { 
          latitude: lat.toString(), 
          longitude: lng.toString() 
        };
      } else {
        setError('Location not found');
        return null;
      }
    } catch (err) {
      setError('Failed to geocode location');
      console.error('Geocoding error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { getCoordinates, isLoading, error };
};