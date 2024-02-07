import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Countries from "../pages/countries/Countries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Countries />,
      },
    ],
  },
]);
export default router;
