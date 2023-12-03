import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './home/Home.jsx'
import { Dashboard } from './dashboard/Dashboard.jsx'
import { Error } from './auth/Error.jsx'
import { Notification } from './notification/notification'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home id={0} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard id={1} />,
  },
  {
    path: "/notification",
    element: <Notification />,
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