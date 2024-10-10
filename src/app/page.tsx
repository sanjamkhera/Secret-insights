"use client"

import React from 'react';
import WeeklyHoroscope from '@/components/WeeklyHoroscope';
import { ZodiacSign } from '@/types';
import LoginComponent from '@/components/LoginComponent';
import { Sun, Moon, Star, Sparkles, Eclipse, SunMoon, Zap } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const handleSignSelect = (sign: ZodiacSign) => {
    console.log(sign);
  };

  return (
    <>
      <div className="w-screen">
        <div className='text-center pt-4 pb-2 mb-2'>
          <h1 className="text-4xl font-bold leading-relaxed text-gray-200 pt-2">Celestial Insights</h1>
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
      </div>
      <ToastContainer />
    </>
  );
}