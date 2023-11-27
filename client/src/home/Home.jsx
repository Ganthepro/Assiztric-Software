import "./Home.css";
import Nav from "../templent/Nav";
import Header from "../templent/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../templent/Blank";
import Add from "../templent/Add";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import liff from "@line/liff";

export function Home(props) {
  const show = useRef(null);
  const [token, setToken] = useState(null);

  async function login() {
    try {
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID,
        withLoginOnExternalBrowser: true,
      }); // Replace with your LIFF ID
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const accessToken = liff.getAccessToken();
        show.current.innerHTML = (await liff.getProfile()).userId;
        if (accessToken) {
          console.log("Access Token:", accessToken);
          window.location.reload();
          setToken(accessToken);
        } else {
          console.error("Access token not available");
        }
      }
    } catch (error) {
      console.error("LIFF initialization failed", error);
    }
  }

  useEffect(async () => {
    const tokenCookie = Cookies.get("token");
    tokenCookie ? setToken(tokenCookie) : login();
  }, []);

  return (
    <div className="main-home">
      <Header />
      <div className="body-home">
        <h1 style={{ marginTop: "15px" }} ref={show}>
          Home
        </h1>
        <Home_Dashboard />
        <Home_Leaderboard />
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
