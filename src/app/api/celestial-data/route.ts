import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const ASTRONOMY_API_URL = 'https://api.astronomyapi.com/api/v2/bodies/positions';
const ASTRONOMY_API_ID = process.env.ASTRONOMY_API_ID;
const ASTRONOMY_API_SECRET = process.env.ASTRONOMY_API_SECRET;

// Vancouver coordinates
const VANCOUVER_LAT = 49.2827;
const VANCOUVER_LNG = -123.1207;

export async function GET(request: NextRequest) {
  if (!ASTRONOMY_API_ID || !ASTRONOMY_API_SECRET) {
    console.error('Missing ASTRONOMY_API_ID or ASTRONOMY_API_SECRET environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  if (!date || !time) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Validate and format date
  const currentDate = new Date();
  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }
  const formattedDate = inputDate.toISOString().split('T')[0];

  // Validate and format time
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    return NextResponse.json({ error: 'Invalid time format. Use HH:mm' }, { status: 400 });
  }
  const formattedTime = `${time}:00`;

  try {
    const astronomyResponse = await axios.get(ASTRONOMY_API_URL, {
      params: {
        latitude: VANCOUVER_LAT,
        longitude: VANCOUVER_LNG,
        elevation: 0,
        from_date: formattedDate,
        to_date: formattedDate,
        time: formattedTime
      },
      auth: {
        username: ASTRONOMY_API_ID,
        password: ASTRONOMY_API_SECRET
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json(astronomyResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });

      return NextResponse.json({
        error: 'API request failed',
        details: error.response.data,
        status: error.response.status
      }, { status: error.response.status });
    }
    
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}