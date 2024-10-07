declare module 'astronomia' {
  export namespace julian {
    function DateToJD(date: Date): number;
  }

  export namespace sidereal {
    function apparent(jd: number, longitude: number): number;
  }

  export namespace nutation {
    function meanObliquity(jd: number): number;
  }
}