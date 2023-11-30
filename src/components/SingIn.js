import React, { useState, useEffect } from "react";
import Spotify from "../utilities/Spotify";
import style from "../styles/SignIn.module.css";

function SignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    window.addEventListener("setSignInTrue", setTrue);
    window.addEventListener("setSignInFalse", setFalse);

    return () => {
      window.removeEventListener("setSignInTrue", setTrue);
      window.removeEventListener("setSignInFalse", setFalse);
    };
  }, []);

  // sign in with spotify
  const handleSignIn = () => {
    Spotify.getAccessToken();
  };

  const setTrue = () => {
    setIsSignedIn(true);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  };

  const setFalse = () => {
    window.scrollTo(0, 0);
    setIsSignedIn(false);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  };

  // demo
  const handleSignInDemo = () => {
    Spotify.getAccessToken();
  };

  return (
    <>
      {!isSignedIn && (
        <div className={style.signin_container}>
          <div className={style.signin_information}>
            <h3 className={style.title}>
              The JAMZ website is a portfolio showcasing skills in React and
              REST API. It utilizes the Spotify API for data retrieval and
              account actions. Recent changes to Spotify API quotas have limited
              certain features.
            </h3>

            <h3>Demo Access</h3>
            <li>Click the DEMO button for demonstration purposes.</li>
            <li>Access all features except saving playlists.</li>

            <h3>Full Access</h3>
            <li>Email [email address] with the subject 'Jamz full access.'</li>
            <li>
              Include: Keyword: 'Jamz full access', Spotify account email,
              Spotify name
            </li>

            <h4>
              Note: For full access, you must email the provided address with
              the specified information.
            </h4>
          </div>
          <div className={style.signin_container_buttons}>
            <button className={style.signin_button} onClick={handleSignInDemo}>
              <h4 className={style.signin_font}>DEMO</h4>
            </button>
            <button className={style.signin_button} onClick={handleSignIn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="120"
                width="120"
                viewBox="-33.4974 -55.829 290.3108 334.974"
              >
                <path
                  d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
                  fill="#191414"
                />
              </svg>
              <h4 className={style.signin_font}>Sign in with Spotify</h4>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
