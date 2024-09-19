import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder, onChange }) => {
  const onProxyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    onChange(e.target.value);
  };

  return (
    <div>
      <div className="w-72 relative">
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onProxyChange}
          className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
