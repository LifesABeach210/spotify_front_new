import { createSlice } from "@reduxjs/toolkit";
import Axios from "../middleware/axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAccessToken } from "../spotify";

export const registerUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    let response = await Axios.post("/users/registerUser", userData);
    console.log(response, "REGISTER_USER_RESPONSE");
    return response;
  }
);
export const getSpotifyUserPlaylistNextTracks = createAsyncThunk(
  "spotify/get/user/playlist/tracks",
  async ({ payload }) => {
    let response = await fetch(`${payload.spotifyNextUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_User_PLAYLIST");
    return responseJSON;
  }
);
export const getSpotifyUserPlaylistById = createAsyncThunk(
  "spotify/get/user/playlist",
  async ({ payload }) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_USERS_PLAYLIST}/${payload.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_User_PLAYLIST");
    return responseJSON;
  }
);
export const getSpotifyTopTracksShort = createAsyncThunk(
  "spotify/get/tracks",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_TRACKS_SHORT}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_TRACKS_FETCH");
    return responseJSON;
  }
);

export const getSpotifyTopTracksMedium = createAsyncThunk(
  "spotify/get/tracks/M",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_TRACKS_MEDIUM}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_TRACKS_FETCH");
    return responseJSON;
  }
);

export const getSpotifyTopTracksLong = createAsyncThunk(
  "spotify/get/tracks/L",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_TRACKS_LONG}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_TRACKS_FETCH");
    return responseJSON;
  }
);

export const getSpotifyTopArtistShort = createAsyncThunk(
  "spotify/get/artists",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_ARTIST_SHORT}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_ARTIST_FETCH");
    return responseJSON;
  }
);
export const getSpotifyTopArtistMedium = createAsyncThunk(
  "sportify/get/artists/M",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_ARTIST_MEDIUM}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_ARTIST_FETCH");
    return responseJSON;
  }
);
export const getSpotifyTopArtistLong = createAsyncThunk(
  "sportify/get/artists/L",
  async (token) => {
    let response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL_TOP_ARTIST_LONG}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "GET_TOP_ARTIST_FETCH");
    return responseJSON;
  }
);
export const loginUser = createAsyncThunk(
  "users/login",
  async (loginData) => {
    let response = await Axios.post("users/login", loginData);
    console.log("LOGIN_USER_RESPONSE", response);
    return response;
  }
);

export const spotifyClientInfo = createAsyncThunk(
  "user/getCode",
  async (state) => {
    let response = await fetch(
      process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL + "/me",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + state,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  }
);
export const spotifyPlaylistInfo = createAsyncThunk(
  "user/getPlaylist",
  async (state) => {
    let response = await fetch(
      process.env.REACT_APP_SPOTIFY_BASE_SEARCH_URL + "/me/playlists",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + state,
        },
      }
    );
    let responseJSON = await response.json();
    console.log(responseJSON, "PLAYLIST_INTO");

    return responseJSON;
  }
);
export const userSlice = createSlice({
  name: "users",
  initialState: {
    firstName: "",
    lastName: "",
    userName: "",
    UserToken: "",
    spotifyToken: "",
    spotifyProfileData: [],
    spotifyTopArtistData: [],
    spotifyTopTracksData: [],
    spotifyTopPlaylistData: [],
    spotifyUserPlaylistById: [],
    spotifyUserPlaylistByIdHeader: [],
  },
  reducers: {
    setSpotifyTokens: (state, action) => {
      switch (action.payload.type) {
        case "SPOTIFY_TOKENS": {
          getAccessToken();
          state.spotifyToken = action.payload.payload;
          const checkToken = localStorage.getItem("spotify_access_token");
          if (checkToken !== state.spotifyToken) {
            state.spotifyToken = checkToken;
          }
          return state;
        }

        default:
          return console.log(action);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("REGISTER_USER_ACTION", action);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("LOGIN_USER_ACTION", action);
    });
    builder.addCase(spotifyClientInfo.fulfilled, (state, action) => {
      state.spotifyProfileData = action.payload;
      console.log("LOGIN_USER_ACTION", action);
    });
    builder.addCase(
      getSpotifyTopArtistShort.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action.payload, "BUILDER_ACTION");
        let data = action.payload.items;
        console.log(data, "TRACKS");

        state.spotifyTopArtistData = data;
      }
    );

    builder.addCase(
      getSpotifyUserPlaylistById.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action, "BUILDER_ACTION");
        let data = action.payload.tracks.items;
        let headerData = action.payload;
        console.log(headerData, "HEADER_DATA");
        console.log(data, "TRACKS");
        state.spotifyUserPlaylistByIdHeaderData = headerData;
        state.spotifyUserPlaylistById = data;
      }
    );
    builder.addCase(
      getSpotifyUserPlaylistNextTracks.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action.payload, "BUILDER_ACTION");
        let data = action.payload.items;
        console.log(data, "TRACKS");

        state.spotifyUserPlaylistById = [
          data,
          ...state.spotifyUserPlaylistById,
        ];
      }
    );
    builder.addCase(
      getSpotifyTopArtistMedium.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action.payload, "BUILDER_ACTION");
        let data = action.payload.items;
        console.log(data, "TRACKS");

        state.spotifyTopArtistData = data;
      }
    );
    builder.addCase(getSpotifyTopArtistLong.fulfilled, (state, action) => {
      console.log(state, "BUILDER_STATE");
      console.log(action.payload, "BUILDER_ACTION");
      let data = action.payload.items;
      console.log(data, "TRACKS");

      state.spotifyTopArtistData = data;
    });
    builder.addCase(
      getSpotifyTopTracksShort.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action, "BUILDER_ACTION");
        let tracks = action.payload.items;
        console.log(tracks, "TRACKS");
        state.spotifyTopTracksData = tracks;
      }
    );
    builder.addCase(
      getSpotifyTopTracksMedium.fulfilled,
      (state, action) => {
        console.log(state, "BUILDER_STATE");
        console.log(action, "BUILDER_ACTION");
        let tracks = action.payload.items;
        console.log(tracks, "TRACKS");
        state.spotifyTopTracksData = tracks;
      }
    );
    builder.addCase(getSpotifyTopTracksLong.fulfilled, (state, action) => {
      console.log(state, "BUILDER_STATE");
      console.log(action, "BUILDER_ACTION");
      let tracks = action.payload.items;
      console.log(tracks, "TRACKS");
      state.spotifyTopTracksData = tracks;
    });
    builder.addCase(spotifyPlaylistInfo.fulfilled, (state, action) => {
      console.log(action, "PLAYIST_ACTION");
      state.spotifyTopPlaylistData = action.payload.items;
    });
  },
});

export const { setSpotifyTokens } = userSlice.actions;
export default userSlice.reducer;
