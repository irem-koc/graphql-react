import { createContext, useState } from "react";
import ContextType from "../type/ContextType";
import Country from "../type/country";

export const Context = createContext<ContextType | null>(null);
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [group, setGroup] = useState<string>("Name");
  const [pageItem, setPageItem] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const values = {
    filterSearch,
    setFilterSearch,
    countries,
    setCountries,
    group,
    setGroup,
    pageItem,
    setPageItem,
    currentPage,
    setCurrentPage,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export default ContextProvider;
