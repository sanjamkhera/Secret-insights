// src/lib/admin-services.ts
import { adminDb } from './firebase-admin';
import { DailyHoroscope } from '../types';

const HOROSCOPES_COLLECTION = 'dailyHoroscopes';

export async function storeDailyHoroscope(horoscope: DailyHoroscope, date: string) {
  try {
    await adminDb.collection(HOROSCOPES_COLLECTION).doc(date).set(horoscope);
    return true;
  } catch (error) {
    console.error('Error storing horoscope:', error);
    return false;
  }
}