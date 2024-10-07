export interface CelestialBodyPosition {
  horizontal: {
    altitude: {
      degrees: string;
      string: string;
    };
    azimuth: {
      degrees: string;
      string: string;
    };
  };
  equatorial: {
    rightAscension: {
      hours: string;
      string: string;
    };
    declination: {
      degrees: string;
      string: string;
    };
  };
  constellation: {
    id: string;
    short: string;
    name: string;
  };
}

export interface CelestialBodyCell {
  date: string;
  id: string;
  name: string;
  distance: {
    fromEarth: {
      au: string;
      km: string;
    };
  };
  position: CelestialBodyPosition;
  extraInfo: {
    elongation: number;
    magnitude: number;
    phase?: {
      angel: string;
      fraction: string;
      string: string;
    };
  };
}

export interface CelestialBodyRow {
  entry: {
    id: string;
    name: string;
  };
  cells: CelestialBodyCell[];
}

export interface CelestialData {
  dates?: {
    from: string;
    to: string;
  };
  observer?: {
    location: {
      longitude: number;
      latitude: number;
      elevation: number;
    };
  };
  table: {
    header: string[];
    rows: CelestialBodyRow[];
  };
}

export type ZodiacSign = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" |
  "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export interface ZodiacPosition {
  sign: ZodiacSign;
  degree: number;
}

export interface SignInfo {
  sunSign: ZodiacPosition;
  moonSign: ZodiacPosition;
  ascendant: ZodiacPosition;
}

export const zodiacCharacteristics: { [key in ZodiacSign]: { element: string; quality: string; traits: string[] } } = {
  Aries: {
    element: "Fire",
    quality: "Cardinal",
    traits: ["Energetic", "Courageous", "Confident", "Enthusiastic", "Impulsive"]
  },
  Taurus: {
    element: "Earth",
    quality: "Fixed",
    traits: ["Patient", "Reliable", "Determined", "Practical", "Stubborn"]
  },
  Gemini: {
    element: "Air",
    quality: "Mutable",
    traits: ["Adaptable", "Communicative", "Witty", "Intellectual", "Inconsistent"]
  },
  Cancer: {
    element: "Water",
    quality: "Cardinal",
    traits: ["Intuitive", "Emotional", "Protective", "Imaginative", "Moody"]
  },
  Leo: {
    element: "Fire",
    quality: "Fixed",
    traits: ["Creative", "Passionate", "Generous", "Warm-hearted", "Arrogant"]
  },
  Virgo: {
    element: "Earth",
    quality: "Mutable",
    traits: ["Analytical", "Practical", "Diligent", "Modest", "Overcritical"]
  },
  Libra: {
    element: "Air",
    quality: "Cardinal",
    traits: ["Diplomatic", "Gracious", "Idealistic", "Peaceful", "Indecisive"]
  },
  Scorpio: {
    element: "Water",
    quality: "Fixed",
    traits: ["Passionate", "Resourceful", "Brave", "Stubborn", "Jealous"]
  },
  Sagittarius: {
    element: "Fire",
    quality: "Mutable",
    traits: ["Optimistic", "Honest", "Adventurous", "Philosophical", "Careless"]
  },
  Capricorn: {
    element: "Earth",
    quality: "Cardinal",
    traits: ["Responsible", "Disciplined", "Self-controlled", "Practical", "Know-it-all"]
  },
  Aquarius: {
    element: "Air",
    quality: "Fixed",
    traits: ["Original", "Independent", "Humanitarian", "Intellectual", "Aloof"]
  },
  Pisces: {
    element: "Water",
    quality: "Mutable",
    traits: ["Intuitive", "Compassionate", "Artistic", "Gentle", "Fearful"]
  }
};