'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react';
import { calculateAscendant, getSunSign, getMoonSign } from '@/utils/astrology';
import ZodiacWheel from './ZodiacWheel';
import { CelestialData } from '@/types/celestialData';

interface NatalChartProps {
  onChartGenerate: (birthInfo: { date: string; time: string; location: string }) => void;
}

interface SignInfo {
  sunSign: string;
  moonSign: string;
  ascendant: string;
}

const NatalChart: React.FC<NatalChartProps> = ({ onChartGenerate }) => {
  const [birthInfo, setBirthInfo] = useState({ date: '', time: '', location: '' });
  const [celestialData, setCelestialData] = useState<CelestialData | null>(null);
  const [signInfo, setSignInfo] = useState<SignInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirthInfo(prev => ({ ...prev, [name]: value }));

    if (name === 'date') {
      const inputDate = new Date(value);
      const currentDate = new Date();

      if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
        setError('Please enter a valid date not in the future.');
      } else {
        setError(null);
      }
    }
  };

  const generateChart = async () => {
    if (!birthInfo.date || !birthInfo.time || !birthInfo.location) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ data: CelestialData }>('/api/celestial-data', {
        params: birthInfo
      });

      const data = response.data.data;
      setCelestialData(data);

      const sunSign = getSunSign(data);
      const moonSign = getMoonSign(data);
      const ascendant = calculateAscendant(
        new Date(birthInfo.date),
        birthInfo.time,
        data.observer.location.latitude,
        data.observer.location.longitude,
        data
      );

      setSignInfo({ sunSign, moonSign, ascendant });
      onChartGenerate(birthInfo);
    } catch (error) {
      console.error('Error generating chart:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(`Failed to generate chart: ${error.response.data.error || 'Unknown error'}`);
      } else {
        setError('Failed to generate chart. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignInfo = () => {
    if (!signInfo) return null;

    return (
      <div className="mt-4 bg-purple-900 p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Your Celestial Signs</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Sun Sign</p>
            <p>{signInfo.sunSign}</p>
          </div>
          <div>
            <p className="font-semibold">Moon Sign</p>
            <p>{signInfo.moonSign}</p>
          </div>
          <div>
            <p className="font-semibold">Ascendant</p>
            <p>{signInfo.ascendant}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-black bg-opacity-40 text-white shadow-lg font-sans w-full max-w-2xl mx-auto overflow-hidden transition-all duration-300 ease-in-out transform border-2 rounded-xl border-gray-600">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed text-gray-200">Natal Charts</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <div className="w-full max-w-[350px] mx-auto">
          <Input
            type="date"
            name="date"
            value={birthInfo.date}
            onChange={handleInputChange}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Date"
          />
          <Input
            type="time"
            name="time"
            value={birthInfo.time}
            onChange={handleInputChange}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Time"
          />
          <Input
            type="text"
            name="location"  // Changed from "city" to "location"
            value={birthInfo.location}
            onChange={handleInputChange}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Location (e.g., New York, USA)"
          />

          <Button
            onClick={generateChart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            disabled={!birthInfo.date || !birthInfo.time || !birthInfo.location || isLoading}
          >
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Aligning the Cosmic Forces...
              </>
            ) : (
              'Generate My Natal Chart'
            )}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center">
          {renderSignInfo()}
          <ZodiacWheel
            celestialData={celestialData}
            birthDate={birthInfo.date}
            birthTime={birthInfo.time}
          />
        </div>
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-lg font-cursive leading-relaxed text-gray-300 text-center">
          Understand your celestial origins
        </p>
      </CardFooter>
    </Card>
  );
};

export default NatalChart;