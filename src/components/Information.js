import React from "react";
import style from "../styles/Information.module.css";

function Information() {
  return (
    <div className={style.Information_container}>
      <div className={style.Information_instructions}>
        <div className={style.Information_instructions_item}>
          <h1>1</h1>
          <h4>search for songs</h4>
        </div>
        <div className={style.Information_instructions_item}>
          <h1>2</h1> <h4>add songs to a playlist</h4>
        </div>
        <div className={style.Information_instructions_item}>
          <h1>3</h1>
          <h4>save the playlist to your spotify account</h4>
        </div>
      </div>
    </div>
  );
}

export default Information;
