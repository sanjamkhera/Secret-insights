"use client"

// Import necessary dependencies
import React from 'react';
// Import the DailyHoroscope component from the components folder
import WeeklyHoroscope from '@/components/WeeklyHoroscope';
// Import the ZodiacSign type from the types file
import { ZodiacSign } from '@/types';
// Import the NatalChart component from the components folder
// import NatalChartProps from '@/components/NatalChart';
import LoginComponent from '@/components/LoginComponent';
// import AIChat from '@/components/AIChat';
// import CareerInsights from '@/components/CareerInsights';
// import Compatibility from '@/components/Compatibility';
// import TarotCards from '@/components/TarotCards';
import { Sun, Moon, Star, Sparkles, Eclipse, SunMoon, Zap } from 'lucide-react';

// Define the main Home component as the default export
export default function Home() {
  // Define a function to handle zodiac sign selection
  const handleSignSelect = (sign: ZodiacSign) => {
    // Log the selected sign to the console
    console.log(sign);
    // Add any additional logic here when a sign is selected
  };

  // // Define a function to handle natal chart generation
  // const handleChartGenerate = (birthInfo: { date: string; time: string; location: string }) => {
  //   // Log the birth information to the console
  //   console.log(birthInfo);
  //   // Add any additional logic here when a chart is generated
  // };

  // Render the component
  return (
    <>
      <div className='text-center pt-4 pb-2 mb-2'>
        <h1 className="text-4xl font-bold font-cursive leading-relaxed text-gray-200 pt-2">Celestial Insights</h1>
        <p className="text-2xl font-fancy leading-relaxed text-gray-400">Unlock the wisdom of the stars</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Sun className="text-yellow-300 animate-spin-slow" size={24} />
          <Moon className="text-blue-300 animate-pulse" size={24} />
          <Star className="text-cyan-300 animate-twinkle" size={24} />
          <Eclipse className="text-orange-300 animate-pulse" size={24} />
          <Zap className="text-green-300 animate-pulse" size={24} />
          <SunMoon className="text-purple-300 animate-pulse" size={24} />
          <Sparkles className="text-pink-300 animate-pulse" size={24} />
        </div>
      </div>

      <WeeklyHoroscope onSignSelect={handleSignSelect} />
      <LoginComponent />
      {/* <AIChat /> */}
      {/* <NatalChartProps onChartGenerate={handleChartGenerate} /> */}
      {/* <CareerInsights />
      <Compatibility />
      <TarotCards /> */}
    </>
  );
}