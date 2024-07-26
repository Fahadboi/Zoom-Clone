import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import Meeting from "./Meeting";
import App from "./App";
import { Toaster } from "@/components/ui/toaster";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: (
      <div>
        <h1>Oops! - 404 Error - Page Not Found</h1>
      </div>
    ),
  },
  {
    path: "/Home",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: (
            <Home />
        ),
        errorElement: (
          <div>
            <h1>Oops! - 404 Error - Page Not Found</h1>
          </div>
        ),
      },
      {
        path: "meeting/:meetingID",
        element: <Meeting />,
        errorElement: (
          <div>
            <h1>Oops! - 404 Error - Meeting Not Found</h1>
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);
