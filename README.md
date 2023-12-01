# React Spotify Portfolio Project

## Overview

This is a portfolio project built with React that integrates with the Spotify API. The application allows users to search for songs, utilize autocomplete for suggestions based on the current search results, add songs to a playlist, and save that playlist to their Spotify account, if they have logged in to their Spotify account.

## Features

- Song Search:
  Users can search for songs using the search bar.
  Autocomplete suggestions are provided based on the current search results.

- Playlist Management:
  Users can add songs to a playlist.
  The playlist is dynamically updated as songs are added or removed.

- Spotify Integration:
  Users can log in with their Spotify account to enable saving playlists to their Spotify account.
  Authentication is handled securely using Spotify's OAuth 2.0 authentication.

- Demonstration Mode:
  Users who do not log in with Spotify can still use the application in a demonstration mode.
  Demonstrative features such as adding songs to a playlist are available without saving to a Spotify account.

## Getting Started

- Clone the Repository:
  git clone https://github.com/your-username/react-spotify-portfolio.git

- Install Dependencies:
  cd react-spotify-portfolio
  npm install

- Change the redirectUri on line 3 file Spotify.js to 'http://localhost:3000' instead of 'https://jammz.netlify.app/'

- Run the Application:
  npm start

The application will be accessible at http://localhost:3000.

## Usage

- Search for Songs:
  Enter a song title or artist in the search bar.
  Autocomplete suggestions will help refine the search.

- Add to Playlist:
  Click on the plus to add the song to the playlist.

- Spotify Integration:
  Log in with Spotify to save your playlist to your Spotify account.

- Demonstration Mode:
  If you choose not to log in, you can still use the application in a demonstration mode.

## Technologies Used

- React
- Spotify API
- OAuth 2.0 Authentication
- HTML, CSS, JavaScript

## Contributing

Feel free to contribute to the project by opening issues or creating pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
