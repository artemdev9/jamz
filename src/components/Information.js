import React from "react";
import style from "../styles/Information.module.css";

function Information() {
  return (
    <div className={style.Information_container}>
      <h3>
        This website allows you:
        <h3 />
        <li>to search for songs</li>
        <li>add them to a playlist</li>
        <li>save the playlist to your spotify account</li>
        You might want to use the search suggestions as well to make the search
        process easier. You can drag and use the mouse wheel to scroll thought
        the suggestions.
      </h3>
      <h2 className={style.Information_container_cta}>
        Go ahead and search for a song...
      </h2>
    </div>
  );
}

export default Information;
