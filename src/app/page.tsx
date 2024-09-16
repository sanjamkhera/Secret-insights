"use client"

// Import necessary dependencies
import React from 'react';
// Import the DailyHoroscope component from the components folder
import DailyHoroscope from '@/components/DailyHoroscope';
// Import the ZodiacSign type from the types file
import { ZodiacSign } from '@/types';
// Import the NatalChart component from the components folder
import NatalChartProps from '@/components/NatalChartProps';

// Define the main Home component as the default export
export default function Home() {
  // Define a function to handle zodiac sign selection
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

  // Render the component
  return (
    <>
      <DailyHoroscope onSignSelect={handleSignSelect} />
      <NatalChartProps onChartGenerate={handleChartGenerate} />
    </>
  );
}