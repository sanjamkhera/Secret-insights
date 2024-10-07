'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Star, Sparkles, Compass } from 'lucide-react';
import { calculateAscendant, getSunSign, getMoonSign } from '@/utils/astrology';
import { CelestialData, SignInfo, ZodiacPosition } from '@/types/celestialData';
import ZodiacWheel from './ZodiacWheel';

interface NatalChartProps {
  onChartGenerate: (birthInfo: { date: string; time: string; location: string }) => void;
}

const NatalChart: React.FC<NatalChartProps> = ({ onChartGenerate }) => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [signInfo, setSignInfo] = useState<SignInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [celestialData, setCelestialData] = useState<CelestialData | null>(null);

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

      console.log('Full API Response:', JSON.stringify(response.data, null, 2));

      // Check if the response has a nested 'data' property
      const celestialData = response.data.data || response.data;

      console.log('Celestial Data Structure:', JSON.stringify(celestialData, null, 2));

      // More flexible structure checking
      if (!celestialData || typeof celestialData !== 'object') {
        throw new Error('Invalid data structure: celestialData is not an object');
      }

      if (!celestialData.table) {
        throw new Error('Invalid data structure: missing table property');
      }

      if (!Array.isArray(celestialData.table.rows)) {
        throw new Error('Invalid data structure: table.rows is not an array');
      }

      // Store the celestial data in state
      setCelestialData(celestialData as CelestialData);

      // If we've made it this far, we have a valid structure
      const sunSign = getSunSign(celestialData as CelestialData);
      const moonSign = getMoonSign(celestialData as CelestialData);
      const ascendant = calculateAscendant(celestialData as CelestialData);

      setSignInfo({ sunSign, moonSign, ascendant });
      onChartGenerate({ date: birthDate, time: birthTime, location: birthCity });
    } catch (error) {
      console.error('Error generating chart:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(`Failed to generate chart: ${error.response.data.error || 'Unknown error'}`);
      } else if (error instanceof Error) {
        setError(`Failed to generate chart: ${error.message}`);
      } else {
        setError('Failed to generate chart. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const zodiacConstellations = [
  //   "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  //   "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  // ];

  // const renderCelestialData = () => {
  //   if (!celestialData) return null;

  //   return (
  //     <Card className="mt-6 bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
  //       <CardHeader className="pb-2">
  //         <h2 className="text-2xl font-bold text-center">Celestial Bodies in Zodiac Constellations</h2>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="space-y-2 max-h-60 overflow-y-auto">
  //           {celestialData.table.rows.map((row, index) => {
  //             const zodiacCell = row.cells.find(cell =>
  //               zodiacConstellations.includes(cell.position.constellation.name)
  //             );

  //             if (zodiacCell) {
  //               return (
  //                 <div key={index} className="flex flex-col mb-4">
  //                   <h3 className="font-bold">{row.entry.name}</h3>
  //                   <div className="flex justify-between">
  //                     <span>Constellation:</span>
  //                     <span>{zodiacCell.position.constellation.name}</span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Position:</span>
  //                     <span>
  //                       RA: {zodiacCell.position.equatorial.rightAscension.string},
  //                       Dec: {zodiacCell.position.equatorial.declination.string}
  //                     </span>
  //                   </div>
  //                 </div>
  //               );
  //             }
  //             return null;
  //           })}
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // };


  const formatZodiacPosition = (position: ZodiacPosition) => {
    return `${position.sign}`;
  };

  // const getZodiacSymbol = (sign: string) => {
  //   const symbols: { [key: string]: string } = {
  //     "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋",
  //     "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏",
  //     "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓"
  //   };
  //   return symbols[sign] || sign;
  // };

  // const zodiacPositionToSVGCoords = (position: ZodiacPosition, radius: number = 170): { x: number, y: number } => {
  //   const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  //   const signIndex = zodiacSigns.indexOf(position.sign);
  //   const angle = ((signIndex * 30 + position.degree) * Math.PI / 180) - (Math.PI / 2);
  //   return {
  //     x: 200 + radius * Math.cos(angle),
  //     y: 200 + radius * Math.sin(angle)
  //   };
  // };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-8">
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

        {signInfo && (
          <div className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center justify-center">
                <Compass className="mr-2 text-yellow-300" size={24} />
                <h2 className="text-2xl font-bold">Your Cosmic Blueprint</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><Sun className="inline-block mr-2 text-yellow-300" size={20} /> Sun Sign: {formatZodiacPosition(signInfo.sunSign)}</p>
                  <p><Moon className="inline-block mr-2 text-blue-300" size={20} /> Moon Sign: {formatZodiacPosition(signInfo.moonSign)}</p>
                  <p><Star className="inline-block mr-2 text-cyan-300" size={20} /> Ascendant: {formatZodiacPosition(signInfo.ascendant)}</p>
                </div>
              </CardContent>
            </Card>

          </div>
        )}<div className="flex flex-col items-center">
          <ZodiacWheel />
        </div>
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm sm:text-lg font-cursive leading-relaxed text-white text-center">
          Your cosmic journey begins with understanding your celestial origins
        </p>
      </CardFooter>

      <div>
        {/* Your existing JSX code */}
        {celestialData && (
          <div>
            {/* Render celestial data */}
            <pre>{JSON.stringify(celestialData, null, 2)}</pre>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NatalChart;


{/* <div className="flex flex-col items-center">
          <ZodiacWheel />
    </div> */}