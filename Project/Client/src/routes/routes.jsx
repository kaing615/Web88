import HomePage from "../pages/HomePage.jsx";
import PersonDetail from "../pages/PersonDetail.jsx";
import FavoriteList from "../pages/FavoriteList.jsx";
import MediaList from "../pages/MediaList.jsx";
import MediaDetail from "../pages/MediaDetail.jsx";
import MediaSearch from "../pages/MediaSearch.jsx";
import ReviewList from "../pages/ReviewList.jsx";
import PasswordUpdate from "../pages/PasswordUpdate.jsx";
import ProtectedPage from "../components/common/ProtectedPage.jsx";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "/password-update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export default routes;
