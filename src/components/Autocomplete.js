import React, { useState } from "react";
import style from "../styles/Autocomplete.module.css";

function Autocomplete(props) {
  const handleTrackClick = (trackName) => {
    props.setTerm(trackName);
    props.search(trackName);
  };

  return (
    <div className={style.autocomplete_container}>
      {props.autocompleteData.map((track) => (
        <button
          key={track.id}
          className={style.track}
          onClick={() => handleTrackClick(track.name)} 
        >
          <p>{track.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Autocomplete;
