'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Star } from 'lucide-react';

const CareerInsights: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [careerInsight, setCareerInsight] = useState<string | null>(null);

  const generateInsight = () => {
    // This is a placeholder. In a real application, you'd call an API or use a more complex algorithm.
    const insights = [
      "Your leadership skills will shine in a management role.",
      "A career in the arts or creative fields may be fulfilling for you.",
      "Your analytical mind is well-suited for a career in science or technology.",
      "You have a natural talent for teaching or mentoring others.",
      "A career involving travel or international relations could be exciting for you."
    ];
    setCareerInsight(insights[Math.floor(Math.random() * insights.length)]);
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-6 pb-6">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed">Career Insights</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full bg-indigo-800 border-indigo-700 text-white rounded-xl my-2"
          placeholder="Your Birth Date"
        />
        <Button
          onClick={generateInsight}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Briefcase className="mr-2" />
          Generate Career Insight
        </Button>

        {careerInsight && (
          <div className="mt-6 p-4 bg-indigo-800 rounded-xl">
            <p className="text-lg"><Star className="inline mr-2" />{careerInsight}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm font-cursive leading-relaxed text-center">
          Discover your cosmic career path
        </p>
      </CardFooter>
    </Card>
  );
};

export default CareerInsights;