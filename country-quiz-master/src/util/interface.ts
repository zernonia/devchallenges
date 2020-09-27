
export interface CountryData {
  name: string;
  capital: string;
  flag: string;
}

export interface Question {
  list: CountryData[];
  answer: number;
}
