import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const SideBar = ({
  displayCreatePlaylist,
  setDisplayCreatePlaylist,
  playlist,
  setIdOfPlaylist,
}) => {
  const [style, setStyle] = useState({ display: "none" });
  const [displayPlaylistSorts, setDisplayPlaylistSorts] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const token = localStorage.getItem("spotify_access_token");
  const nav = useNavigate();
  useEffect(() => {
    setWindowWidth(window.outerWidth);
    console.log(windowWidth);
  }, [windowWidth]);
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
                <div
                  onClick={() => {
                    nav("/search");
                  }}
                  className="sidebar-icon"
                >
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div>
              {" "}
              {playlist && playlist.length && (
                <div className="sidebar-playlist-main">
                  <div
                    onClick={() => {
                      setDisplayPlaylistSorts(!displayPlaylistSorts);
                    }}
                    className="sidebar-playlist-logo"
                  >
                    <h2>playlist</h2>
                  </div>

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
                              console.log("log form onclick ");
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
                              {e.name.length > 10
                                ? e.name.slice(0, 10)
                                : e.name}
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
