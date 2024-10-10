export interface BirthInfo {
  date: string;
  time: string;
  place: string;
}

export interface NatalChart {
  sunSign: string;
  moonSign: string;
  ascendant: string;
}

export interface UserData {
  birthInfo: BirthInfo;  // Note: This is no longer optional
  natalChart?: NatalChart;
  email: string;
  name: string;
  // Add any other fields that your user data might have
}