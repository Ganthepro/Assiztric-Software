import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './home/Home.jsx'
import { Dashboard } from './dashboard/Dashboard.jsx'
import { Error } from './auth/Error.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home id={1} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard id={1} />,
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("root"));