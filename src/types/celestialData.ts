// Types for the celestial data API response

export interface CelestialData {
  dates: {
    from: string;
    to: string;
  };
  observer: {
    location: {
      longitude: number;
      latitude: number;
      elevation: number;
    };
  };
  table: {
    header: string[];
    rows: CelestialBodyData[];
  };
}

export interface CelestialBodyData {
  entry: {
    id: string;
    name: string;
  };
  cells: CelestialBodyCell[];
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
  position: {
    horizontal: PositionCoordinates;
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
  };
  extraInfo: {
    elongation: number | null;
    magnitude: number | null;
    phase?: {
      angel: string;
      fraction: string;
      string: string;
    };
  };
}

interface PositionCoordinates {
  altitude: {
    degrees: string;
    string: string;
  };
  azimuth: {
    degrees: string;
    string: string;
  };
}