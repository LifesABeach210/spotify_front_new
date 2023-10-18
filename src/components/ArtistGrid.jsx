import { StyledGrid } from "../styles/StyleGrid";
import { useDispatch } from "react-redux";
import { getSpotifySingleArtist } from "../redux/userSlice";
import { getSpotifySingleRelatedArtist } from "../redux/userSlice";
import { getSpotifySingleArtistAlbums } from "../redux/userSlice";
import { getSpotifySingleArtistTopTracks } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const ArtistsGrid = ({ artists }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("spotify_access_token");
  const nav = useNavigate();
  return (
    <>
      {artists && artists.length ? (
        <StyledGrid>
          {artists.map((e, i) => (
            <div className="top_track_parent">
              <li className="grid__item" key={i}>
                <div
                  onClick={() => {
                    const singleArtistData = async () => {
                      var responseSingleArtist = await dispatch(
                        getSpotifySingleArtist({
                          payload: { token: token, id: e.id },
                        })
                      );
                      var responseSingleRelatedArtist = await dispatch(
                        getSpotifySingleRelatedArtist({
                          payload: { token: token, id: e.id },
                        })
                      );

                      var responseSingleArtistAlbums = await dispatch(
                        getSpotifySingleArtistAlbums({
                          payload: { token: token, id: e.id },
                        })
                      );

                      var responseSingleArtistTopTracks = await dispatch(
                        getSpotifySingleArtistTopTracks({
                          payload: { token: token, id: e.id },
                        })
                      );

                      if (
                        responseSingleArtist.type ===
                        "spotify/get/artistsById/fulfilled"
                      ) {
                        nav(`/artist/${e.id}`);
                      }
                      console.log(responseSingleRelatedArtist);
                    };
                    singleArtistData();
                  }}
                  key={i}
                  className="grid__item__inner"
                >
                  {e.images[0] && (
                    <div>
                      <img alt={e.name} src={e.images[0]["url"]}></img>
                    </div>
                  )}
                  <h3 className="grid__item__name overflow-ellipsis">
                    {e.name}
                  </h3>
                  <p className="grid__item__label">Artist</p>
                </div>
              </li>
            </div>
          ))}
        </StyledGrid>
      ) : (
        <p className="empty__notice">No Artist Available</p>
      )}
    </>
  );
};
export default ArtistsGrid;
