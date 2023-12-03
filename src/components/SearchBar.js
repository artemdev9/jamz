import React, { useState } from "react";

import style from "../styles/SearchBar.module.css";

import Autocomplete from "./Autocomplete";

function SearchBar(props) {
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
    props.onChange(term);
  };

  const search = () => {
    props.onSearch(term);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className={style.searchBar_autocomplete_container}>
      <div className={style.searchBar_container} data-testid="SearchBar">
        <input
          data-testid="SearchBar-input"
          className={style.searchBar_input}
          id="search"
          type="text"
          placeholder="Search..."
          value={term}
          onChange={handleTermChange}
          onKeyDown={handleKeyPress}
        ></input>
        <button
          data-testid="SearchBar-button"
          className={style.searchBar_button}
          type="submit"
          onClick={search}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 20 13"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      <Autocomplete
        autocompleteData={props.autocompleteData}
        setTerm={setTerm}
        search={props.onSearch}
      />
    </div>
  );
}

export default SearchBar;
