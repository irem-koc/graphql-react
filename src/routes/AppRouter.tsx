import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Countries from "../pages/countries/Countries";
import FavCountries from "../pages/favCountries/FavCountries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Countries />,
      },
      {
        path: "/favCountries",
        element: <FavCountries />,
      },
    ],
  },
]);
export default router;
