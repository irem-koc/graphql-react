import Country from "./country";

export interface ContextType {
  filterSearch: string;
  setFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
}
