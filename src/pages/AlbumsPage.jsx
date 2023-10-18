import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledHeader from "../styles/header";
import StyledTrackList from "../styles/StyleTrackList";
import { useEffect } from "react";
import { formatDuration } from "../utils/formatDuration";
import { FaPlay } from "react-icons/fa";

export const AlbumsPage = () => {
  const albumData = useSelector(
    (state) => state.users.spotifySingleArtistAlbumData
  );
  const albumTracks = useSelector(
    (state) => state.users.spotifySingleArtistAlbumTracks
  );
  useEffect(() => {

  });
  const { id, album_id } = useParams();

  return (
    <div>
      {albumData["label"] && albumData["popularity"] > 0 ? (
        <StyledHeader>
          <div className="header__inner_artist">
            <img
              className="header__img_artist"
              alt="image"
              src={albumData.images[0]["url"]}
            ></img>
            <div>
              <div className="header__overline">
                {" "}
                <h1 className="header__name">{albumData["name"]}</h1>
                <p className="header__meta">{albumData["label"]}</p>
              </div>{" "}
              <p>Release Date: {albumData.release_date}</p>
            </div>
          </div>
        </StyledHeader>
      ) : (
        <span>data</span>
      )}
      <div style={{ display: "flex" }}>
        <div className="circle">
          <span className="material-icons">
            <div>
              <FaPlay />
            </div>
          </span>
        </div>
      </div>
      <div>
        {albumTracks && albumTracks.length > 5 ? (
          <StyledTrackList>
            {albumTracks.map((track, i) => (
              <li className="track__item" key={i}>
                <div className="track__item__num">{i + 1}</div>
                <div className="track__item__title-group">
                  <div className="track__item__name-artist">
                    <div className="track__item__name overflow-ellipsis">
                      {track.name}
                    </div>
                    <div className="track__item__artist overflow-ellipsis">
                      {track.artists.map((artist, i) => (
                        <span key={i}>{artist.name}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="track__item__duration">
                  {formatDuration(track.duration_ms)}
                </div>
              </li>
            ))}
          </StyledTrackList>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
