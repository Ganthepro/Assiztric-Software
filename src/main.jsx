import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './home/Home.jsx'
import Header from './templent/Header.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/a",
  //   element: <Home />,
  // }
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("root"));

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Home />
//   </React.StrictMode>
// )
