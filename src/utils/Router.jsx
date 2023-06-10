import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PlayList } from "../pages/PlayList";
import { TopArtists } from "../pages/TopArtists";
import { TopTracks } from "../pages/TopTracks";
import { Home } from "../pages/Home";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/playlist",
        element: <PlayList />,
      },
      {
        path: "/playlist/:id",
        element: <PlayList />,
      },
      {
        path: "/top-tracks",
        element: <TopTracks />,
      },
      { path: "/top-artists", element: <TopArtists /> },
    ],
  },
]);

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="playlist/:id" element={<PlayList />} />
//       <Route path="playlist" element={<PlayList />}></Route>
//       <Route path="top-artists" element={<TopArtists />}></Route>
//       <Route path="top-tracks" element={<TopTracks />}></Route>
//     </Route>
//   )
// );

// <Router>
// <ScrollToTop />
// <Routes>
//   <Route path="/top-artists" element={<TopArtists />}></Route>
//   <Route path="/top-tracks" element={<TopTracks />}></Route>
//   <Route path="/playlist/:id" element={<PlayList />}></Route>
//   <Route path="/playlist" element={<PlayList />}></Route>
//   <Route path="/" element={<Home />}></Route>
// </Routes>
// </Router>
