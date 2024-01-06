import "./Home.css";
import Nav from "../template/Nav";
import Header from "../template/Header";
import Home_Dashboard from "./Home_Dashboard";
import Home_Leaderboard from "./Home_Leaderboard";
import Blank from "../template/Blank";
import Add from "../template/Add";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Appliance_Info from "../template/Appliance_Info";

export function Home(props) {
  const [profiles, setProfiles] = useState(null);
  const [emission, setEmission] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [applianceId, setApplianceId] = useState(null);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    async function effect() {
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
    }
    effect();
  }, []);

  return (
    <>
      {showInfo ? <Appliance_Info setShow={setShowInfo} id={applianceId} /> : null}
      <div className="main-home">
        <Header profiles={profiles} emission={emission} />
        <div className="body-home">
          <h1 style={{ marginTop: "15px" }}>Home</h1>
          <div>
            <h4>การใช้ไฟฟ้าในครัวเรือนมากที่สุด</h4>
            <h4 style={{color:"#e9714f", marginBottom:"15px"}}>ค่าไฟฟ้า {cost.toFixed(2)} บาท</h4>
          </div>
          <Home_Dashboard emission={setEmission} cost={setCost} />
          <Home_Leaderboard setShow={setShowInfo} setId={setApplianceId} />
        </div>
        <Blank />
        {!showInfo ? <Add /> : null}
        <Nav id={props.id} />
      </div>
    </>
  );
}
