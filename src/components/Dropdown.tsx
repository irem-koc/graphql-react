import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import { ContextType } from "../type/ContextType";

const Dropdown = () => {
  const { group, setGroup } = useContext<ContextType>(Context);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
        >
          {group}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                setGroup("Name");
                Promise.resolve().then(() => {
                  setIsOpen(false);
                });
              }}
              className={`${
                group === "Name"
                  ? "disabled bg-gray-700 text-white"
                  : "cursor-pointer hover:bg-gray-100"
              }  text-end block px-4 py-2 text-sm text-gray-700 `}
              role="menuitem"
            >
              Name
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setGroup("Continent");
                Promise.resolve().then(() => {
                  setIsOpen(false);
                });
              }}
              className={`${
                group === "Continent"
                  ? "disabled bg-gray-700 text-white"
                  : "cursor-pointer hover:bg-gray-100"
              }  text-end block px-4 py-2 text-sm text-gray-700`}
              role="menuitem"
            >
              Continent
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setGroup("Currency");
                Promise.resolve().then(() => {
                  setIsOpen(false);
                });
              }}
              className={`${
                group === "Currency"
                  ? "disabled bg-gray-700 text-white"
                  : "cursor-pointer hover:bg-gray-100"
              }  text-end block px-4 py-2 text-sm text-gray-700`}
              role="menuitem"
            >
              Currency
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setGroup("Code");
                Promise.resolve().then(() => {
                  setIsOpen(false);
                });
              }}
              className={`${
                group === "Code"
                  ? "disabled bg-gray-700 text-white"
                  : "cursor-pointer hover:bg-gray-100"
              }  text-end block px-4 py-2 text-sm text-gray-700`}
              role="menuitem"
            >
              Code
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
