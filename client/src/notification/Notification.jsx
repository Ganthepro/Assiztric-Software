import "./notification.css";
import Filter from "../assets/filter.svg";
import Blank from "../template/Blank";
import Nav from "../template/Nav";
import Add from "../template/Add";
import Notification_Group from "./Notification_Group";
import Filter_List from "./Filter_List";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Notification(props) {
  const [profiles, setProfiles] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [showFilterList, setShowFilterList] = useState(false);
  const [code, setCode] = useState(0);
  const [date, setDate] = useState(null);

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
      method: "GET",
      headers: {
        token: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotifications(data);
      });
  }, []);

  return (
    <div className="main-notification">
      <div className="body-notification">
        <h1>Notification</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>รายการแจ้งเตือน</h4>
          <img
            src={Filter}
            alt="filter"
            onClick={() => setShowFilterList(!showFilterList)}
          />
        </div>
        {showFilterList && (
          <div style={{ position: "absolute", left: "0" }}>
            <Filter_List setCode={setCode} />
          </div>
        )}
        {async () => {
          const dates = {};
          (await notifications) &&
            (await notifications.map((notification) => {
              if (notification.code == code) {
                let flagFound = false;
                for (let i = 0; i < Object.keys(dates).length; i++) {
                  if (Object.keys(dates)[i] == notification.date) {
                    flagFound = true;
                    Object.values(dates)[i].push(notification);
                    return null;
                  }
                }
                if (!flagFound) dates[notification.date] = [notification];
              }
              // if (notification.code == code) {
              //   console.log(notification.date);
              //   return <Notification_Group notification={notification} />;
              // }
            }));
          console.log(dates);
        }}
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
