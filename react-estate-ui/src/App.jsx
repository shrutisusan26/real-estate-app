import Home from "./pages/homePage/home";
import { Layout, RequireAuth } from "./pages/layout/layout";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import ListPage from "./pages/listPage/listPage";
import Register from "./pages/register/register.jsx";
import SinglePage from "./pages/singlePage/singlePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./pages/newPostPage/newPostPage.jsx";
import { listPageLoader, singlePageLoader } from "./lib/loader";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/browse",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
