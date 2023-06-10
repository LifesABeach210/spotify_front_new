import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.SPOTIFY_APP_BASEURL,
  timeout: 3000,
});

export const AxiosSpotify = axios.create({
  baseURL: process.env.SPOTIFY_BASE_SEARCH_URL,
  timeout: 3000,
});

export default Axios;
