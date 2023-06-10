import { StyledRangeButtons } from "../styles/StyleRangeButtons";
import { useDispatch } from "react-redux";
import { getSpotifyTopTracksShort } from "../redux/userSlice";
import { getSpotifyTopTracksMedium } from "../redux/userSlice";
import { getSpotifyTopTracksLong } from "../redux/userSlice";
import { useSelector } from "react-redux";
export const TimeRangeButtonsForTracks = ({
  activeRange,
  setActiveRange,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.spotifyToken);

  return (
    <div className="range-btn-parent">
      <StyledRangeButtons>
        <li>
          <button
            onClick={() => {
              const getTopTracksDataShort = async () => {
                const response = await dispatch(
                  getSpotifyTopTracksShort(token)
                );
              };
              getTopTracksDataShort();
            }}
            className={activeRange === "short" ? "active" : ""}
          >
            This Month
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              const getTopTracksDataMedium = async () => {
                console.log(token, "token");
                const response = await dispatch(
                  getSpotifyTopTracksMedium(token)
                );
              };
              getTopTracksDataMedium();
            }}
            className={activeRange === "medium" ? "active" : ""}
          >
            Last 6 Months
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              const getTopTracksDataLong = async () => {
                console.log(token, "token");
                const response = await dispatch(
                  getSpotifyTopTracksLong(token)
                );
              };
              getTopTracksDataLong();
            }}
            className={activeRange === "long" ? "active" : ""}
          >
            All Time
          </button>
        </li>
      </StyledRangeButtons>
    </div>
  );
};
