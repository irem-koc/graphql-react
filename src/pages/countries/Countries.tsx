import { useQuery } from "@apollo/client";
import { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import SearchCountry from "../../components/SearchCountry";
import { Context } from "../../context/Context";
import ALL_COUNTRIES from "../../query/ALL_COUNTRIES";
import ALL_COUNTRIES_BY_CODE from "../../query/ALL_COUNTRIES_BY_CODE";
import ALL_COUNTRIES_BY_CONTINENT from "../../query/ALL_COUNTRIES_BY_CONTINENT";
import ALL_COUNTRIES_BY_CURRENCY from "../../query/ALL_COUNTRIES_BY_CURRENCY";
import ALL_COUNTRIES_BY_NAME from "../../query/ALL_COUNTRIES_BY_NAME";
import { ContextType } from "../../type/ContextType";
import Country from "../../type/country";
import Language from "../../type/language";

const PredefinedColors = ["#3490dc", "#ef4444"];

const Countries = () => {
  const {
    countries,
    setCountries,
    filterSearch,
    group,
    pageItem,
    currentPage,
  } = useContext<ContextType>(Context);

  const [selectedItem, setSelectedItem] = useState<number | null>(9);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const searchTerm = filterSearch.trim();
  const { loading, error, data } = useQuery(ALL_COUNTRIES);
  const [filteredCountries, setFilteredCountries] = useState<
    Country[] | undefined
  >();
  // to colorize country

  // fetch data from graphql by name, code, currency, and continent
  const { data: ByName } = useQuery(ALL_COUNTRIES_BY_NAME(searchTerm), {
    variables: {
      term: searchTerm,
    },
    skip: !searchTerm.trim() || group !== "Name",
  });
  const { data: ByCode } = useQuery(ALL_COUNTRIES_BY_CODE(searchTerm), {
    variables: { term: searchTerm },
    skip: !filterSearch.trim() || group !== "Code",
  });
  const { data: ByCurrency } = useQuery(ALL_COUNTRIES_BY_CURRENCY(searchTerm), {
    variables: { term: searchTerm },
    skip: !filterSearch.trim() || group !== "Currency",
  });
  const { data: ByContinent } = useQuery(
    ALL_COUNTRIES_BY_CONTINENT(searchTerm),
    {
      variables: { term: searchTerm },
      skip: !filterSearch.trim() || group !== "Continent",
    }
  );
  // change the data by group name
  useEffect(() => {
    if (searchTerm.length > 0 && ByName && group === "Name") {
      setFilteredCountries(ByName.countries);
    } else if (searchTerm.length > 0 && ByCode && group === "Code") {
      setFilteredCountries(ByCode.countries);
    } else if (searchTerm.length > 0 && ByCurrency && group === "Currency") {
      setFilteredCountries(ByCurrency.countries);
    } else if (searchTerm.length > 0 && ByContinent && group === "Continent") {
      setFilteredCountries(ByContinent.countries);
    } else {
      setFilteredCountries(countries || []);
    }
  }, [searchTerm, group, ByName, countries, ByCode, ByCurrency, ByContinent]);

  useEffect(() => {
    if (data && !loading) {
      setCountries(data?.countries);
    }
  }, [data, loading, setCountries]);

  const currentCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * pageItem;
    const endIndex = startIndex + pageItem;
    return (
      (filteredCountries && filteredCountries.slice(startIndex, endIndex)) || []
    );
  }, [currentPage, pageItem, filteredCountries]);
  const toggleSelectedItem = (index: number) => {
    if (selectedItem === null) {
      setSelectedItem(index);
    } else if (selectedItem === index) {
      setSelectedItem(null);
      setCurrentColorIndex((prevIndex) =>
        prevIndex === PredefinedColors.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  const totalPages = Math.ceil(
    (filteredCountries?.length ?? 0) / pageItem ?? 0
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-10 my-10 flex gap-5 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Country Table</h1>
        <SearchCountry />
      </div>
      <p>Total Number: {filteredCountries?.length}</p>
      <table className="table-auto border-collapse border border-slate-400 text-center">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-400">Code</th>
            <th className="border-collapse border border-slate-400">Name</th>
            <th className="border-collapse border border-slate-400">
              Currency
            </th>
            <th className="border-collapse border border-slate-400">Emoji</th>
            <th className="border-collapse border border-slate-400">
              Languages
            </th>
            <th className="border-collapse border border-slate-400">
              Continent
            </th>
            <th className="border-collapse border border-slate-400">Native</th>
            <th className="border-collapse border border-slate-400">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries && filteredCountries?.length > 0 ? (
            currentCountries?.map((country: Country, index: number) => (
              <tr
                id={`${index + (currentPage - 1) * pageItem}`}
                style={
                  selectedItem != null &&
                  selectedItem === index + (currentPage - 1) * pageItem
                    ? { backgroundColor: PredefinedColors[currentColorIndex] }
                    : { backgroundColor: "" }
                }
                className={`${
                  selectedItem === null ||
                  selectedItem === index + (currentPage - 1) * pageItem
                    ? "cursor-pointer"
                    : "pointer-events-none"
                } ${
                  selectedItem != null &&
                  selectedItem === index + (currentPage - 1) * pageItem
                    ? `text-white`
                    : ""
                } border-collapse border border-slate-400`}
                key={country?.code}
                onClick={() =>
                  toggleSelectedItem(index + (currentPage - 1) * pageItem)
                }
              >
                <td className="border-collapse border border-slate-400">
                  {country?.code}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.name}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.currency}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.emoji}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.languages.map(
                    (language: Language, index: number) => (
                      <span key={language?.code}>
                        {language?.name}
                        {index < country.languages.length - 1 && ", "}
                      </span>
                    )
                  )}
                </td>

                <td className="border-collapse border border-slate-400">
                  {country?.continent.name}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.native}
                </td>
                <td className="border-collapse border border-slate-400">
                  {country?.phone}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No country found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Countries;
