import { CelestialData, CelestialBodyData } from '@/types/celestialData';
import { ZodiacSign } from '../types';

const zodiacSigns: ZodiacSign[] = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export function calculateAscendant(
  date: Date,
  time: string,
  latitude: number,
  longitude: number,
  apiData: CelestialData
): ZodiacSign {
  const eastHorizon = findEastHorizon(apiData);
  return determineAscendantSign(eastHorizon);
}

function findEastHorizon(apiData: CelestialData): { constellation: string, azimuth: number } {
  let closestToEast = { constellation: '', azimuth: 0, difference: 360 };

  apiData.table.rows.forEach((row: CelestialBodyData) => {
    const cell = row.cells[0];
    const azimuth = parseFloat(cell.position.horizontal.azimuth.degrees);
    const difference = Math.abs(azimuth - 90);

    if (difference < closestToEast.difference) {
      closestToEast = {
        constellation: cell.position.constellation.name,
        azimuth: azimuth,
        difference: difference
      };
    }
  });

  return closestToEast;
}

function determineAscendantSign(eastHorizon: { constellation: string, azimuth: number }): ZodiacSign {
  const { constellation, azimuth } = eastHorizon;

  // If the azimuth is very close to 90 degrees, we can be more confident
  if (Math.abs(azimuth - 90) < 5) {
    return constellation as ZodiacSign;
  }

  // If the azimuth is less than 90, the ascendant might be the previous sign
  if (azimuth < 90) {
    const index = zodiacSigns.indexOf(constellation as ZodiacSign);
    return index > 0 ? zodiacSigns[index - 1] : zodiacSigns[zodiacSigns.length - 1];
  }

  // If the azimuth is greater than 90, we stick with the found constellation
  return constellation as ZodiacSign;
}

export function getSunSign(apiData: CelestialData): ZodiacSign {
  const sunData = apiData.table.rows.find(row => row.entry.id === 'sun');
  if (!sunData) {
    console.error('Sun data not found in the API response');
    return 'Aries'; // Default to Aries if sun data is not found
  }
  
  const rightAscension = parseFloat(sunData.cells[0].position.equatorial.rightAscension.hours);
  
  let eclipticLongitude = (rightAscension * 15);
  if (eclipticLongitude < 0) {
    eclipticLongitude += 360;
  }
  
  return determineZodiacSign(eclipticLongitude);
}

function determineZodiacSign(eclipticLongitude: number): ZodiacSign {
  const signIndex = Math.floor(eclipticLongitude / 30);
  return zodiacSigns[signIndex];
}

export function getMoonSign(apiData: CelestialData): ZodiacSign {
  const moonData = apiData.table.rows.find(row => row.entry.id === 'moon');
  if (!moonData) {
    console.error('Moon data not found in the API response');
    return 'Aries'; // Default to Aries if moon data is not found
  }
  
  const rightAscension = parseFloat(moonData.cells[0].position.equatorial.rightAscension.hours);
  
  let eclipticLongitude = (rightAscension * 15);
  if (eclipticLongitude < 0) {
    eclipticLongitude += 360;
  }
  
  return determineZodiacSign(eclipticLongitude);
}