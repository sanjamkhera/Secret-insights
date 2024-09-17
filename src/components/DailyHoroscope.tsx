'use client'

import React, { useState } from 'react';
import { ZodiacSign, DailyHoroscope as DailyHoroscopeType } from '@/types';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Star, Sparkles, Heart, Eclipse, SunMoon, Zap } from 'lucide-react';

interface DailyHoroscopeProps {
  onSignSelect: (sign: ZodiacSign) => void;
}

const DailyHoroscope: React.FC<DailyHoroscopeProps> = ({ onSignSelect }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [horoscope, setHoroscope] = useState<DailyHoroscopeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const zodiacSigns: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const getHoroscope = async () => {
    if (!selectedSign) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const horoscopeTemplates = [
      `Today, you may feel a strong pull towards {activity}. Trust your instincts, as they will guide you towards {positive_outcome}. However, be cautious of {negative_event}. Balance is key.`,
      `Your interactions with {relationship} today could be particularly {emotion}. Be open to {communication}, as it will strengthen your bond.`,
      `{opportunity} may present itself at work today, requiring you to show {quality}. Don't hesitate to take the lead, but ensure you {warning}.`,
      `Your body may be signaling {need} today. Be mindful of {health_activity}, and take time to {self_care} for your overall well-being.`,
      `Emotional clarity is on the horizon, especially in regard to {personal_matter}. Reflect on your {intuition}, as they hold the answers you seek.`,
      `Today, fortune may smile upon you in the realm of {lucky_area}. Keep an eye out for {specific_opportunity}, but remain grounded to avoid {caution}.`,
      `You may face a challenge related to {challenge_area} today. Approach it with {strategy}, and remember that {positive_advice}.`,
      `Today offers a chance for spiritual reflection. Meditate on your {beliefs}, and embrace the journey, knowing that {uplifting_message}.`,
      `If you're in a relationship, today may bring {relationship_event}. Single? Be open to {possibility}, as the stars suggest new connections are on the horizon.`,
      `Growth is your theme today. Reflect on where you've come from and where you're heading, but remember that {balance_advice}.`,
      `Today is ideal for reconnecting with {social_group}. Your social interactions will be {social_emotion}, helping you gain new perspectives on {topic}.`,
      `A conflict with {conflict_source} may arise, but don't let it unsettle you. Approach it with {conflict_strategy}, and you'll find resolution.`
    ];

    const selectedTemplate = horoscopeTemplates[Math.floor(Math.random() * horoscopeTemplates.length)];
    const horoscopeContent = selectedTemplate
      .replace('{sign}', selectedSign)
      .replace('{activity}', ['creativity', 'introspection', 'socializing', 'learning'][Math.floor(Math.random() * 4)])
      .replace('{positive_outcome}', ['success', 'personal growth', 'new opportunities', 'inner peace'][Math.floor(Math.random() * 4)])
      .replace('{negative_event}', ['stress', 'misunderstandings', 'distractions', 'self-doubt'][Math.floor(Math.random() * 4)])
      .replace('{relationship}', ['partner', 'friends', 'family', 'colleagues'][Math.floor(Math.random() * 4)])
      .replace('{emotion}', ['heartfelt', 'challenging', 'enlightening', 'harmonious'][Math.floor(Math.random() * 4)])
      .replace('{communication}', ['honest conversations', 'compromise', 'active listening', 'expressing gratitude'][Math.floor(Math.random() * 4)])
      .replace('{opportunity}', ['A new project', 'A leadership role', 'A creative task', 'A collaborative effort'][Math.floor(Math.random() * 4)])
      .replace('{quality}', ['leadership', 'creativity', 'patience', 'adaptability'][Math.floor(Math.random() * 4)])
      .replace('{warning}', ['don\'t rush through the details', 'consider all perspectives', 'maintain work-life balance', 'communicate clearly'][Math.floor(Math.random() * 4)])
      .replace('{need}', ['rest', 'activity', 'emotional support', 'mental stimulation'][Math.floor(Math.random() * 4)])
      .replace('{health_activity}', ['your diet', 'your exercise routine', 'your sleep schedule', 'your stress levels'][Math.floor(Math.random() * 4)])
      .replace('{self_care}', ['meditate', 'exercise', 'connect with loved ones', 'engage in a hobby'][Math.floor(Math.random() * 4)])
      .replace('{personal_matter}', ['your goals', 'a past decision', 'your relationships', 'your career path'][Math.floor(Math.random() * 4)])
      .replace('{intuition}', ['feelings', 'gut instincts', 'inner voice', 'emotional responses'][Math.floor(Math.random() * 4)])
      .replace('{lucky_area}', ['finance', 'love', 'career', 'personal growth'][Math.floor(Math.random() * 4)])
      .replace('{specific_opportunity}', ['a chance encounter', 'an unexpected offer', 'a moment of inspiration', 'a helpful connection'][Math.floor(Math.random() * 4)])
      .replace('{caution}', ['overconfidence', 'neglecting important details', 'making hasty decisions', 'overlooking others\' needs'][Math.floor(Math.random() * 4)])
      .replace('{challenge_area}', ['work', 'relationships', 'personal goals', 'communication'][Math.floor(Math.random() * 4)])
      .replace('{strategy}', ['patience', 'creativity', 'determination', 'open-mindedness'][Math.floor(Math.random() * 4)])
      .replace('{positive_advice}', ['every obstacle is a chance for growth', 'challenges make you stronger', 'difficult times often lead to breakthroughs', 'perseverance always pays off'][Math.floor(Math.random() * 4)])
      .replace('{beliefs}', ['core values', 'long-term goals', 'personal philosophy', 'life purpose'][Math.floor(Math.random() * 4)])
      .replace('{uplifting_message}', ['every step brings you closer to your true self', 'you are constantly evolving and improving', 'your journey is uniquely beautiful', 'you have the power to create positive change'][Math.floor(Math.random() * 4)])
      .replace('{relationship_event}', ['deeper affection', 'important conversations', 'shared adventures', 'mutual understanding'][Math.floor(Math.random() * 4)])
      .replace('{possibility}', ['unexpected encounters', 'new social circles', 'self-discovery', 'pursuing a passion'][Math.floor(Math.random() * 4)])
      .replace('{balance_advice}', ['not all progress needs to be rushed', 'small steps are still moving forward', 'rest is as important as action', 'appreciate how far you\'ve come'][Math.floor(Math.random() * 4)])
      .replace('{social_group}', ['old friends', 'family members', 'professional contacts', 'community groups'][Math.floor(Math.random() * 4)])
      .replace('{social_emotion}', ['enlightening', 'energizing', 'comforting', 'inspiring'][Math.floor(Math.random() * 4)])
      .replace('{topic}', ['your future plans', 'your personal growth', 'your relationships', 'your life philosophy'][Math.floor(Math.random() * 4)])
      .replace('{conflict_source}', ['a coworker', 'a friend', 'a family member', 'an inner conflict'][Math.floor(Math.random() * 4)])
      .replace('{conflict_strategy}', ['calm diplomacy', 'honest communication', 'empathy and understanding', 'self-reflection'][Math.floor(Math.random() * 4)]);

    setHoroscope({
      content: horoscopeContent,
      mood: ['Inspired', 'Contemplative', 'Energized', 'Serene', 'Determined', 'Optimistic'][Math.floor(Math.random() * 6)],
      luckyNumber: Math.floor(Math.random() * 100) + 1,
      compatibility: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)],
    });
    onSignSelect(selectedSign);
    setIsLoading(false);
  };

  return (
    <Card className="bg-black bg-opacity-60 text-white shadow-lg font-sans border-black-400 border-2 w-[350px] mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform mb-8">
      <CardHeader className="pb-2 bg-gradient-to-b from-indigo-950 to-transparent">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 font-cursive leading-relaxed text-white">Celestial Insights</h1>
          <p className="text-xl font-fancy leading-relaxed text-white">Unlock the wisdom of the stars</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Sun className="text-yellow-300 animate-spin-slow" size={24} />
            <Moon className="text-blue-300 animate-pulse" size={24} />
            <Star className="text-cyan-300 animate-twinkle" size={24} />
            <Eclipse className="text-orange-300 animate-pulse" size={24} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4">
        <Select onValueChange={(value) => setSelectedSign(value as ZodiacSign)}>
          <SelectTrigger className="w-full bg-blue-900 border-blue-700 text-white rounded-xl my-4">
            <SelectValue placeholder="Select Your Zodiac Sign" />
          </SelectTrigger>
          <SelectContent className="bg-blue-900 text-white rounded-xl">
            {zodiacSigns.map((sign) => (
              <SelectItem key={sign} value={sign} className="hover:bg-blue-800">{sign}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={getHoroscope}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          disabled={!selectedSign || isLoading}
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Consulting the Celestial Spheres...
            </>
          ) : (
            'Reveal My Celestial Horoscope'
          )}
        </Button>

        {horoscope && (
          <div className="space-y-4 mt-4">
            <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 border-blue-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center">
                <SunMoon className="mr-2 text-yellow-300" size={20} />
              </CardHeader>
              <CardContent>
                <p className="text-lg text-justify">{horoscope.content}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 border-purple-800 text-white text-center rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center">
                <Zap className="mr-2 text-purple-300" size={20} />
              </CardHeader>
              <CardContent>
                <p>Cosmic Mood: {horoscope.mood}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-950 via-blue-950 to-cyan-950 border-indigo-800 text-white text-center rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center">
                <Sparkles className="mr-2 text-yellow-300" size={20} />
              </CardHeader>
              <CardContent>
                <p>Cosmic Number: {horoscope.luckyNumber}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 border-pink-800 text-white text-center rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center">
                <Heart className="mr-2 text-red-500" size={20} />
              </CardHeader>
              <CardContent>
                <p>Compatible with: {horoscope.compatibility}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-base font-cursive leading-relaxed text-white text-center">
          Follow your path and reach for the stars
        </p>
      </CardFooter>

    </Card>
  );
};

export default DailyHoroscope;