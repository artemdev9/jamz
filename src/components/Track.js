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
        <button className={styles.track_controls_button} onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className={styles.track_controls_button} onClick={addTrack}>
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
      <div className={styles.track_controls}>{renderAction()}</div>
    </div>
  );
}

export default Track;
