import { createContext } from "react";
import { ContextType } from "../type/ContextType";

export const Context = createContext<ContextType>({
  filterSearch: "",
  setFilterSearch: () => {},
  countries: [],
  setCountries: () => {},
  group: "Name",
  setGroup: () => {},
  pageItem: 10,
  setPageItem: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});
