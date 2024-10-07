import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const ASTRONOMY_API_URL = 'https://api.astronomyapi.com/api/v2/bodies/positions';
const ASTRONOMY_API_ID = process.env.ASTRONOMY_API_ID;
const ASTRONOMY_API_SECRET = process.env.ASTRONOMY_API_SECRET;

const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

export async function GET(request: NextRequest) {
  // Check if required environment variables are set
  if (!ASTRONOMY_API_ID || !ASTRONOMY_API_SECRET) {
    console.error('Missing ASTRONOMY_API_ID or ASTRONOMY_API_SECRET environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!GEOCODING_API_KEY) {
    console.error('Missing GEOCODING_API_KEY environment variable');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const city = searchParams.get('city');

  if (!date || !time || !city) {
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
    // Geocode the city
    const geocodeResponse = await axios.get(GEOCODING_API_URL, {
      params: {
        q: city,
        key: GEOCODING_API_KEY,
        limit: 1
      }
    });

    if (geocodeResponse.data.results.length === 0) {
      return NextResponse.json({ error: 'Could not find coordinates for the given city' }, { status: 400 });
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry;

    // Make request to Astronomy API
    const astronomyResponse = await axios.get(ASTRONOMY_API_URL, {
      params: {
        latitude: lat.toFixed(4),
        longitude: lng.toFixed(4),
        elevation: 0,
        from_date: formattedDate,
        to_date: formattedDate,
        time: formattedTime
      },
      auth: {
        username: ASTRONOMY_API_ID!, // Non-null assertion
        password: ASTRONOMY_API_SECRET! // Non-null assertion
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json(astronomyResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);

      // Log specific error messages if available
      if (error.response.data && error.response.data.errors) {
        console.error('API Error Messages:', error.response.data.errors);
      }

      // Include more detailed error information in the response
      return NextResponse.json({
        error: 'API request failed',
        details: error.response.data,
        status: error.response.status
      }, { status: error.response.status });
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}