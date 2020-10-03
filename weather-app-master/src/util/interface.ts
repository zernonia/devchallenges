export interface Weather {
  condition: string;
  applicableDate: string;
  minTemp: number;
  maxTemp: number;
  theTemp: number;
  minTempF: number,
  maxTempF: number;
  theTempF: number;
  compassDirection: string;
  windSpeed: number;
  windDirection: number;
  airPressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

export interface LattLong {
  latitude: number,
  longitude: number
}

export interface QueryResponse {
  title: string,
  location_type: string,
  latt_long: number,
  woeid: number,
  distance: number
}