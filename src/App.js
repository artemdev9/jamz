import React, { useState, useEffect } from "react";

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
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const [searchData, setSearchData] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    checkTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const search = (term) => {
    Spotify.search(term)
      .then((searchResults) => {
        setSearchData(searchResults);
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
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
        trackAlreadyAdded = true;
        return; // track has already been added
      }
    });
    if (!trackAlreadyAdded) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      setSearchData((prevTracks) => [
        ...prevTracks.filter((item) => item !== track),
      ]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
    setSearchData((prevTracks) => [...prevTracks, track]);
  };

  const playlistNameChange = (name) => {
    console.log(name);
    setPlaylistName(name);
  };

  const checkTracks = () => {
    searchData.forEach((searchItem) => {
      playlistTracks.forEach((playlistItem) => {
        if (searchItem.id === playlistItem.id) {
          setSearchData((prevSearchData) =>
            prevSearchData.filter((item) => item !== searchItem)
          );
        }
      });
    });
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
        {searchData.length === 0 && playlistTracks.length === 0 ? (
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
