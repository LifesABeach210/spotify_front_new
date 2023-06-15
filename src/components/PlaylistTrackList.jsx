import { formatDuration } from "../utils/formatDuration";
import StyledTrackList from "../styles/StyleTrackList";
import React from "react";

export const PlaylistTrackList = ({ tracks }) => {
  const token = localStorage.getItem("spotify_access_token");

  return (
    <>
      {console.log(tracks, "TRACKLIST")}
      {tracks && tracks.length ? (
        <StyledTrackList>
          <>
            <div className="test">
              <p>#</p>
              <p>Album Name</p>
              <p>Duration</p>
            </div>
          </>
          {tracks.map((_, i) => (
            <li className="track__item" key={i}>
              <div className="track__item__num">{i + 1}</div>
              <div className="track__item__title-group">
                {_.track.album.images.length &&
                  _.track.album.images[2] && (
                    <div className="track__item__img">
                      <img
                        src={_.track.album.images[2].url}
                        alt={_.track.name}
                      />
                    </div>
                  )}
                <div className="track__item__name-artist">
                  <div className="track__item__name overflow-ellipsis">
                    {_.track.name}
                  </div>
                  <div className="track__item__artist overflow-ellipsis">
                    {_.track.artists.map((artist, i) => (
                      <span key={i}>
                        {artist.name}
                        {i !== _.track.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="track__item__album overflow-ellipsis">
                {_.track.album.name}
              </div>
              <div className="track__item__duration">
                {formatDuration(_.track.duration_ms)}
              </div>
            </li>
          ))}
        </StyledTrackList>
      ) : (
        <p className="empty-notice">No tracks available</p>
      )}
    </>
  );
};
