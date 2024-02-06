import { createContext, useState } from "react";
import { ContextType } from "../type/ContextType";
import Country from "../type/country";

export const Context = createContext<ContextType | null>(null);
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [group, setGroup] = useState<string>("Name");
  const values = {
    filterSearch,
    setFilterSearch,
    countries,
    setCountries,
    group,
    setGroup,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export default ContextProvider;
