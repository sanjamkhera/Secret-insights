export type ZodiacSign = 
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

type HoroscopeData = {
  [K in Lowercase<ZodiacSign>]: string;
};

export interface DailyHoroscope extends HoroscopeData {
  date: string;
}