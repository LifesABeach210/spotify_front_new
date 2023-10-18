import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StyledSectionTopArtists from "../styles/StyledSectionTopArtists";
import ArtistsGrid from "../components/ArtistGrid";
export const DisplayPage = () => {
  const artistFromGenre = useSelector(
    (state) => state.users.spotifySearchByGenre
  );

  const firstSet = artistFromGenre.slice(0, 5);

  const secondSet = artistFromGenre.slice(6, 10);

  const thirdSet = artistFromGenre.slice(11, 15);

  const forthSet = artistFromGenre.slice(16, 20);
  useEffect(() => {
    if (artistFromGenre.length > 1) {
      console.log(firstSet, "FIRST_SET");
    }
  }, [artistFromGenre]);
  return <div>DisplayPage</div>;
};
