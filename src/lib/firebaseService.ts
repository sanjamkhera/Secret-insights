// src/lib/firebaseService.ts
import { DailyHoroscope } from '../types';

export async function getTodayHoroscope(): Promise<DailyHoroscope | null> {
  try {
    const response = await fetch('/api/horoscopes');
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error getting horoscope:', error);
    return null;
  }
}