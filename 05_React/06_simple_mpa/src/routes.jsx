import App from "./App";
import DefaultProfile from "./DefaultProfile";
import ErrorPage from "./ErrorPage";
import Popeye from "./Popeye";
import Profile from "./Profile";
import Spinach from "./Spinach";
import Items from "./Items";
// import { Navigate } from "react-router-dom";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      // Dealing with NESTED routes
      path: "profile",
      element: <Profile />,
      children: [
        { index: true, element: <DefaultProfile /> }, // Shows a default profile content inside Outlet
        { path: "spinach", element: <Spinach /> },
        { path: "popeye", element: <Popeye /> },   
      ],
    },
    {
      // Dealing with DYNAMIC routes
      path: "items/:name",
      element: <Items />,
      children: [
        // { index: true, element: <Navigate to="/profile/popeye" replace /> }, // <Navigate /> redirect example
        { index: true, element: <DefaultProfile /> }, // Shows a default profile content inside Outlet
        { path: " ", element: <DefaultProfile /> }, // Handles cases where no child path is given 
        { path: "spinach", element: <Spinach /> },
        { path: "popeye", element: <Popeye /> },   
      ],
    },
];

export default routes;