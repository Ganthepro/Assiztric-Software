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
/*

  <div className="main-header">
      <div className="in-header">
        <div className="box-left">
          <h1 style={{fontSize:"24px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{props.profiles != null ? `สวัสดีคุณ ${props.profiles[0]}` : "Loading..."}</h1>
          <div className="profile">
            <img src={props.profiles != null ? props.profiles[1] : ""} alt="profile-pic" />
          </div>
        </div>
          <h4 style={{ color: "#E9714F" ,fontSize:"16px"}}>ปล่อย Carbon Footprint {parseInt(props.emission) / 1000} tCO₂e</h4>
      </div>
    </div>

*/
  return (
    <>
      {showInfo ? <Appliance_Info setShow={setShowInfo} id={applianceId} /> : null}
      <div className="main-dashboard">
        <div className="body-dashboard">
          <div className="top">
            <div className="in-header">
              <div className="empty"></div>
              <h1 style={{fontSize:"24px"}}>Dashboard</h1>
              <h4 style={{fontSize:"16px"}}>การใช้ไฟฟ้าในครัวเรือน</h4>
            </div>
          </div>
          <div className="bottom">
            <Dashboard_Graph />
            <Dashboard_Leaderboard setShow={setShowInfo} setId={setApplianceId} />
          </div>
        </div>
        <Blank />
        {!showInfo ? <Add /> : null}
        <Nav id={props.id} />
      </div>
    </>
  );
}
