import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login/Login.jsx";
import Body from "../src/Body.jsx"
import Register from "./components/auth/login/Register.jsx";

const router = createBrowserRouter([
  {
    path:"/", 
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Register/>
      },
      {
        path:"dashbord",
        element:<Body/>
      }
    ]
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
