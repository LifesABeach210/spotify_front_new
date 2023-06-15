import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HambugerMenu } from "../react-icons/HambugerMenu";
import { SearchIcon } from "../react-icons/SearchIcon";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const SideBar = ({
  displayCreatePlaylist,
  setDisplayCreatePlaylist,
  playlist,
  idOfPlaylist,
  setIdOfPlaylist,
}) => {
  const [style, setStyle] = useState({ display: "none" });
  const [displayPlaylistSorts, setDisplayPlaylistSorts] = useState(false);

  const token = localStorage.getItem("spotify_access_token");
  const nav = useNavigate();
  return (
    <>
      {" "}
      {!token ? (
        <span></span>
      ) : (
        <>
          {" "}
          <div className="sidebar">
            <div className="sidebar-home">
              <div className="sidebar-home-logo">
                <AiOutlineHome />
              </div>
              <h5>Home</h5>
            </div>

            <div className="sidebar-input-parent">
              <div className="sidebar-input-child">
                <div>
                  <AiOutlineSearch />
                </div>
                <div>
                  <input
                    id="sidebar-input"
                    placeholder="Search..."
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div>
              {playlist && playlist.length && (
                <div className="sidebar-playlist-main">
                  <div
                    onClick={() => {
                      setDisplayPlaylistSorts(!displayPlaylistSorts);
                    }}
                    className="sidebar-playlist-logo"
                  >
                    <h2>playlist</h2>
                    {displayCreatePlaylist === true ? (
                      <div className="create-playlist-buttons">
                        <button>
                          <p>create playlist folder</p>
                        </button>
                        <button>
                          <p>Create new playlist</p>
                        </button>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setDisplayCreatePlaylist(!displayCreatePlaylist);
                    }}
                    className="sidebar-add-playlist-logo"
                  >
                    <AiOutlinePlusCircle />
                  </div>
                  {displayPlaylistSorts === true ? (
                    <div className="sidebar-playlist-buttons">
                      <div className="sidebar-playlist-buttons-by-you">
                        <button>
                          <p>By you</p>
                        </button>
                      </div>
                      <div className="sidebar-playlist-buttons-by-spotify">
                        <button>
                          <p>By Spotify</p>
                        </button>
                      </div>
                      <div className="sidebar-playlist-buttons-all-playlist">
                        <button>
                          {" "}
                          <p>All playlist</p>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span></span>
                  )}
                  {playlist.map((e, i) => {
                    return (
                      <div
                        className="playlist-sidebar-content-parent"
                        key={i}
                      >
                        <div className="playlist-sidebar-content">
                          {" "}
                          <div
                            onClick={() => {
                              setIdOfPlaylist(e.id);
                              nav(`playlists/${e.id}`);
                            }}
                            className="playlist-sidebar-content-children"
                          >
                            {" "}
                            {e.images && e.images[0] && (
                              <img
                                className="playlist-sidebar-images"
                                alt={e.name}
                                src={e.images[0].url}
                              ></img>
                            )}
                            <p className="playlist-sidebar-names">
                              view playlist
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
};
