import { Link } from "react-router-dom";
import { StyledGrid } from "../styles/StyleGrid";
import { useSelector } from "react-redux";
const PlaylistsGrid = () => {
  const playlist = useSelector(
    (state) => state.users.spotifyTopPlaylistData
  );
  return (
    <>
      {playlist && playlist.length ? (
        <StyledGrid>
          {playlist.map((e, i) => (
            <>
              <li key={i}>
                <Link
                  className="grid__item__inner"
                  to={`/playlists/${e.id}`}
                >
                  {e.images && e.images[0] && (
                    <div className="grid__item__img">
                      <img alt={e.name} src={e.images[0].url}></img>
                    </div>
                  )}
                  <h3 className="grid__item__name overflow-ellipsis">
                    {e.name}
                  </h3>
                  <p>Playlist</p>
                </Link>
              </li>
            </>
          ))}
        </StyledGrid>
      ) : (
        <p className="empty-notice">No playlist available</p>
      )}
    </>
  );
};
export default PlaylistsGrid;
