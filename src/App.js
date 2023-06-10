import "./App.css";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSpotifyTokens } from "./redux/userSlice";
import { Login } from "./pages";
import { StyledLogoutButton } from "./styles/buttons";
import { spotifyClientInfo } from "./redux/userSlice";
import { GlobalStyle } from "./styles";
import { Profile } from "./pages/Profile";
import { logout } from "./spotify";
import { TopArtists } from "./pages/TopArtists";
import { TopTracks } from "./pages/TopTracks";
import { PlayList } from "./pages/PlayList";
import { SideBar } from "./components/SideBar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  //------------------STATES-------------------------------------------------------
  const profile = useSelector((state) => state.users.spotifyProfileData);
  const topArtist = useSelector(
    (state) => state.users.spotifyTopArtistData
  );
  const tracks = useSelector(
    (state) => state.users.spotifyTopTracksDataShort
  );
  const localStorageSpotifyToken = localStorage.getItem(
    "spotify_access_token"
  );
  //------------------Fuctions-----------------------------------------------------
  const dispatch = useDispatch();
  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <div>
      <GlobalStyle />

      <StyledLogoutButton
        onClick={() => {
          logout();
        }}
      >
        logout
      </StyledLogoutButton>

      {!localStorageSpotifyToken ? (
        <>
          <Login></Login>{" "}
          <button
            onClick={async () => {
              const setToken = await dispatch(
                setSpotifyTokens({
                  payload: localStorageSpotifyToken,
                  type: "SPOTIFY_TOKENS",
                })
              );
              const results = await dispatch(
                spotifyClientInfo(localStorageSpotifyToken)
              );
              console.log(setToken, "SETTING_SPOTIFY_TOKEN");
              console.log(results, "SPOTIFT_CLIENT_INFO");
            }}
          >
            test
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            onClick={async () => {
              const setToken = await dispatch(
                setSpotifyTokens({
                  payload: localStorageSpotifyToken,
                  type: "SPOTIFY_TOKENS",
                })
              );

              const results = await dispatch(
                spotifyClientInfo(localStorageSpotifyToken)
              );

              console.log(setToken, "SETTING_SPOTIFY_TOKEN");
              console.log(results, "SPOTIFT_CLIENT_INFO");
            }}
          >
            test
          </button>
          <Router>
            <Link to="top-tracks">top-tracks</Link>
            <Link to="top-artists">top-artists</Link>
            <Link to="/">Home</Link>
            <Routes>
              <Route element={<SideBar />} path="/">
                <Route
                  element={<TopArtists />}
                  path="/top-artists"
                ></Route>
                <Route element={<TopTracks />} path="/top-tracks"></Route>
                <Route
                  element={<PlayList />}
                  path="/playlists/:id"
                ></Route>
                <Route element={<PlayList />} path="/playlists"></Route>
                <Route
                  element={
                    <>
                      {profile["display_name"] !== undefined && (
                        <>
                          <Profile tracks={tracks} artist={topArtist} />
                        </>
                      )}
                    </>
                  }
                  path="/"
                ></Route>
              </Route>
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
