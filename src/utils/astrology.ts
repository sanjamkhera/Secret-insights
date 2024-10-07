import { CelestialData, ZodiacSign, ZodiacPosition } from '@/types/celestialData';
import * as astronomia from 'astronomia';

const constellationToZodiac: { [key: string]: ZodiacSign } = {
  // Standard zodiac constellations
  "Aries": "Aries",
  "Taurus": "Taurus",
  "Gemini": "Gemini",
  "Cancer": "Cancer",
  "Leo": "Leo",
  "Virgo": "Virgo",
  "Libra": "Libra",
  "Scorpius": "Scorpio", // Note: Astronomical constellation is "Scorpius", astrological sign is "Scorpio"
  "Sagittarius": "Sagittarius",
  "Capricornus": "Capricorn", // Note: Astronomical constellation is "Capricornus", astrological sign is "Capricorn"
  "Aquarius": "Aquarius",
  "Pisces": "Pisces",

  // Additional constellations that might appear near the ecliptic
  "Ophiuchus": "Scorpio", // Ophiuchus is often associated with Scorpio in astrology
  "Cetus": "Aries", // Cetus is near Aries
  "Orion": "Gemini", // Orion is near Gemini
  "Sextans": "Leo", // Sextans is near Leo
  "Corvus": "Virgo", // Corvus is near Virgo
  "Crater": "Virgo", // Crater is also near Virgo
  "Hydra": "Cancer", // Hydra spans several signs, but often associated with Cancer
  "Hercules": "Scorpio", // Hercules is near Scorpio
  "Serpens": "Scorpio", // Serpens is associated with Ophiuchus, hence Scorpio
  "Pegasus": "Pisces", // Pegasus is near Pisces
  "Auriga": "Taurus", // Auriga is near Taurus
  "Perseus": "Taurus", // Perseus is also near Taurus
  "Canis Major": "Cancer", // Canis Major is somewhat near Cancer
  "Canis Minor": "Cancer", // Canis Minor is also somewhat near Cancer
};

function getBodyPosition(data: CelestialData, bodyId: string): ZodiacPosition {
  const body = data.table.rows.find(row => row.entry.id === bodyId);
  if (!body || !body.cells[0]) {
    console.error(`${bodyId} data not found`);
    return { sign: "Aries", degree: 0 };
  }
  
  const constellation = body.cells[0].position.constellation.name;
  const sign = constellationToZodiac[constellation] || constellation as ZodiacSign;
  
  // Extract degree from the data if available, or use a placeholder
  const degree = 0; // This should be replaced with actual degree data if available

  return { sign, degree };
}

export function getSunSign(data: CelestialData): ZodiacPosition {
  return getBodyPosition(data, 'sun');
}

export function getMoonSign(data: CelestialData): ZodiacPosition {
  return getBodyPosition(data, 'moon');
}

export function calculateAscendant(data: CelestialData): ZodiacPosition {
  if (!data.observer || !data.observer.location) {
    console.error('Observer location is missing in the celestial data');
    return { sign: "Aries", degree: 0 };
  }

  const { longitude, latitude } = data.observer.location;
  const date = new Date(data.dates?.from || new Date());

  // Convert date to Julian day
  const jd = astronomia.julian.DateToJD(date);

  // Calculate Local Sidereal Time (LST)
  // const lst = astronomia.sidereal.apparent(jd, longitude);

  // Calculate the obliquity of the ecliptic
  const obliquity = astronomia.nutation.meanObliquity(jd);

  // Calculate the ascendant
  // Note: We're using a different method to calculate the ascendant since 
  // astronomia.coord.ascendant is not available
  const ramc = astronomia.sidereal.apparent(jd, longitude) * 15; // Convert hours to degrees
  const tanAscendant = Math.tan(ramc * Math.PI / 180) / (Math.cos(obliquity * Math.PI / 180) + 
                       Math.sin(obliquity * Math.PI / 180) * Math.tan(latitude * Math.PI / 180) * 
                       Math.sin(ramc * Math.PI / 180));
  let ascendant = Math.atan(tanAscendant) * 180 / Math.PI;
  if (Math.cos(ramc * Math.PI / 180) < 0) {
    ascendant += 180;
  }
  ascendant = (ascendant + 360) % 360;

  // Convert ascendant to zodiac sign and degree
  const signIndex = Math.floor(ascendant / 30);
  const degree = ascendant % 30;
  
  const zodiacSigns: ZodiacSign[] = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                                     "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  return {
    sign: zodiacSigns[signIndex],
    degree: parseFloat(degree.toFixed(2))
  };
}