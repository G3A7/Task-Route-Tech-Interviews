import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <Details />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
