import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login/Login.jsx";
import Body from "../src/Body.jsx"
import Register from "./components/auth/login/Register.jsx";

import Dashboard from "./components/dashboard/Dashboard";
import Veglist from "./components/veglist/Veglist";
import FarmerList from "./components/farmerlist/Farmerlist";
import MerchantList from "./components/merchantlist/Merchantlist";
import Bill from "./components/bill/Bill";
import BillList from "./components/bill/BillList";
import BillView from "./components/bill/BillView.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "signup", element: <Register /> },

      {
        path: "dashbord",
        element: <Body />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "bill", element: <Bill /> },
          { path: "veglist", element: <Veglist /> },
          { path: "farmerlist", element: <FarmerList /> },
          { path: "merchantlist", element: <MerchantList /> },
          { path: "billlist", element: <BillList /> },
          { path: "billview/:id", element: <BillView /> }
        ]
      }
    ]
  }
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
