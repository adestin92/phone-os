import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  width = "80%",
}) => {
  return (
    <div className="search-wrapper" style={{ width }}>
      <img src="./search.png" alt="search" className="search-icon" />
      <input
        type="text"
        className="search-bar"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
