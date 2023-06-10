import React, { useEffect, useState } from "react";
import ArtistsGrid from "../components/ArtistGrid";
import SectionWrapper from "../components/SectionWrapper";
import { TimeRangeButtons } from "../components/TimeRangeButtons";
import StyledSectionTopArtists from "../styles/StyledSectionTopArtists";
import { useSelector } from "react-redux";
export const TopArtists = () => {
  const topArtists = useSelector(
    (state) => state.users.spotifyTopArtistData
  );
  useEffect(() => {});

  return (
    <main>
      <div className="top_track_parent">
        <SectionWrapper title="Top Artists" breadcrumb={true}>
          <TimeRangeButtons />

          {topArtists && topArtists.length && (
            <ArtistsGrid artists={topArtists} />
          )}
        </SectionWrapper>
      </div>{" "}
    </main>
  );
};
