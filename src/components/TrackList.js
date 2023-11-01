import React from "react";

import Track from "./Track";

function TrackList(props) {
  return (
    <div>
      <ul>
        {props.tracks.map((item) => (
          <Track
            track={item}
            addTrack={props.addTrack}
            key={item.id}
            removeTrack={props.removeTrack}
            isRemoval={props.isRemoval}
          />
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
