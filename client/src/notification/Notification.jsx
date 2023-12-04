import "./notification.css";
import Filter from "../assets/filter.svg";
import Blank from "../template/Blank";
import Nav from "../template/Nav";
import Add from "../template/Add";
import Notification_Group from "./Notification_Group";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Notification(props) {
  const [profiles, setProfiles] = useState(null);

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

  useEffect(() => {
    fetch(`https://assiztric-software.vercel.app/getNotification`, {
      method:"GET",
      headers: {
        "token": Cookies.get("token"),
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }, []);

  return (
    <div className="main-notification">
      <div className="body-notification">
        <h1>Notification</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>รายการแจ้งเตือน</h4>
          <img src={Filter} alt="filter" />
        </div>
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
        <Notification_Group />
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
