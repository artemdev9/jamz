import React from "react";
import styles from "../styles/Track.module.css";

function Track(props) {
  const addTrack = () => {
    props.addTrack(props.track);
  };

  const removeTrack = () => {
    props.removeTrack(props.track);
  };

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className={styles.track_controls} onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className={styles.track_controls} onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className={styles.track_control_container}>
      <div className={styles.track_container}>
        <h3>{props.track.name}</h3>
        <h4>
          {props.track.artist} | {props.track.album}
        </h4>
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;
