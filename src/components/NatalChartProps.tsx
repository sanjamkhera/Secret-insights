import React, { useState } from 'react';
import { ZodiacSign, PlanetaryPositions } from '@/types';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Star, Sparkles, Rocket, Zap, Compass, Eclipse } from 'lucide-react';

interface NatalChartProps {
  onChartGenerate: (birthInfo: { date: string; time: string; location: string }) => void;
}

const NatalChart: React.FC<NatalChartProps> = ({ onChartGenerate }) => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [chartData, setChartData] = useState<PlanetaryPositions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setBirthDate(date.toISOString().split('T')[0]);
    } else {
      setBirthDate('');
    }
  };

  const generateChart = async () => {
    if (!birthDate || !birthTime || !birthLocation) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulated chart data generation
    const simulatedChartData: PlanetaryPositions = {
      date: birthDate,
      sun: getRandomZodiacSign(),
      moon: getRandomZodiacSign(),
      mercury: getRandomZodiacSign(),
      venus: getRandomZodiacSign(),
      mars: getRandomZodiacSign(),
      jupiter: getRandomZodiacSign(),
      saturn: getRandomZodiacSign(),
      uranus: getRandomZodiacSign(),
      neptune: getRandomZodiacSign(),
      pluto: getRandomZodiacSign(),
    };

    setChartData(simulatedChartData);
    onChartGenerate({ date: birthDate, time: birthTime, location: birthLocation });
    setIsLoading(false);
  };

  const getRandomZodiacSign = (): ZodiacSign => {
    const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(Math.random() * signs.length)];
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 w-[350px] mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform">
      <CardHeader className="pb-2 bg-gradient-to-b from-purple-950 to-transparent">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 font-cursive leading-relaxed text-white">Cosmic Blueprint</h1>
          <p className="text-2xl font-fancy leading-relaxed text-white">Unveil Your Celestial DNA</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Sun className="text-yellow-300 animate-spin-slow" size={24} />
            <Moon className="text-blue-300 animate-pulse" size={24} />
            <Eclipse className="text-green-300 animate-orbit" size={24} />
            <Star className="text-cyan-300 animate-twinkle" size={24} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <div className="w-full max-w-[350px] mx-auto"> {/* Add this wrapper div */}
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
            value={birthLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthLocation(e.target.value)}
            className="w-full bg-purple-900 border-purple-700 text-white rounded-xl my-2 text-sm placeholder-gray-400"
            placeholder="Birth Location"
          />

          <Button
            onClick={generateChart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            disabled={!birthDate || !birthTime || !birthLocation || isLoading}
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

        {chartData && (
          <div className="space-y-4 mt-6">
            <Card className="bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center justify-center">
                <Compass className="mr-2 text-yellow-300" size={24} />
                <h2 className="text-2xl font-bold">Your Cosmic Blueprint</h2>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <PlanetPosition planet="Sun" position={chartData.sun} icon={<Sun size={20} className="text-yellow-300" />} />
                <PlanetPosition planet="Moon" position={chartData.moon} icon={<Moon size={20} className="text-blue-300" />} />
                <PlanetPosition planet="Mercury" position={chartData.mercury} icon={<Zap size={20} className="text-gray-300" />} />
                <PlanetPosition planet="Venus" position={chartData.venus} icon={<Star size={20} className="text-pink-300" />} />
                <PlanetPosition planet="Mars" position={chartData.mars} icon={<Rocket size={20} className="text-red-500" />} />
                <PlanetPosition planet="Jupiter" position={chartData.jupiter} icon={<Eclipse size={20} className="text-orange-300" />} />
                <PlanetPosition planet="Saturn" position={chartData.saturn} icon={<Eclipse size={20} className="text-yellow-600" />} />
                <PlanetPosition planet="Uranus" position={chartData.uranus} icon={<Eclipse size={20} className="text-cyan-300" />} />
                <PlanetPosition planet="Neptune" position={chartData.neptune} icon={<Eclipse size={20} className="text-blue-400" />} />
                <PlanetPosition planet="Pluto" position={chartData.pluto} icon={<Eclipse size={20} className="text-purple-400" />} />
              </CardContent>
            </Card>
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

// Update the PlanetPosition component
const PlanetPosition: React.FC<{ planet: string; position: string; icon: React.ReactNode }> = ({ planet, position, icon }) => (
  <div className="flex items-center space-x-1">
    {icon}
    <span className="text-xs">{planet}: </span>
    <span className="font-bold text-xs">{position}</span>
  </div>
);

export default NatalChart;