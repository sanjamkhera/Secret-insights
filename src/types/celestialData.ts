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
