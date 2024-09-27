import { useState, useEffect } from 'react';
import axios from 'axios';
import { CelestialData } from '@/types/celestialData';

export const useCelestialData = (birthDate: string, birthTime: string, birthCity: string) => {
  const [data, setData] = useState<CelestialData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!birthDate || !birthTime || !birthCity) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/celestial-data', {
          params: { date: birthDate, time: birthTime, city: birthCity }
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch celestial data. Please try again.');
        console.error('Error fetching celestial data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [birthDate, birthTime, birthCity]);

  return { data, isLoading, error };
};