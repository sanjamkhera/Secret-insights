'use client'

import React, { useState } from 'react';
import { ZodiacSign } from '@/types';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

interface WeeklyHoroscopeProps { onSignSelect: (sign: ZodiacSign) => void; }

const WeeklyHoroscope: React.FC<WeeklyHoroscopeProps> = ({ onSignSelect }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [revealedSign, setRevealedSign] = useState<ZodiacSign | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const zodiacSigns: { sign: ZodiacSign, dateRange: string }[] = [
    { sign: 'Aries', dateRange: 'March 21-April 19' },
    { sign: 'Taurus', dateRange: 'April 20-May 20' },
    { sign: 'Gemini', dateRange: 'May 21-June 20' },
    { sign: 'Cancer', dateRange: 'June 21-July 22' },
    { sign: 'Leo', dateRange: 'July 23-Aug. 22' },
    { sign: 'Virgo', dateRange: 'Aug. 23-Sept. 22' },
    { sign: 'Libra', dateRange: 'Sept. 23-Oct. 22' },
    { sign: 'Scorpio', dateRange: 'Oct. 23-Nov. 21' },
    { sign: 'Sagittarius', dateRange: 'Nov. 22-Dec. 21' },
    { sign: 'Capricorn', dateRange: 'Dec. 22-Jan. 19' },
    { sign: 'Aquarius', dateRange: 'Jan. 20-Feb. 18' },
    { sign: 'Pisces', dateRange: 'Feb. 19-March 20' }
  ];

  const zodiacImages: { [key in ZodiacSign]: string } = {
    Aries: '/aries.png',
    Taurus: '/taurus.png',
    Gemini: '/gemini.png',
    Cancer: '/cancer.png',
    Leo: '/leo.png',
    Virgo: '/virgo.png',
    Libra: '/libra.png',
    Scorpio: '/scorpio.png',
    Sagittarius: '/sagittarius.png',
    Capricorn: '/capricorn.png',
    Aquarius: '/aquarius.png',
    Pisces: '/pisces.png'
  };

  const getZodiacImage = (sign: ZodiacSign): string => {
    return zodiacImages[sign] || '/default.png';
  };

  const horoscopes: { [key in ZodiacSign]: string } = {
    Aries: `This is a beneficial year for you because Jupiter is in your House of Communications increasing your contacts with neighbours, siblings and relatives. It will bring you chances to learn by taking courses or going back to school. Most of you will read, write and study more than usual this year. Jupiter will also boost the quality and warmth of your relations with siblings and relatives. In addition, it will boost your daily optimism, which is why your plans for the future are now bigger and more adventurous! "To infinity and beyond!" Incidentally, Jupiter is also called Jove, which is the origin of the word "jovial." This is why you're happier this year! (Not too shabby.)`,
    Taurus: `This is a great year because you are the financial wizard of the zodiac and this year Jupiter, planet of expansion and wealth, is in your Money House! You're getting richer! Money will come to you this year. (Keep in mind this blessing continues until next summer 2025.) You might inherit or be gifted money or assets. You might find a better paying job. You might get a raise. You might even feel richer and more entitled because you buy yourself something special. To put a more subtle spin on all this, Jupiter will enrich you in ways that you most value, which might mean knowledge and a deeper understanding of what is really important to you. Lucky you!`,
    Gemini: `Naturally this is a fabulous year for you because lucky Jupiter is in your sign for the first time since 2012-2013. (Read All Signs above to see if the years when Jupiter was in your sign have any specific relevance for you.) This is because Jupiter in your sign attracts people and resources to you! It also gives you opportunities to learn and gain new experiences. In a nutshell, it means life is fortunate for you in your everyday experiences, because gifts, goodies and favours from others will come your way. You might have more opportunities to travel. You will certainly do something that expands your world and your enjoyment of friends and family. Major bonus!`,
    Cancer: `Right now, Jupiter is in the part of your chart that deals with your inner world, your spiritual and religious values. It also deals with aspects of yourself that you might refuse to see. (In a strange way, we often deny our good fortune and our blessings either because we take them for granted or we're afraid to jinx anything.) The blessing of Jupiter for you this year is it encourages you to look compassionately at yourself and others. This is a blessing because your increased sensitivity and kindness to others will benefit you because "what goes around, comes around." (Natch!) Therefore, the kindness you practice now - will be returned to you in even greater measure in the future.`,
    Leo: `Until next summer, Jupiter will continue to boost your popularity and heighten your interest in groups and organizations. (You might join an organization to share like-minded ideas and activities.) This also means friends and groups will help and benefit you, which in turn, means it's to your advantage to work with others. Jupiter will also heighten your idealism and make you want to improve the world. (You might become involved with charitable organizations.) Jupiter will boost your confidence about making more ambitious goals because you will believe that you can achieve something that matters. Note: Whatever you put out will come back to you in even greater quantity.`,
    Virgo: `Check the dates of when Jupiter was in Gemini (see All Signs above). Each of these times will be when Jupiter was at the top of your chart making you look successful in your career or your standing in your community. Jupiter will attract promotions, awards, kudos or acknowledgement to you during these times. Jupiter makes you look successful in the eyes of others, which means something is probably happening to create this impression. It's definitely a time for you to "get ahead." For some of you, it's also an opportunity to change your line of work to something like medicine, healing, the law, higher education or travel. An auspicious blessing indeed!`,
    Libra: `Jupiter is associated with travel and foreign countries; and this year, it is sitting in the part of your chart that deals with travel, exploration and learning more about the world. Double whammy! This is why you might travel more than usual this year or the first half of next year. You want to broaden your horizons in any way possible! You might get further education. You might also explore opportunities in publishing, the media, medicine and the law because these will exist for you as well. Publish that book! Your interest in philosophy, metaphysics and religion might also be stronger this year and next. ("Pay no attention to that man behind the curtain.")`,
    Scorpio: `Every six years, Jupiter will be in either Gemini or Sagittarius, and when this occurs, you will get richer. Right now, Jupiter is in your Eighth House, which concerns shared property, shared wealth, inheritances and benefits from the wealth and resources of others, especially your partner. This is the classic time to inherit money. You might get money back from the government. You might also become enriched indirectly because your partner gets a bonus or makes more money. Jupiter is often associated with healing - as is the Eighth House. That means this double combination makes this year and next a wonderful time to heal from physical or psychological challenges.`,
    Sagittarius: `This year Jupiter is opposite your sign, in your House of Partnerships. That makes this year (and next) one of the best times to get married! It also means that all kinds of partnerships (professional or personal) will help you and benefit your life. Others will be more supportive. This is why working with others is a wise option for you this year. (This is not the time to go it alone.) Likewise, this year and next are excellent times to seek out the services of an expert or counsellor or an astrologer. Jupiter will also favour legal outcomes for you. If you do marry under this influence, likely your partner will be older or more well-established.`,
    Capricorn: `This is the perfect year to improve your job! You can get better duties, or better working conditions, or get a raise or a promotion. Or you can get a better job if you don't improve your existing job. Without question, this is the best year (and next year) to look for a job in over a decade! In the same vein (but the other arm), this is an excellent year to improve your health. You might choose to do this by stopping harmful habits and encouraging better ones through healthier diet or more exercise. Many of you will also enjoy the benefits of having a pet this year. Or you might be blessed because a new pet comes your way? These are all examples of the good fortune that you can expect this year.`,
    Aquarius: `You are fortunate because this year Jupiter is in the most fun-filled, creative part of your chart -- your Fifth House, which is all about vacations, the creative arts, the entertainment world, the hospitality industry, plus, schmoozing, partying, exploring sports events and fun activities with kids. Jupiter is igniting your creative expression! Give yourself permission to sing, dance, draw or do what makes you feel good. Children happily express their creativity through dance, singing and drawing. Sadly, we adults think these activities might be a waste of time. Not so! Express your creative energies because it's good for your soul and your health.`,
    Pisces: `This is the best year in over a decade for you to improve where you live by doing something to your home. You might redecorate or renovate or expand it in some way. Some of you will actually move by buying something else or renting something different. The bottom line is simply that you will somehow derive more pride and more enjoyment from your home. Likewise, family will be a greater source of joy for you; and family members will be more generous to each other. You might entertain family at home more than you usual or you might enjoy a vacation with family members. George Burns said happiness is having a warm, loving, caring family - in another city.`
  };

  const getHoroscope = () => {
    if (!selectedSign) return;

    setIsLoading(true);
    setTimeout(() => {
      setRevealedSign(selectedSign);
      onSignSelect(selectedSign);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="bg-transparent text-white shadow-lg font-sans border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform">
      <CardHeader className="pb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-cursive leading-relaxed text-gray-200">Weekly Horoscope</h1>
          <p className="text-lg font-cursive tracking-wide text-gray-200">(October 6)</p>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <Select onValueChange={(value) => setSelectedSign(value as ZodiacSign)}>
          <SelectTrigger className="w-full bg-blue-900 border-blue-700 text-white rounded-xl my-4">
            <SelectValue placeholder="Select Your Zodiac Sign" />
          </SelectTrigger>
          <SelectContent className="bg-blue-900 text-white rounded-xl">
            {zodiacSigns.map(({ sign, dateRange }) => (
              <SelectItem key={sign} value={sign} className="hover:bg-blue-800">
                {sign} ({dateRange})
              </SelectItem>
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
            'Reveal My Celestial Horoscope'.replace("'", "&#39;")
          )}
        </Button>

        {revealedSign && (
          <div className="space-y-4 mt-4">
            <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 border-blue-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn">
              <CardHeader className="pb-2 flex items-center justify-center">
                <Image
                  src={getZodiacImage(revealedSign as ZodiacSign)}
                  alt={revealedSign}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/default.png';
                    console.error(`Failed to load image for ${revealedSign}`);
                  }}
                />
              </CardHeader>
              <CardContent>
                <p className="text-lg text-center font-bold">{zodiacSigns.find(z => z.sign === revealedSign)?.dateRange}</p>
                <p className="text-lg text-justify">{horoscopes[revealedSign as ZodiacSign]}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="bg-gradient-to-br from-green-950 via-teal-950 to-blue-950 border-green-800 text-white rounded-2xl transition-all duration-500 ease-in-out animate-fadeIn mt-4">
          <CardHeader className="pb-2">
            <h2 className="text-2xl font-bold text-center">All Signs</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-justify">
              The planet Jupiter is associated with wealth, good fortune and increase. It also represents the glue that holds society together through laws, religions, libraries and universities. Jupiter aspires to a higher expression of ourselves. Every 12 years, it stays in one sign for a year, bringing us different benefits and opportunities. Right now, Jupiter is in Gemini from May 2024 until June 2025. (The last time Jupiter was in Gemini was June 2012 to July 2013.) Before that it was from 2000 to 2001; from 1989 to 1990; and from 1977 to 1978. Small wonder it&#39;s the largest planet in our solar system. In fact, Jupiter is so big, you could fit ALL the other planets inside it -- and still have room for three sesame seeds and the heart of a Hollywood producer.
            </p>
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter className="justify-center pb-4">
        <p className="text-sm sm:text-lg font-cursive leading-relaxed text-white text-center">
          Follow your path and reach for the stars
        </p>
      </CardFooter>
    </Card>
  );
};

export default WeeklyHoroscope;