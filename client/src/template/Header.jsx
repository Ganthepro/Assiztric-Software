import './Header.css'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import liff from "@line/liff";

function Header() {
  const [profiles, setProfiles] = useState(null);
  
  async function login() {
    try {
      await liff.init({ liffId: "2001224573-pxK3m42V", withLoginOnExternalBrowser:true }); // Replace with your LIFF ID
      Cookies.set("isLogin", false, { expires: 1 })
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const accessToken = liff.getAccessToken();
        const profile = await liff.getProfile();
        if (accessToken) {
          Cookies.set("token", accessToken, { expires: 1 });
          Cookies.set("userId", profile.userId, { expires: 1 });
          Cookies.set("pictureUrl", profile.pictureUrl, { expires: 1 });
          Cookies.set("displayName", profile.displayName, { expires: 1 });
          Cookies.set("isLogin", true, { expires: 1 })
          fetch(`https://assiztric-software.vercel.app/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": accessToken,
            },
            body: JSON.stringify({
              userId: Cookies.get("userId"),
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setProfiles([data.displayName, data.pictureUrl]);
          })
        } else {
          console.error("Access token not available");
        }
      }
    } catch (error) {
      console.error("LIFF initialization failed", error);
    }
  }

  useEffect(async () => {
    if (Cookies.get("userId") == "" || Cookies.get("userId") == undefined || Cookies.get("userId") == null) login();
    else setProfiles([Cookies.get("displayName"), Cookies.get("pictureUrl")]);
  }, []);

  return (
    <div className="main-header">
      <div className="box-left" style={{width:"80%"}}>
        <h1 style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{profiles != null ? profiles[0] : "Loading..."}</h1>
        <h4 style={{ color: "#E9714F" }}>ค่าใช้ไฟฟ้า 1,535.65</h4>
      </div>
      <div className="profile">
        <img src={profiles != null ? profiles[1] : ""} alt="profile-pic" />
      </div>
    </div>
  )
}

export default Header
