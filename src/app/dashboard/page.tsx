'use client'
import React from 'react';
import WeeklyHoroscope from '@/components/WeeklyHoroscope';
import NatalChart from '@/components/NatalChart';
import Compatibility from '@/components/Compatibility';
import CareerInsights from '@/components/CareerInsights';
import TarotCards from '@/components/TarotCards';
import AIChat from '@/components/AIChat';
import { ZodiacSign } from '@/types';

const Dashboard: React.FC = () => {

  const handleSignSelect = (sign: ZodiacSign) => {
    // Log the selected sign to the console
    console.log(sign);
    // Add any additional logic here when a sign is selected
  };

  // Define a function to handle natal chart generation
  const handleChartGenerate = (birthInfo: { date: string; time: string; location: string }) => {
    // Log the birth information to the console
    console.log(birthInfo);
    // Add any additional logic here when a chart is generated
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Celestial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyHoroscope onSignSelect={handleSignSelect} />
        <NatalChart onChartGenerate={handleChartGenerate} />
        <Compatibility />
        <CareerInsights />
        <TarotCards />
        <AIChat />
      </div>
    </div>
  );
};

export default Dashboard;