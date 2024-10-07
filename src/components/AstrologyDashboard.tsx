'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Moon, Star, Sparkles, Compass, Heart, Zap } from 'lucide-react';
import { calculateAscendant, getSunSign, getMoonSign } from '@/utils/astrology';
import { CelestialData, SignInfo, ZodiacPosition, ZodiacSign } from '@/types/celestialData';

const AstrologyDashboard: React.FC = () => {
  // State variables
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [signInfo, setSignInfo] = useState<SignInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [celestialData, setCelestialData] = useState<CelestialData | null>(null);
  const [horoscope, setHoroscope] = useState<any | null>(null);

  // Zodiac signs array
  const zodiacSigns: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Zodiac emojis object
  const zodiacEmojis: { [key in ZodiacSign]: string } = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋', Leo: '♌', Virgo: '♍',
    Libra: '♎', Scorpio: '♏', Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓'
  };

  // Zodiac characteristics object
  const zodiacCharacteristics: { [key in ZodiacSign]: { element: string; quality: string; traits: string[] } } = {
    Aries: {
      element: "Fire",
      quality: "Cardinal",
      traits: ["Energetic", "Courageous", "Confident", "Enthusiastic", "Impulsive"]
    },
    Taurus: {
      element: "Earth",
      quality: "Fixed",
      traits: ["Patient", "Reliable", "Determined", "Practical", "Stubborn"]
    },
    Gemini: {
      element: "Air",
      quality: "Mutable",
      traits: ["Adaptable", "Communicative", "Witty", "Intellectual", "Inconsistent"]
    },
    Cancer: {
      element: "Water",
      quality: "Cardinal",
      traits: ["Intuitive", "Emotional", "Protective", "Imaginative", "Moody"]
    },
    Leo: {
      element: "Fire",
      quality: "Fixed",
      traits: ["Creative", "Passionate", "Generous", "Warm-hearted", "Arrogant"]
    },
    Virgo: {
      element: "Earth",
      quality: "Mutable",
      traits: ["Analytical", "Practical", "Diligent", "Modest", "Overcritical"]
    },
    Libra: {
      element: "Air",
      quality: "Cardinal",
      traits: ["Diplomatic", "Gracious", "Idealistic", "Peaceful", "Indecisive"]
    },
    Scorpio: {
      element: "Water",
      quality: "Fixed",
      traits: ["Passionate", "Resourceful", "Brave", "Stubborn", "Jealous"]
    },
    Sagittarius: {
      element: "Fire",
      quality: "Mutable",
      traits: ["Optimistic", "Honest", "Adventurous", "Philosophical", "Careless"]
    },
    Capricorn: {
      element: "Earth",
      quality: "Cardinal",
      traits: ["Responsible", "Disciplined", "Self-controlled", "Practical", "Know-it-all"]
    },
    Aquarius: {
      element: "Air",
      quality: "Fixed",
      traits: ["Original", "Independent", "Humanitarian", "Intellectual", "Aloof"]
    },
    Pisces: {
      element: "Water",
      quality: "Mutable",
      traits: ["Intuitive", "Compassionate", "Artistic", "Gentle", "Fearful"]
    }
  };

  // Handler for date input change
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

  // Function to generate chart and horoscope
  const generateChartAndHoroscope = async () => {
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

      const celestialData = response.data.data || response.data;

      if (!celestialData || typeof celestialData !== 'object') {
        throw new Error('Invalid data structure: celestialData is not an object');
      }

      if (!celestialData.table) {
        throw new Error('Invalid data structure: missing table property');
      }

      if (!Array.isArray(celestialData.table.rows)) {
        throw new Error('Invalid data structure: table.rows is not an array');
      }

      setCelestialData(celestialData as CelestialData);

      const sunSign = getSunSign(celestialData as CelestialData);
      const moonSign = getMoonSign(celestialData as CelestialData);
      const ascendant = calculateAscendant(celestialData as CelestialData);

      setSignInfo({ sunSign, moonSign, ascendant });

      // Generate horoscope
      const horoscopeContent = generateHoroscope(sunSign.sign, { sunSign, moonSign, ascendant });
      setHoroscope(horoscopeContent);

    } catch (error) {
      console.error('Error generating chart and horoscope:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(`Failed to generate chart and horoscope: ${error.response.data.error || 'Unknown error'}`);
      } else if (error instanceof Error) {
        setError(`Failed to generate chart and horoscope: ${error.message}`);
      } else {
        setError('Failed to generate chart and horoscope. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate horoscope
  const generateHoroscope = (sign: ZodiacSign, signInfo: SignInfo): any => {
    const characteristics = zodiacCharacteristics[sign];
    const compatibleSign = getCompatibleSign(sign);

    const templates = [
      `As a {sign}, your {element} nature is on fire today! The Sun in {sunSign} is giving you that extra {trait1} energy, while the Moon in {moonSign} is amplifying your {trait2} vibes. Your {quality} quality is your secret weapon - use it to slay any challenges that come your way!`,
      `Yo {sign}, the cosmos is serving up some serious {element} realness! With the Sun blazing through {sunSign}, it's time to flex your {trait1} muscles. The Moon's chilling in {moonSign}, so don't be surprised if you're feeling extra {trait2}. Just watch out for that {trait3} side - it might try to crash your cosmic party!`,
      `Listen up, {sign}! The universe is speaking your {quality} language today. The Sun's vibe in {sunSign} is amplifying your natural {trait1}, while the Moon in {moonSign} is giving you those {trait2} feels. It's your time to shine, but remember to keep that {trait3} tendency in check - balance is key to your cosmic glow-up!`
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];

    const horoscopeContent = template
      .replace(/{sign}/g, sign)
      .replace(/{element}/g, characteristics.element)
      .replace(/{quality}/g, characteristics.quality)
      .replace(/{trait1}/g, characteristics.traits[0])
      .replace(/{trait2}/g, characteristics.traits[1])
      .replace(/{trait3}/g, characteristics.traits[4])
      .replace(/{sunSign}/g, signInfo.sunSign.sign)
      .replace(/{moonSign}/g, signInfo.moonSign.sign);

    return {
      content: horoscopeContent,
      mood: characteristics.traits[Math.floor(Math.random() * characteristics.traits.length)],
      luckyNumber: Math.floor(Math.random() * 100) + 1,
      compatibility: compatibleSign,
    };
  };

  // Function to get compatible sign
  const getCompatibleSign = (sign: ZodiacSign): ZodiacSign => {
    const index = zodiacSigns.indexOf(sign);
    const compatibleIndex = (index + 4) % 12; // This is a simplification, real compatibility is more complex
    return zodiacSigns[compatibleIndex];
  };

  // Function to format zodiac position
  const formatZodiacPosition = (position: ZodiacPosition) => {
    return `${position.sign} ${position.degree.toFixed(2)}°`;
  };

  // Function to get zodiac emoji
  const getZodiacEmoji = (sign: ZodiacSign): string => zodiacEmojis[sign] || '🌟';

  // Render function for celestial data
  const renderCelestialData = () => {
    if (!celestialData) return null;
  
    return (
      <Card className="mt-6 bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
        <CardHeader className="pb-2">
          <h2 className="text-2xl font-bold text-center">Celestial Bodies in Zodiac Constellations</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {celestialData.table.rows.map((row, index) => {
              const zodiacCell = row.cells.find(cell => 
                zodiacSigns.includes(cell.position.constellation.name as ZodiacSign)
              );
              
              if (zodiacCell) {
                return (
                  <div key={index} className="flex flex-col mb-4">
                    <h3 className="font-bold">{row.entry.name}</h3>
                    <div className="flex justify-between">
                      <span>Constellation:</span>
                      <span>{zodiacCell.position.constellation.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position:</span>
                      <span>
                        RA: {zodiacCell.position.equatorial.rightAscension.string},
                        Dec: {zodiacCell.position.equatorial.declination.string}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-md mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-8">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed text-gray-200">Cosmic Insights</h1>
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
            onClick={generateChartAndHoroscope}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            disabled={!birthDate || !birthTime || !birthCity || isLoading}
          >
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Decoding Your Cosmic Blueprint...
              </>
            ) : (
              'Reveal My Cosmic Destiny'
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
                  <p><Sun className="inline-block mr-2 text-yellow-300" size={20} /> Sun Sign: {formatZodiacPosition(signInfo.sunSign)} {getZodiacEmoji(signInfo.sunSign.sign)}</p>
                  <p><Moon className="inline-block mr-2 text-blue-300" size={20} /> Moon Sign: {formatZodiacPosition(signInfo.moonSign)} {getZodiacEmoji(signInfo.moonSign.sign)}</p>
                  <p><Star className="inline-block mr-2 text-purple-300" size={20} /> Ascendant: {formatZodiacPosition(signInfo.ascendant)} {getZodiacEmoji(signInfo.ascendant.sign)}</p>
                </div>
              </CardContent>
            </Card>

            {renderCelestialData()}

            {horoscope && (
              <Card className="bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 border-indigo-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
                <CardHeader className="pb-2 flex items-center justify-center">
                  <Sparkles className="mr-2 text-yellow-300" size={24} />
                  <h2 className="text-2xl font-bold">Your Cosmic Vibe Check</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">{horoscope.content}</p>
                  <div className="space-y-2">
                    <p><Zap className="inline-block mr-2 text-yellow-300" size={20} /> Cosmic Mood: {horoscope.mood}</p>
                    <p><Star className="inline-block mr-2 text-purple-300" size={20} /> Lucky Number: {horoscope.luckyNumber}</p>
                    <p><Heart className="inline-block mr-2 text-red-300" size={20} /> Cosmic BFF: {horoscope.compatibility} {getZodiacEmoji(horoscope.compatibility)}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm sm:text-lg font-cursive leading-relaxed text-white text-center">
          Embrace your cosmic uniqueness and let the stars guide your journey
        </p>
      </CardFooter>
    </Card>
  );
};

export default AstrologyDashboard;