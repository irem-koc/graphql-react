import { useContext } from "react";
import { Context } from "../context/Context";
import Dropdown from "./Dropdown";

const SearchCountry = () => {
  const { filterSearch, setFilterSearch } = useContext(Context) || {};

  return (
    <div className="flex flex-row justify-center items-center gap-5">
      <Dropdown />
      <form>
        <div className="grid w-12/12 gap-6 mb-6 w-full">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Filter
            </label>
            <input
              value={filterSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterSearch?.(e.target.value)
              }
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search country"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchCountry;
