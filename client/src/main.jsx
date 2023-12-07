import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './home/Home.jsx'
import { Dashboard } from './dashboard/Dashboard.jsx'
import { Error } from './auth/Error.jsx'
import { Notification } from './notification/notification'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Chart from './dashboard/Chart'
import Filter_List from './notification/Filter_List'
import Cookies from "js-cookie";
import liff from "@line/liff";

async function getToken() {
  // await liff.init({ liffId: "2001224573-pxK3m42V", withLoginOnExternalBrowser:true }); // Replace with your LIFF ID
  // if (liff.isLoggedIn()) return await liff.getAccessToken();
}

async function login() {
  // try {
  //   await liff.init({ liffId: "2001224573-pxK3m42V", withLoginOnExternalBrowser:true }); // Replace with your LIFF ID
  //   Cookies.set("isLogin", false, { expires: 1 })
  //   if (!liff.isLoggedIn()) {
  //     liff.login();
  //   } else {
  //     const accessToken = liff.getAccessToken();
  //     const profile = await liff.getProfile();
  //     if (accessToken) {
  //       Cookies.set("token", accessToken, { expires: 1 });
  //       Cookies.set("userId", profile.userId, { expires: 1 });
  //       Cookies.set("pictureUrl", profile.pictureUrl, { expires: 1 });
  //       Cookies.set("displayName", profile.displayName, { expires: 1 });
  //       Cookies.set("isLogin", true, { expires: 1 })
  //       fetch(`https://assiztric-software.vercel.app/auth`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "token": accessToken,
  //         },
  //         body: JSON.stringify({
  //           userId: Cookies.get("userId"),
  //           displayName: profile.displayName,
  //           pictureUrl: profile.pictureUrl
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           // setProfiles([data.displayName, data.pictureUrl]);
  //       })
  //     } else {
  //       console.error("Access token not available");
  //     }
  //   }
  // } catch (error) {
  //   console.error("LIFF initialization failed", error);
  // }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home id={0} loginFunc={login} tokenFunc={getToken} />,
    // element: <Chart />,
  },
  {
    path: "/dashboard",
    element: <Dashboard id={1} loginFunc={login} tokenFunc={getToken} />,
  },
  {
    path: "/notification",
    element: <Notification id={2} loginFunc={login} tokenFunc={getToken} />,
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