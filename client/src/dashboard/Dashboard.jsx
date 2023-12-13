import "./Dashboard.css";
import Dashboard_Graph from "./Dashboard_Graph";
import Dashboard_Leaderboard from "./Dashboard_Leaderboard";
import Blank from "../template/Blank";
import Nav from "../template/Nav";
import Add from "../template/Add";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Appliance_Info from "../template/Appliance_Info";

export function Dashboard(props) {
  const [profiles, setProfiles] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [applianceId, setApplianceId] = useState(null);

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

  useEffect(() => {console.log(applianceId)}, [applianceId]);

  return (
    <>
      {showInfo ? <Appliance_Info setShow={setShowInfo} id={applianceId} /> : null}
      <div className="main-dashboard">
        <div className="body-dashboard">
          <h1>Dashboard</h1>
          <Dashboard_Graph />
          <Dashboard_Leaderboard setShow={setShowInfo} setId={setApplianceId} />
        </div>
        <Blank />
        {!showInfo ? <Add /> : null}
        <Nav id={props.id} />
      </div>
    </>
  );
}
