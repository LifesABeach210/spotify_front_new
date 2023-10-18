import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StyledHeader from "../styles/header";
import { BsThreeDots } from "react-icons/bs";
import { StyledGrid } from "../styles/StyleGrid";
import { FaPlay } from "react-icons/fa";
import StyledTrackList from "../styles/StyleTrackList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpotifySingleArtistAlbum } from "../redux/userSlice";
import { formatDuration } from "../utils/formatDuration";
import { getSpotifySingleArtist } from "../redux/userSlice";
import { getSpotifySingleRelatedArtist } from "../redux/userSlice";
import { getSpotifySingleArtistAlbums } from "../redux/userSlice";
import { getSpotifySingleArtistTopTracks } from "../redux/userSlice";
export const ArtistPage = () => {
  const [open, setOpen] = useState(false);
  const [reloadForRelatedArtistId, setReloadForRelatedArtistId] =
    useState("");
  const artistHeaderData = useSelector(
    (state) => state.users.spotifySingleArtistData
  );
  const artistAlbumsData = useSelector(
    (state) => state.users.spotifySingleArtistAlbumsData
  );
  const artistTrackData = useSelector(
    (state) => state.users.spotifySingleArtistTracksData
  );
  const relatedArtistsData = useSelector(
    (state) => state.users.spotifySingleRelatedArtistData
  );

  const nav = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("spotify_access_token");
  useEffect(() => {
    if (reloadForRelatedArtistId !== "") {
      const setRelatedArtistAsMainArtist = async () => {
        const response = await dispatch(
          getSpotifySingleArtist({
            payload: { token: token, id: reloadForRelatedArtistId },
          })
        );
      };

      const setRelatedArtistAsMainArtistTracks = async () => {
        const response = await dispatch(
          getSpotifySingleArtistTopTracks({
            payload: { token: token, id: reloadForRelatedArtistId },
          })
        );
        console.log(response, "RELATED_ARTIST_TOP_TRACKS");
      };
      const setRelatedArtistAsMainArtistAlbums = async () => {
        const response = await dispatch(
          getSpotifySingleArtistAlbums({
            payload: { token: token, id: reloadForRelatedArtistId },
          })
        );
        console.log(response, "RELATED_ARTIST_TOP_TRACKS");
      };
      const setRelatedArtistFromRelatedArtist = async () => {
        const response = await dispatch(
          getSpotifySingleRelatedArtist({
            payload: { token: token, id: reloadForRelatedArtistId },
          })
        );
        console.log(response, "RELATED_ARTIST_TOP_TRACKS");
      };

      setRelatedArtistAsMainArtist();
      setRelatedArtistAsMainArtistTracks();
      setRelatedArtistAsMainArtistAlbums();
      setRelatedArtistFromRelatedArtist();
    }
  }, [reloadForRelatedArtistId]);
  return (
    <>
      <StyledHeader>
        <div className="header__inner_artist">
          <img
            className="header__img_artist"
            alt="image"
            src={artistHeaderData.images[0]["url"]}
          ></img>
          <div>
            <div className="header__overline">
              {" "}
              <h1 className="header__name">{artistHeaderData["name"]}</h1>
              <p className="header__meta">{artistHeaderData["type"]}</p>
            </div>{" "}
            <p>{artistHeaderData["followers"].total} Followers</p>
          </div>
        </div>
      </StyledHeader>
      <>
        <div className="circle">
          <span className="material-icons">
            <div>
              {" "}
              <FaPlay />
            </div>
          </span>
        </div>
        <div>
          <div className="artist-page-sidebar-container">
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className="artist-page-sidebar-icon"
            >
              <BsThreeDots />{" "}
            </div>
            <div
              className={
                open === true
                  ? "artist-page-sidebar-icon-content-open"
                  : "artist-page-sidebar-icon-content"
              }
            >
              <p>add to playlist</p>
              <p>search in playlist</p>
              <p>delete playlist</p>
            </div>
          </div>
        </div>
        {artistTrackData && artistTrackData.length ? (
          <>
            <div>
              <StyledTrackList>
                {" "}
                {artistTrackData.map((track, i) => (
                  <li className="track__item" key={i}>
                    <div className="track__item__num">{i + 1}</div>
                    <div className="track__item__title-group">
                      {track.album.images.length &&
                        track.album.images[2] && (
                          <div className="track__item__img">
                            <img
                              src={track.album.images[2].url}
                              alt={track.name}
                            />
                          </div>
                        )}
                      <div className="track__item__name-artist">
                        <div className="track__item__name overflow-ellipsis">
                          {track.name}
                        </div>
                        <div className="track__item__artist overflow-ellipsis">
                          {track.artists.map((artist, i) => (
                            <span key={i}>
                              {artist.name}
                              {i !== track.artists.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="track__item__album overflow-ellipsis">
                      {track.album.name}
                    </div>
                    <div className="track__item__duration">
                      <p>{formatDuration(track.duration_ms)}</p>
                    </div>
                  </li>
                ))}
              </StyledTrackList>
            </div>{" "}
          </>
        ) : (
          <span></span>
        )}
        {artistAlbumsData && artistAlbumsData.length ? (
          <>
            <h2 className="album-header">Albums</h2>
            <StyledGrid>
              {artistAlbumsData.slice(0, 6).map((e, i) => {
                return (
                  <div key={i} className="artist-album-container">
                    <li>
                      {e.images && e.images[0] && (
                        <div
                          onClick={() => {
                            const getSingleAlbumData = async () => {
                              const albumResponse = await dispatch(
                                getSpotifySingleArtistAlbum({
                                  payload: { token: token, id: e.id },
                                })
                              );
                              console.log(albumResponse);
                            };
                            getSingleAlbumData();

                            nav(
                              `/artist/${e.artists[0].id}/albums/${e.id}`
                            );
                          }}
                          className="grid__item__img"
                        >
                          <img alt={e.name} src={e.images[0].url}></img>
                        </div>
                      )}
                      <h3 className="grid__item__name overflow-ellipsis">
                        {e.name}
                      </h3>
                      <p>Album</p>
                    </li>
                  </div>
                );
              })}
            </StyledGrid>{" "}
          </>
        ) : (
          <p>Nodata</p>
        )}
        {relatedArtistsData && relatedArtistsData.length ? (
          <>
            <h2 className="album-header">Artist You May Like</h2>
            <StyledGrid>
              {relatedArtistsData.slice(0, 6).map((e, i) => {
                return (
                  <div
                    onClick={() => {
                      setReloadForRelatedArtistId(e.id);
                      console.log(
                        e.id,
                        "ID FOR RELATED ARTIST RELOAD THEN NAV AFTER"
                      );
                    }}
                    key={i}
                    className="artist-album-container"
                  >
                    <li>
                      {e.images && e.images[0] && (
                        <div className="grid__item__img">
                          <img alt={e.name} src={e.images[0].url}></img>
                        </div>
                      )}
                      <h3 className="grid__item__name overflow-ellipsis">
                        {e.name}
                      </h3>
                      <p>Artist</p>
                    </li>
                  </div>
                );
              })}
            </StyledGrid>{" "}
          </>
        ) : (
          <span>no data</span>
        )}
      </>
    </>
  );
};
