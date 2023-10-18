import React, { useState } from "react";
import { genres } from "../utils/genres";
import { getSpotifySearchByGenre } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { DisplayPage } from "./DisplayPage";
export const SearchForMusic = () => {
  const dispatch = useDispatch();
  const display_genre = genres.items;
  const token = localStorage.getItem("spotify_access_token");

  return (
    <>
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          placeholder="What do you want to listen to ?"
        ></input>
      </div>

      <>
        <h2>Browse All</h2>
        <div className="search_for_music_by_genre">
          {display_genre.map((e, i) => {
            return (
              <>
         
                <div
                  onClick={() => {
                    const searchForMusicByGenre = async () => {
                      const response = await dispatch(
                        getSpotifySearchByGenre({
                          payload: { token: token, genre: e.song },
                        })
                      );
                      console.log(response, "SEARCH_PAGE_RESPONSE");
                    };

                    searchForMusicByGenre();
                  }}
                  style={{
                    backgroundImage: `url(${e.img})`,
                  }}
                  key={i}
                >
              
                  <h1>{e.song}</h1>
                </div>
              </>
            );
          })}
        </div>
        <DisplayPage />
      </>
    </>
  );
};
