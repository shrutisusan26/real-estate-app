import Home from "./pages/homePage/home";
import Layout from "./pages/layout/layout";
import ListPage from "./pages/listPage/listPage";
import Profile from "./pages/profile/profile";
import SinglePage from "./pages/singlePage/singlePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [{
        path:"/",
        element: <Home/>
      },
    {
      path: "/browse",
      element: <ListPage/>
    },
    {
      path: "/:id",
      element: <SinglePage/>
    },
    {
      path: "/profile",
      element: <Profile/>
    }]
    }
    
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
