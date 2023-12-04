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
    fetch(`https://assiztric-software.vercel.app/getNotification`, {
      method: "GET",
      headers: {
        token: Cookies.get("token"),
        userId: Cookies.get("userId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  }, []);

  const filteredNotifications = notifications?.filter(
    (notification) => notification.code === code
  );

  const groupedNotifications = {};
  filteredNotifications?.forEach((notification) => {
    if (notification && notification.date) {
      if (!groupedNotifications[notification.date]) {
        groupedNotifications[notification.date] = [notification];
      } else {
        groupedNotifications[notification.date].push(notification);
      }
    }
  });

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
        {Object.entries(groupedNotifications).map(([date, notifications]) => (
          <Notification_Group key={date} notifications={notifications} />
        ))}
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
