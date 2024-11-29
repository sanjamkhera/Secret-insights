// src/app/api/horoscopes/route.ts
import { NextResponse } from 'next/server';  // Remove NextRequest import if it's there
import { adminDb } from '../../../lib/firebase-admin';

export async function GET() {  // Remove 'request' parameter
  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = adminDb.collection('dailyHoroscopes').doc(today);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'No horoscope found for today' }, { status: 404 });
    }
    
    return NextResponse.json(doc.data());
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return NextResponse.json({ error: 'Failed to fetch horoscope' }, { status: 500 });
  }
}