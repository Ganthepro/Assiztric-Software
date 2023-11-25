import "./Home.css";
import Nav from "../templent/Nav";
import Header from "../templent/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../templent/Blank";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import liff from "@line/liff";

export function Home(props) {
  const [token, setToken] = useState(null);
  const [profiles, setProfiles] = useState([]);

  async function getProfile() {
    try {
      const response = await fetch('https://api.line.me/v2/profile', {
        headers: {
          'Authorization': `Bearer ${Cookies.get("token")}`
        },
        method: 'GET'
      });
      return response;
    } catch (error) {
      console.error('Error fetching profile ID:', error);
      throw new Error('Failed to fetch profile ID');
    }
  }
  
  async function login() {
    try {
      await liff.init({ liffId: "2001224573-pxK3m42V", withLoginOnExternalBrowser:true }); // Replace with your LIFF ID
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const accessToken = liff.getAccessToken();
        const profile = await getProfile();
        console.log(profile); 
        setProfiles([profile.displayName, profile.pictureUrl]);
        if (accessToken) {
          console.log('Access Token:', accessToken);
          Cookies.set("token", accessToken, { expires: 1 });
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
      {token != null ? (
        <>
          <Header profile={profiles[0]} profilePic={profiles[1]} />
          <div className="body-home">
            <h1 style={{ marginTop: "15px" }}>
             Home
            </h1>
            <Home_Dashboard />
            <Home_Leaderboard />
          </div>
          <Blank />
          <Nav id={props.id} />
        </>
      ) : (
        <div className="main-landing">
          <h1>Waiting for Line...</h1>
        </div>
      )}
    </div>
  );
}
