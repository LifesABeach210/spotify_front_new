import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StyledHeader from "../styles/header.jsx";
import { useDispatch } from "react-redux";
import { getSpotifyTopArtistShort } from "../redux/userSlice.jsx";
import { getSpotifyTopTracksShort } from "../redux/userSlice.jsx";
import { spotifyPlaylistInfo } from "../redux/userSlice.jsx";
import SectionWrapper from "../components/SectionWrapper.jsx";
import ArtistsGrid from "../components/ArtistGrid.jsx";
import { TrackList } from "../components/TrackList.jsx";
import PlaylistsGrid from "../components/PlaylistGrid.jsx";
import StyledSectionTopArtists from "../styles/StyledSectionTopArtists.jsx";
export const Profile = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.users.spotifyTopTracksData);
  const artist = useSelector((state) => state.users.spotifyTopArtistData);
  const profile = useSelector((state) => state.users.spotifyProfileData);
  const token = localStorage.getItem("spotify_access_token");
  const [topArtistsResponse, setTopArtistsResponse] = useState(false);
  const [topTracksResponse, setTopTracksResponse] = useState(false);

  useEffect(() => {
    let getTopArtistDataShort = async () => {
      let response = await dispatch(getSpotifyTopArtistShort(token));
      console.log(response, "IN_LOOP_RESPONSE Artists");
      if (response.type === "spotify/get/artists/fulfilled") {
        setTopArtistsResponse(true);
      }
    };

    let getTopTracksDataShort = async () => {
      let response = await dispatch(getSpotifyTopTracksShort(token));
      console.log(response, "IN_LOOP_RESPONSE");
      if (response.type === "spotify/get/tracks/fulfilled") {
        setTopTracksResponse(true);
      }
    };

    let getPlaylistData = async () => {
      let response = await dispatch(spotifyPlaylistInfo(token));
      console.log(response, "IN_LOOP_PLAYLIST_RESPONSE");
    };

    getPlaylistData();

    getTopTracksDataShort();

    getTopArtistDataShort();
  }, []);

  return (
    <div className="styled_header_parent">
      <StyledHeader type="user">
        <div className="header__inner">
          <img
            className="header__img"
            alt="image"
            src={profile.images[0]["url"]}
          ></img>
          <div>
            <div className="header__overline">
              {" "}
              <h1 className="header__name">{profile["display_name"]}</h1>
              <h2>{profile["country"]}</h2>
              <p className="header__meta">{profile["email"]}</p>
            </div>{" "}
          </div>
        </div>
      </StyledHeader>
      {topArtistsResponse === true && topTracksResponse === true && (
        <main>
          <StyledSectionTopArtists
            seeAllLink="/top-artists"
            title="Top Artist This Month"
          >
            {" "}
            <ArtistsGrid artists={artist.slice(0, 10)}></ArtistsGrid>
          </StyledSectionTopArtists>
          <SectionWrapper seeAllLink="/top-tracks">
            {" "}
            <TrackList tracks={tracks.slice(0, 10)}></TrackList>
          </SectionWrapper>
          <SectionWrapper>
            <PlaylistsGrid></PlaylistsGrid>
          </SectionWrapper>
        </main>
      )}{" "}
    </div>
  );
};
