'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Zap } from 'lucide-react';

const Compatibility: React.FC = () => {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [compatibility, setCompatibility] = useState<string | null>(null);

  const checkCompatibility = () => {
    // This is a placeholder. In a real application, you'd use more complex logic or an API.
    const compatibilities = [
      "Your signs are highly compatible! You have a strong connection.",
      "There may be some challenges, but also great potential for growth.",
      "Your signs complement each other well, creating a balanced relationship.",
      "You might need to work on communication, but there's definite potential.",
      "Your signs suggest a passionate and exciting relationship!"
    ];
    setCompatibility(compatibilities[Math.floor(Math.random() * compatibilities.length)]);
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-6 pb-6">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed">Cosmic Compatibility</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <Input
          type="text"
          value={sign1}
          onChange={(e) => setSign1(e.target.value)}
          className="w-full bg-pink-800 border-pink-700 text-white rounded-xl my-2"
          placeholder="Your Zodiac Sign"
        />
        <Input
          type="text"
          value={sign2}
          onChange={(e) => setSign2(e.target.value)}
          className="w-full bg-pink-800 border-pink-700 text-white rounded-xl my-2"
          placeholder="Partner's Zodiac Sign"
        />
        <Button
          onClick={checkCompatibility}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Heart className="mr-2" />
          Check Compatibility
        </Button>

        {compatibility && (
          <div className="mt-6 p-4 bg-pink-800 rounded-xl">
            <p className="text-lg"><Zap className="inline mr-2" />{compatibility}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm font-cursive leading-relaxed text-center">
          Explore your cosmic connection
        </p>
      </CardFooter>
    </Card>
  );
};

export default Compatibility;