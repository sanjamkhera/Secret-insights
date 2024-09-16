import { Timestamp } from 'firebase/firestore';

export type ZodiacSign = 
  'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface User {
  id: string;
  email: string;
  displayName: string;
  dateOfBirth: Timestamp;
  zodiacSign: ZodiacSign;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  preferences: {
    notificationsEnabled: boolean;
    theme: 'light' | 'dark';
  };
}

export interface DailyHoroscope {
  content: string;
  mood: string;
  luckyNumber: number;
  compatibility: ZodiacSign;
}

export interface UserReading {
  id: string;
  userId: string;
  date: Timestamp;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  content: string;
  savedAt: Timestamp;
}

export interface ZodiacSignInfo {
  name: ZodiacSign;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  quality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  symbol: string;
  dateRange: {
    start: string; // MM-DD format
    end: string; // MM-DD format
  };
}

export interface PlanetaryPositions {
  date: string; // YYYY-MM-DD format
  sun: string;
  moon: string;
  mercury: string;
  venus: string;
  mars: string;
  jupiter: string;
  saturn: string;
  uranus: string;
  neptune: string;
  pluto: string;
}

export interface AstrologicalEvent {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  description: string;
  affectedSigns: ZodiacSign[];
}