'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { ZodiacSign } from '../types';
import { CelestialTable } from './CelestialTable';
import { getTodayHoroscope } from '../lib/firebaseService';
import { DailyHoroscope } from '../types';

interface WeeklyHoroscopeProps {
  onSignSelect: (sign: ZodiacSign) => void;
}

const WeeklyHoroscope: React.FC<WeeklyHoroscopeProps> = ({ onSignSelect }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [revealedSign, setRevealedSign] = useState<ZodiacSign | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [todayHoroscope, setTodayHoroscope] = useState<DailyHoroscope | null>(null);
  const [celestialData, setCelestialData] = useState(null);

  const zodiacSigns = [
    { sign: 'Aries', dateRange: 'March 21-April 19' },
    { sign: 'Taurus', dateRange: 'April 20-May 20' },
    { sign: 'Gemini', dateRange: 'May 21-June 20' },
    { sign: 'Cancer', dateRange: 'June 21-July 22' },
    { sign: 'Leo', dateRange: 'July 23-Aug. 22' },
    { sign: 'Virgo', dateRange: 'Aug. 23-Sept. 22' },
    { sign: 'Libra', dateRange: 'Sept. 23-Oct. 22' },
    { sign: 'Scorpio', dateRange: 'Oct. 23-Nov. 21' },
    { sign: 'Sagittarius', dateRange: 'Nov. 22-Dec. 21' },
    { sign: 'Capricorn', dateRange: 'Dec. 22-Jan. 19' },
    { sign: 'Aquarius', dateRange: 'Jan. 20-Feb. 18' },
    { sign: 'Pisces', dateRange: 'Feb. 19-March 20' }
  ] as const;

  // Fetch horoscope and celestial data on mount
  useEffect(() => {
    const fetchData = async () => {
      const horoscopeData = await getTodayHoroscope();
      if (horoscopeData) setTodayHoroscope(horoscopeData);

      const response = await fetch('/api/celestial-data?date=' + new Date().toISOString().split('T')[0] + '&time=12:00');
      if (response.ok) {
        const data = await response.json();
        setCelestialData(data.data);
      }
    };
    fetchData();
  }, []);

  const getHoroscope = () => {
    if (!selectedSign) return;
    setIsLoading(true);
    setTimeout(() => {
      setRevealedSign(selectedSign);
      onSignSelect(selectedSign);
      setIsLoading(false);
    }, 1500);
  };

  const getZodiacImage = (sign: ZodiacSign): string => {
    return `/${sign.toLowerCase()}.png`;
  };

  return (
    <>
      <Card className="bg-transparent text-white shadow-lg border-black-400 border-2 max-w-sm mx-auto rounded-3xl">
        <CardHeader className="pb-2">
          <h1 className="text-3xl font-bold text-center text-gray-200">Horoscope</h1>
        </CardHeader>

        <CardContent className="px-6 mt-2">
          <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white rounded-2xl">
            <CardContent>
              <Select onValueChange={(value) => setSelectedSign(value as ZodiacSign)}>
                <SelectTrigger className="w-full bg-blue-900 border-blue-700 text-white rounded-xl mt-4 mb-4">
                  <SelectValue placeholder="Select Your Zodiac Sign" />
                </SelectTrigger>
                <SelectContent className="bg-blue-900 text-white rounded-xl">
                  {zodiacSigns.map(({ sign, dateRange }) => (
                    <SelectItem key={sign} value={sign} className="hover:bg-blue-800">
                      {sign} ({dateRange})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={getHoroscope}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                disabled={!selectedSign || isLoading}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Consulting the Celestial Spheres...
                  </>
                ) : (
                  'Reveal My Celestial Horoscope'
                )}
              </Button>
            </CardContent>
          </Card>

          {revealedSign && todayHoroscope && (
            <Card className="mt-4 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 border-blue-800 text-white rounded-2xl">
              <CardHeader className="pb-2 flex items-center justify-center">
                <Image
                  src={getZodiacImage(revealedSign as ZodiacSign)}
                  alt={revealedSign}
                  className="w-16 h-16 object-contain"
                  width={64}
                  height={64}
                />
              </CardHeader>
              <CardContent>
                <p className="text-lg text-center font-bold">
                  {zodiacSigns.find(z => z.sign === revealedSign)?.dateRange}
                </p>
                <p className="text-lg text-justify">
                  {todayHoroscope[revealedSign.toLowerCase() as Lowercase<ZodiacSign>] || 
                   "Horoscope not available at the moment."}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>

        <CardFooter className="justify-center pb-4">
          <p className="text-lg font-cursive text-white text-center">
            Follow your celestial path
          </p>
        </CardFooter>
      </Card>
      
      {celestialData && (
        <div className="mt-6 px-4">
          <CelestialTable data={celestialData} />
        </div>
      )}
    </>
  );
};

export default WeeklyHoroscope;