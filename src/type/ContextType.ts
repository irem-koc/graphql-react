import Country from "./country";

export type ContextType = {
  filterSearch: string;
  setFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
  pageItem: number;
  setPageItem: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
