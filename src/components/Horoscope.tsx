'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { ZodiacSign } from '@/types';
import { CelestialData } from '@/types/celestialData';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZodiacWheel from './ZodiacWheel';
import { CelestialTable } from './CelestialTable';

interface WeeklyHoroscopeProps {
  onSignSelect: (sign: ZodiacSign) => void;
}

const WeeklyHoroscope: React.FC<WeeklyHoroscopeProps> = ({ onSignSelect }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [revealedSign, setRevealedSign] = useState<ZodiacSign | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');
  const [celestialData, setCelestialData] = useState<CelestialData | null>(null);


  const zodiacSigns: { sign: ZodiacSign, dateRange: string }[] = [
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
  ];

  const zodiacImages = {
    Aries: '/aries.png',
    Taurus: '/taurus.png',
    Gemini: '/gemini.png',
    Cancer: '/cancer.png',
    Leo: '/leo.png',
    Virgo: '/virgo.png',
    Libra: '/libra.png',
    Scorpio: '/scorpio.png',
    Sagittarius: '/sagittarius.png',
    Capricorn: '/capricorn.png',
    Aquarius: '/aquarius.png',
    Pisces: '/pisces.png'
  };

  const getZodiacImage = (sign: ZodiacSign): string => {
    return zodiacImages[sign] || '/default.png';
  };

  const getHoroscopeForDay = (sign: ZodiacSign, day: string) => {
    const baseHoroscope = horoscopes[sign];
    switch (day) {
      case 'yesterday':
        return `Yesterday was a time of reflection. ${baseHoroscope.split('.')[0]}.`;
      case 'tomorrow':
        return `Tomorrow brings new opportunities. ${baseHoroscope.split('.')[0]}.`;
      default:
        return baseHoroscope;
    }
  };

  const horoscopes: { [key in ZodiacSign]: string } = {
    Aries: `This is a beneficial year for you because Jupiter is in your House of Communications...`,
    Taurus: `This is a great year because you are the financial wizard of the zodiac...`,
    Gemini: `Naturally this is a fabulous year for you because lucky Jupiter is in your sign...`,
    Cancer: `Right now, Jupiter is in the part of your chart that deals with your inner world...`,
    Leo: `Until next summer, Jupiter will continue to boost your popularity...`,
    Virgo: `Check the dates of when Jupiter was in Gemini...`,
    Libra: `Jupiter is associated with travel and foreign countries...`,
    Scorpio: `Every six years, Jupiter will be in either Gemini or Sagittarius...`,
    Sagittarius: `This year Jupiter is opposite your sign, in your House of Partnerships...`,
    Capricorn: `This is the perfect year to improve your job...`,
    Aquarius: `You are fortunate because this year Jupiter is in the most fun-filled...`,
    Pisces: `This is the best year in over a decade for you to improve where you live...`
  };

  const getHoroscope = () => {
    if (!selectedSign) return;

    setIsLoading(true);
    setTimeout(() => {
      setRevealedSign(selectedSign);
      onSignSelect(selectedSign);
      setIsLoading(false);
    }, 1500);
  };

  const formatDate = (day: string) => {
    const today = new Date();
    switch (day) {
      case 'yesterday':
        today.setDate(today.getDate() - 1);
        break;
      case 'tomorrow':
        today.setDate(today.getDate() + 1);
        break;
    }
    return today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const fetchCelestialData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/celestial-data?date=${today}&time=12:00`);

      if (!response.ok) {
        throw new Error('Failed to fetch celestial data');
      }

      const data = await response.json();
      setCelestialData(data.data); // Note: Astronomy API wraps response in data object
    } catch (error) {
      console.error('Error fetching celestial data:', error);
    }
  };

  // Add useEffect to fetch data on mount
  useEffect(() => {
    fetchCelestialData();
  }, []);

  return (
    <>
      <Card className="bg-transparent text-white shadow-lg border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform">
        <CardHeader className="pb-2">
          <div className="text-center">
            <h1 className="text-3xl font-bold leading-relaxed text-gray-200">Horoscope</h1>
          </div>
        </CardHeader>

        <CardContent className="px-6 mt-2">
          <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
            {revealedSign && (
              <Tabs defaultValue="today" className="flex flex-row items-center justify-center py-6" onValueChange={setSelectedDay}>
                <TabsList className="grid grid-cols-3 w-full bg-transparent">
                  <TabsTrigger
                    value="yesterday"
                    className="data-[state=active]:bg-blue-700 flex flex-col items-center rounded-xl"
                  >
                    Yesterday
                    <span className="text-xs mt-1">{formatDate('yesterday')}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-blue-700 flex flex-col items-center rounded-xl"
                  >
                    Today
                    <span className="text-xs mt-1">{formatDate('today')}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tomorrow"
                    className="data-[state=active]:bg-blue-700 flex flex-col items-center rounded-xl"
                  >
                    Tomorrow
                    <span className="text-xs mt-1">{formatDate('tomorrow')}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
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

          {revealedSign && (
            <div className="space-y-4 mt-4">
              <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 border-blue-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
                <CardHeader className="pb-2 flex items-center justify-center">
                  <Image
                    src={getZodiacImage(revealedSign as ZodiacSign)}
                    alt={revealedSign}
                    className="w-16 h-16 object-contain"
                    width={64}
                    height={64}
                    onError={(e) => {
                      e.currentTarget.src = '/default.png';
                      console.error(`Failed to load image for ${revealedSign}`);
                    }}
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-center font-bold">{zodiacSigns.find(z => z.sign === revealedSign)?.dateRange}</p>
                  <p className="text-lg text-justify">
                    {getHoroscopeForDay(revealedSign as ZodiacSign, selectedDay)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
          <ZodiacWheel />
        </CardContent>

        <CardFooter className="justify-center pb-4">
          <p className="text-lg font-cursive leading-relaxed text-white text-center">
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