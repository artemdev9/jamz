import React, { useState } from "react";

import "./App.css";
import style from "./styles/App.module.css";

import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./utilities/Spotify";
import Logo from "./components/Logo";
import SignIn from "./components/SingIn";
import Information from "./components/Information";

function App() {
  // create a login with spotify overlay so that when the user comes to the website they can login with thier spotify account by clicking a button

  const [searchData, setSearchData] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = (term) => {
    Spotify.search(term).then(setSearchData);
    getSuggestions(term);
  };

  const getSuggestions = (term) => {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    Spotify.search(term, true).then((result) => {
      let names = [];
      let noDublicatesAutocompleteData = [];
      result.forEach((track) => {
        if (!names.includes(track.name.toLowerCase())) {
          noDublicatesAutocompleteData.push({
            id: track.id,
            name: capitalizeFirstLetter(track.name.toLowerCase()),
          });
          names.push(track.name.toLowerCase());
        }
      });
      setAutocompleteData(noDublicatesAutocompleteData);
    });
  };

  const savePlaylist = () => {
    if (playlistTracks.length) {
      const trackURIs = playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
        console.log("Playlist saved");
      });
    }
  };

  const addTrack = (track) => {
    let trackAlreadyAdded = false;
    playlistTracks.forEach((item) => {
      if (track.id === item.id) {
        console.log("track was already added");
        trackAlreadyAdded = true;
        return; // track has already been added
      }
    });
    if (!trackAlreadyAdded) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  };

  const playlistNameChange = (name) => {
    console.log(name);
    setPlaylistName(name);
  };

  return (
    <div className="App">
      <SignIn />
      <div className={style.blackground_halfcircle_top}></div>
      <div className={style.logo_container}>
        <header className={style.logo}>Jamz</header>
        <Logo />
      </div>
      <div className={style.App_search}>
        <SearchBar
          onSearch={search}
          onChange={getSuggestions}
          autocompleteData={autocompleteData}
        ></SearchBar>
        {searchData.length === 0 ? (
          <Information />
        ) : (
          <div className={style.App_tracks}>
            <SearchResults searchData={searchData} addTrack={addTrack} />
            <div className={style.blackground_halfcircle_middle}></div>
            <Playlist
              playlistName={playlistName}
              playlist={playlistTracks}
              removeTrack={removeTrack}
              playlistNameChange={playlistNameChange}
              playlistSave={savePlaylist}
            />
          </div>
        )}
      </div>
      <div className={style.blackground_halfcircle_bottom}></div>
    </div>
  );
}

export default App;
