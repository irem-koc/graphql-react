import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import SearchCountry from "../../components/SearchCountry";
import { Context } from "../../context/Context";
import ALL_COUNTRIES from "../../query/ALL_COUNTRIES";
import ALL_COUNTRIES_BY_CODE from "../../query/ALL_COUNTRIES_BY_CODE";
import ALL_COUNTRIES_BY_CURRENCY from "../../query/ALL_COUNTRIES_BY_CURRENCY";
import ALL_COUNTRIES_BY_NAME from "../../query/ALL_COUNTRIES_BY_NAME";
import Country from "../../type/country";
import Language from "../../type/language";

const Countries = () => {
  const { countries, setCountries, filterSearch, group } = useContext(Context);
  const searchTerm = filterSearch.trim();
  const { loading, error, data } = useQuery(ALL_COUNTRIES);
  const [filteredCountries, setFilteredCountries] = useState<
    Country[] | undefined
  >();
  const { data: ByName } = useQuery(ALL_COUNTRIES_BY_NAME(searchTerm), {
    variables: { term: searchTerm },
    skip: !searchTerm.trim(), // Sorguyu atla, eğer filtreleme terimi yoksa
  });
  const { data: ByCode } = useQuery(ALL_COUNTRIES_BY_CODE(searchTerm), {
    variables: { term: searchTerm },
    skip: !filterSearch.trim(),
  });
  const { data: ByCurrency } = useQuery(ALL_COUNTRIES_BY_CURRENCY(searchTerm), {
    variables: { term: searchTerm },
    skip: !filterSearch.trim(),
  });
  useEffect(() => {
    if (data && !loading) {
      setCountries(data);
    }
  }, [data]);

  useEffect(() => {
    console.log("aaa");

    if (searchTerm.length > 0 && ByName && group === "Name") {
      console.log("logged", ByName);
      setFilteredCountries(ByName.countries);
    } else if (searchTerm.length > 0 && ByCode && group === "Code") {
      console.log("logged2", ByCode);
      setFilteredCountries(ByCode.countries);
    } else if (searchTerm.length > 0 && ByCurrency && group === "Currency") {
      console.log("logged3", ByCurrency);
      setFilteredCountries(ByCurrency.countries);
    } else {
      // Filtreleme terimi boşsa ya da sorgu henüz tamamlanmadıysa, tüm ülkeleri göster
      setFilteredCountries(countries?.countries || []);
    }
  }, [searchTerm, group, ByName, countries, ByCode, ByCurrency]);

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
          {filteredCountries?.length > 0 ? (
            filteredCountries?.map((country: Country) => (
              <tr
                className="border-collapse border border-slate-400"
                key={country?.code}
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
    </div>
  );
};

export default Countries;
