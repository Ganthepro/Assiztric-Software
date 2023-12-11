import "./Home.css";
import Nav from "../template/Nav";
import Header from "../template/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../template/Blank";
import Add from "../template/Add";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Home(props) {
  const [profiles, setProfiles] = useState(null);
  const [emission, setEmission] = useState(0);

  useEffect(async () => {
    if (
      Cookies.get("userId") == "" ||
      Cookies.get("userId") == undefined ||
      Cookies.get("userId") == null
    ) {
      await props.loginFunc();
      setProfiles([Cookies.get("displayName"), Cookies.get("pictureUrl")]);
    } else {
      setProfiles([Cookies.get("displayName"), Cookies.get("pictureUrl")]);
      Cookies.set("token", await props.tokenFunc(), { expires: 1 });
    }
  }, []);

  return (
    <div className="main-home">
      <Header profiles={profiles} emission={emission} />
      <div className="body-home">
        <h1 style={{ marginTop: "15px" }}>Home</h1>
        <Home_Dashboard emission={setEmission} />
        <Home_Leaderboard />
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
