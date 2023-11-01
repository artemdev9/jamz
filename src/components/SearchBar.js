import React, { useState } from "react";

import style from "../styles/SearchBar.module.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const search = (event) => {
    props.onSearch(term);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className={style.searchBar_container}>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}
      ></input>
      <button type="submit" onClick={search}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
