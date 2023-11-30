const clientId = "ce95af709e3d4517af7768b52b421167";
const clientSecret = "ca7d6dddc04541b18d3ded0b50dcecc6";
const redirectUri = "https://jammz.netlify.app/";
let accessToken;

const Spotify = {
  getAccessToken() {
    // if (accessToken) {
    //   return accessToken;
    // }

    // const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    // const popup = window.open(
    //   spotifyAuthUrl,
    //   "Spotify Login",
    //   "width=800,height=600"
    // );

    // const interval = setInterval(() => {
    //   let accessTokenMatch, expiresInMatch;

    //   try {
    //     accessTokenMatch = popup.location.href.match(/access_token=([^&]*)/);
    //     expiresInMatch = popup.location.href.match(/expires_in=([^&]*)/);
    //   } catch (error) {
    //     console.error(
    //       "An error occurred (!IMPORTANT: If the the error is Failed to read a named property 'href' from 'Location' - ignore. Once the user logs in and gets redirected back to the website, the error will disappear):",
    //       error
    //     );
    //   }

    //   if (accessTokenMatch && expiresInMatch) {
    //     accessToken = accessTokenMatch[1];
    //     const expiresIn = parseInt(expiresInMatch[1]) * 1000; // in ms
    //     window.setTimeout(() => {
    //       accessToken = "";
    //       const eventSignInFalse = new Event("setSignInFalse");
    //       window.dispatchEvent(eventSignInFalse);
    //     }, expiresIn);

    //     const eventSignInTrue = new Event("setSignInTrue");
    //     window.dispatchEvent(eventSignInTrue);
    //     popup.close();
    //     clearInterval(interval);
    //   }
    // }, 1000);

    if (accessToken) {
      return accessToken;
    }

    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const tokenUrl = "https://accounts.spotify.com/api/token";

    return fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then((data) => {
        accessToken = data.access_token;
        const eventSignInTrue = new Event("setSignInTrue");
        window.dispatchEvent(eventSignInTrue);
        return accessToken;
      });
  },
  search(term, autocomplete = false) {
    const accessToken = Spotify.getAccessToken();
    console.log("accesstoken from search: " + accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }

        if (!autocomplete) {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        } else {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
          }));
        }
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
