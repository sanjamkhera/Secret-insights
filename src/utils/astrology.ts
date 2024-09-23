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
  apiData: any // eslint-disable-line @typescript-eslint/no-explicit-any
): ZodiacSign {
  const eastHorizon = findEastHorizon(apiData);
  return determineAscendantSign(eastHorizon);
}

function findEastHorizon(apiData: any): { constellation: string, azimuth: number } { // eslint-disable-line @typescript-eslint/no-explicit-any
  let closestToEast = { constellation: '', azimuth: 0, difference: 360 };

  apiData.table.rows.forEach((row: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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

export function getSunSign(apiData: any): ZodiacSign { // eslint-disable-line @typescript-eslint/no-explicit-any
  const sunData = apiData.table.rows.find((row: any) => row.entry.id === 'sun'); // eslint-disable-line @typescript-eslint/no-explicit-any
  const rightAscension = parseFloat(sunData.cells[0].position.equatorial.rightAscension.hours);
  
  let eclipticLongitude = (rightAscension * 15);
  if (eclipticLongitude < 0) {
    eclipticLongitude += 360;
  }
  
  return determineZodiacSign(eclipticLongitude);
}

function determineZodiacSign(eclipticLongitude: number): ZodiacSign {
  const signs: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const signIndex = Math.floor(eclipticLongitude / 30);
  return signs[signIndex];
}

export function getMoonSign(apiData: any): ZodiacSign { // eslint-disable-line @typescript-eslint/no-explicit-any
  const moonData = apiData.table.rows.find((row: any) => row.entry.id === 'moon'); // eslint-disable-line @typescript-eslint/no-explicit-any
  const rightAscension = parseFloat(moonData.cells[0].position.equatorial.rightAscension.hours);
  
  let eclipticLongitude = (rightAscension * 15);
  if (eclipticLongitude < 0) {
    eclipticLongitude += 360;
  }
  
  return determineZodiacSign(eclipticLongitude);
}