import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react';
import { calculateAscendant, getSunSign, getMoonSign } from '@/utils/astrology';

interface NatalChartProps {
  onChartGenerate: (birthInfo: { date: string; time: string; location: string }) => void;
}

interface SignInfo {
  sunSign: string;
  moonSign: string;
  ascendant: string;
}

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const zodiacSymbols: { [key: string]: string } = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

const NatalChart: React.FC<NatalChartProps> = ({ onChartGenerate }) => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [signInfo, setSignInfo] = useState<SignInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const currentDate = new Date();

    if (!isNaN(inputDate.getTime()) && inputDate <= currentDate) {
      setBirthDate(e.target.value);
    } else {
      setBirthDate('');
      setError('Please enter a valid date not in the future.');
    }
  };

  const generateChart = async () => {
    if (!birthDate || !birthTime || !birthCity) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/celestial-data', {
        params: {
          date: birthDate,
          time: birthTime,
          city: birthCity
        }
      });

      const data = response.data.data;
      const sunSign = getSunSign(data);
      const moonSign = getMoonSign(data);

      const latitude = data.observer.location.latitude;
      const longitude = data.observer.location.longitude;
      const ascendant = calculateAscendant(
        new Date(birthDate),
        birthTime,
        latitude,
        longitude,
        data
      );

      setSignInfo({ sunSign, moonSign, ascendant });
      onChartGenerate({ date: birthDate, time: birthTime, location: birthCity });
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

  const renderZodiacWheel = () => {
    const size = 400; // Increased size
    const center = size / 2;
    const radius = size / 2 - 20;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ padding: '20px 0' }}>
        <defs>
          <radialGradient id="bg-transparent" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#000033" />
            <stop offset="100%" stopColor="#000011" />
          </radialGradient>
        </defs>

        <circle cx={center} cy={center} r={radius + 20} fill="url(#bg-gradient)" />
        <circle cx={center} cy={center} r={radius} fill="none" stroke="white" strokeWidth="2" />

        {zodiacSigns.map((sign, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <g key={sign}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="white"
                strokeWidth="1"
              />
              <text
                x={center + (radius + 15) * Math.cos(angle)}
                y={center + (radius + 15) * Math.sin(angle)}
                fill="white"
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {zodiacSymbols[sign]}
              </text>
            </g>
          );
        })}

        <circle cx={center} cy={center} r="50" fill="purple" stroke="white" />
        <text x={center} y={center} fill="white" fontSize="32" textAnchor="middle" dominantBaseline="middle">☽</text>
      </svg>
    );
  };

  const renderSignInfo = () => {
    if (!signInfo) return null;

    return (
      <div className="mt-4 bg-purple-900 p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Your Celestial Signs</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Sun Sign</p>
            <p>{zodiacSymbols[signInfo.sunSign]} {signInfo.sunSign}</p>
          </div>
          <div>
            <p className="font-semibold">Moon Sign</p>
            <p>{zodiacSymbols[signInfo.moonSign]} {signInfo.moonSign}</p>
          </div>
          <div>
            <p className="font-semibold">Ascendant</p>
            <p>{zodiacSymbols[signInfo.ascendant]} {signInfo.ascendant}</p>
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
            value={birthDate}
            onChange={handleDateChange}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Date"
          />
          <Input
            type="time"
            value={birthTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthTime(e.target.value)}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Time"
          />
          <Input
            type="text"
            value={birthCity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthCity(e.target.value)}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth City (e.g., New York, USA)"
          />

          <Button
            onClick={generateChart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            disabled={!birthDate || !birthTime || !birthCity || isLoading}
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

        <div className="mt-6 py-4 flex flex-col items-center">
          {renderSignInfo()}
          {renderZodiacWheel()}
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