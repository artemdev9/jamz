import TrackList from "./TrackList";

import style from "../styles/Playlist.module.css";

function Playlist(props) {
  const playlistNameChange = (event) => {
    props.playlistNameChange(event.target.value);
  };

  return (
    <div className={style.Playlist_container}>
      <div className={style.Playlist_controls}>
        <input className={style.Playlist_name_input} onChange={playlistNameChange} value={props.playlistName} />
        <button className={style.Playlist_name_button} onClick={props.playlistSave}>Add</button>
      </div>
      <TrackList
        tracks={props.playlist}
        removeTrack={props.removeTrack}
        isRemoval={true}
      />
    </div>
  );
}

export default Playlist;
