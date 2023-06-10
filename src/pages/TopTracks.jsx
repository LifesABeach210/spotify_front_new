import React from "react";
import { useDispatch } from "react-redux";
import SectionWrapper from "../components/SectionWrapper";
import { TimeRangeButtonsForTracks } from "../components/TimeRangeButtonsForTracks";
import { TrackList } from "../components/TrackList";
import { useSelector } from "react-redux";
export const TopTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.spotifyToken);
  const topTracks = useSelector(
    (state) => state.users.spotifyTopTracksData
  );
  return (
    <div>
      <main>
        <SectionWrapper breadcrumb={true} title="Top Tracks">
          <TimeRangeButtonsForTracks></TimeRangeButtonsForTracks>
          {topTracks && topTracks.length > 1 ? (
            <TrackList tracks={topTracks}></TrackList>
          ) : (
            <span></span>
          )}
        </SectionWrapper>
      </main>
    </div>
  );
};
