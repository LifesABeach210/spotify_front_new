import { StyledRangeButtons } from "../styles/StyleRangeButtons";
import { useDispatch } from "react-redux";
import { getSpotifyTopArtistShort } from "../redux/userSlice";
import { getSpotifyTopArtistMedium } from "../redux/userSlice";
import { getSpotifyTopArtistLong } from "../redux/userSlice";
import { useSelector } from "react-redux";
export const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.spotifyToken);

  return (
    <StyledRangeButtons>
      <li>
        <button
          onClick={() => {
            const getTopArtistDataShort = async () => {
              const response = await dispatch(
                getSpotifyTopArtistShort(token)
              );
            };
            getTopArtistDataShort();
          }}
          className={activeRange === "short" ? "active" : ""}
        >
          This Month
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            const getTopArtistDataMedium = async () => {
              console.log(token, "token");
              const response = await dispatch(
                getSpotifyTopArtistMedium(token)
              );
            };
            getTopArtistDataMedium();
          }}
          className={activeRange === "medium" ? "active" : ""}
        >
          Last 6 Months
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            const getTopArtistDataLong = async () => {
              console.log(token, "token");
              const response = await dispatch(
                getSpotifyTopArtistLong(token)
              );
            };
            getTopArtistDataLong();
          }}
          className={activeRange === "long" ? "active" : ""}
        >
          All Time
        </button>
      </li>
    </StyledRangeButtons>
  );
};
