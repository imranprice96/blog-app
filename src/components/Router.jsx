import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import PostPage from "./PostPage";
import ErrorPage from "./ErrorPage";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
        },

        {
          path: "posts/:postid",
          element: <PostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
