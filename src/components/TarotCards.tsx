'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Coffee } from 'lucide-react';

const tarotCards = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

const TarotCards: React.FC = () => {
  const [drawnCard, setDrawnCard] = useState<string | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  const drawCard = () => {
    const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    setDrawnCard(card);
    
    // This is a placeholder. In a real application, you'd have more detailed interpretations.
    const interpretations = [
      "This card suggests new beginnings and opportunities in your life.",
      "You may be facing a significant decision or crossroads.",
      "It's time for introspection and trusting your intuition.",
      "Success and abundance are on the horizon for you.",
      "This card indicates a need for balance and moderation in your life."
    ];
    setInterpretation(interpretations[Math.floor(Math.random() * interpretations.length)]);
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mt-6 pb-6">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3 font-cursive leading-relaxed">Tarot Reading</h1>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <Button
          onClick={drawCard}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Coffee className="mr-2" />
          Draw a Tarot Card
        </Button>

        {drawnCard && (
          <div className="mt-6 p-4 bg-purple-800 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-2">{drawnCard}</h2>
            <p className="text-lg"><Sparkles className="inline mr-2" />{interpretation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm font-cursive leading-relaxed text-center">
          Unveil the mysteries of the tarot
        </p>
      </CardFooter>
    </Card>
  );
};

export default TarotCards;