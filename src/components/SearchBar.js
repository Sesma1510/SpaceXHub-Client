import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mb-10">
      <div className="relative w-full max-w-3xl mx-auto">
        <label
          htmlFor="search"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500"
        ></label>
        <input
          id="search"
          type="text"
          placeholder="Search launches..."
          className="w-full px-4 py-2 pl-12 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          value={value}
          onChange={onChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21L15.5 15.5M10 16C13.866 16 17 12.866 17 9C17 5.13401 13.866 2 10 2C6.13401 2 3 5.13401 3 9C3 12.866 6.13401 16 10 16Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
