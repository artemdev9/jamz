import React from "react";
import TrackList from "./TrackList";

import style from "../styles/SearchResults.module.css";

function SearchResults(props) {
  return (
    <div className={style.searchResults_container}>
      <h2>Results</h2>
      <TrackList
        tracks={props.searchData}
        addTrack={props.addTrack}
        isRemoval={false}
      />
    </div>
  );
}

export default SearchResults;
