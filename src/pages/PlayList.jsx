import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import StyledHeader from "../styles/header";
import { PlaylistTrackList } from "../components/PlaylistTrackList";

import SectionWrapper from "../components/SectionWrapper";
import { useSelector } from "react-redux";
import { getSpotifyUserPlaylistById } from "../redux/userSlice";

export const PlayList = ({ idOfPlaylist, setIdOfPlaylist }) => {
  const [UserPlaylistDataById, setUserPlaylistDataById] = useState(false);
  const [playListId, setPlayListId] = useState(idOfPlaylist);
  var token = useSelector((state) => state.users.spotifyToken);
  var tracks = useSelector((state) => state.users.spotifyUserPlaylistById);
  var headToken = localStorage.getItem("spotify_access_token");
  const dispatch = useDispatch();
  const { id } = useParams();

  const playlistHeaderData = useSelector(
    (state) => state.users.spotifyUserPlaylistByIdHeaderData
  );
  useEffect(() => {
    console.log("useeffect", idOfPlaylist, setIdOfPlaylist);
    const getUserPlaylistDataById = async () => {
      if (headToken !== token) {
        token = headToken;
      }
      const response = await dispatch(
        getSpotifyUserPlaylistById({ payload: { token: token, id: id } })
      );
      if (response.type === "spotify/get/user/playlist/fulfilled") {
        setUserPlaylistDataById(true);
      }

      // if (response.payload.tracks.next !== null) {
      //   const getSpotifyUserNextTracks = async () => {
      //     const responseJSON = await dispatch(
      //       getSpotifyUserNextTracks({
      //         payload: {
      //           token: token,
      //           spotifyNextUrl: response.payload.tracks.next,
      //         },
      //       })
      //     );
      //   };
      //   getSpotifyUserNextTracks();
      // }
    };
    getUserPlaylistDataById();
  }, [idOfPlaylist]);

  return (
    <>
      {UserPlaylistDataById === true ? (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              <img
                className="header__img"
                alt="image"
                src={playlistHeaderData.images[0]["url"]}
              ></img>
              <div>
                <div className="header__overline">
                  {" "}
                  <h1 className="header__name">
                    {playlistHeaderData["name"]}
                  </h1>
                  <h2>{playlistHeaderData["country"]}</h2>
                  <p className="header__meta">
                    {playlistHeaderData["type"]}
                  </p>
                </div>{" "}
              </div>
            </div>
          </StyledHeader>
          <SectionWrapper>
            <PlaylistTrackList tracks={tracks}></PlaylistTrackList>
          </SectionWrapper>
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};
