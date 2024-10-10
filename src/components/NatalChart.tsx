'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Star, Sparkles, Compass } from 'lucide-react';
import { calculateAscendant, getSunSign, getMoonSign } from '@/utils/astrology';
import { CelestialData } from '@/types/celestialData';

interface BirthInfo {
  date: string;
  time: string;
  place: string;
}

interface NatalChart {
  sunSign: string;
  moonSign: string;
  ascendant: string;
}

interface UserData {
  birthInfo: BirthInfo;
  natalChart?: NatalChart;
  email: string;
  name: string;
}

interface NatalChartProps {
  userId: string;
  userData: UserData;
  updateUserData: (userId: string, data: Partial<UserData>) => Promise<void>;
}

const NatalChart: React.FC<NatalChartProps> = ({ userId, userData, updateUserData }) => {
  const [signInfo, setSignInfo] = useState<NatalChart | null>(userData.natalChart || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [celestialData, setCelestialData] = useState<CelestialData | null>(null);

  const generateChart = async () => {
    if (!userData.birthInfo.date || !userData.birthInfo.time || !userData.birthInfo.place) {
      setError('Birth information is incomplete. Please update your profile.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/celestial-data', {
        params: {
          date: userData.birthInfo.date,
          time: userData.birthInfo.time,
          city: userData.birthInfo.place
        }
      });

      const celestialData = response.data.data || response.data;

      if (!celestialData || typeof celestialData !== 'object' || !celestialData.table || !Array.isArray(celestialData.table.rows)) {
        throw new Error('Invalid celestial data structure');
      }

      setCelestialData(celestialData as CelestialData);

      const sunSign = getSunSign(celestialData as CelestialData);
      const moonSign = getMoonSign(celestialData as CelestialData);
      const ascendant = calculateAscendant(celestialData as CelestialData);

      const newSignInfo: NatalChart = {
        sunSign: sunSign.sign,
        moonSign: moonSign.sign,
        ascendant: ascendant.sign
      };
      setSignInfo(newSignInfo);

      await updateUserData(userId, {
        natalChart: newSignInfo
      });

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

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-8">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed text-gray-200">Your Natal Chart</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        {signInfo ? (
          <div className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center justify-center">
                <Compass className="mr-2 text-yellow-300" size={24} />
                <h2 className="text-2xl font-bold">Your Cosmic Blueprint</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><Sun className="inline-block mr-2 text-yellow-300" size={20} /> Sun Sign: {signInfo.sunSign}</p>
                  <p><Moon className="inline-block mr-2 text-blue-300" size={20} /> Moon Sign: {signInfo.moonSign}</p>
                  <p><Star className="inline-block mr-2 text-cyan-300" size={20} /> Ascendant: {signInfo.ascendant}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="text-center">Your natal chart hasn&apos;t been generated yet.</p>
        )}

        <Button
          onClick={generateChart}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Aligning the Cosmic Forces...
            </>
          ) : (
            signInfo ? 'Regenerate My Natal Chart' : 'Generate My Natal Chart'
          )}
        </Button>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm sm:text-lg font-cursive leading-relaxed text-white text-center">
          Your cosmic journey begins with understanding your celestial origins
        </p>
      </CardFooter>
    </Card>
  );
};

export default NatalChart;