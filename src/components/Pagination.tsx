import { ChangeEvent, useContext } from "react";
import { Context } from "../context/Context";

interface PaginationProps {
  totalPages: number;
}
const Pagination = ({ totalPages }: PaginationProps) => {
  const { pageItem, setPageItem, currentPage, setCurrentPage } =
    useContext(Context);

  const handleNextPage = () => {
    setCurrentPage((prevPage: number) => prevPage + 1);
  };
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setPageItem(() => {
      return Number(newValue);
    });
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 0));
  };
  return (
    <div>
      <div className="my-10 flex justify-center items-center gap-3">
        <div className="inline-block relative w-64">
          <select
            value={pageItem}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {[10, 20, 30, 50].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="inline-flex">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePrevPage()}
            className="bg-gray-300 mr-3 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handleNextPage()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
