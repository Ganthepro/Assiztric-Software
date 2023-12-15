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
  const [notifications, setNotifications] = useState([]);
  const [showFilterList, setShowFilterList] = useState(false);
  const [code, setCode] = useState(0);

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
  }, [props]);

  useEffect(() => {
    async function fetchNotification() {
      try {
        const response = await fetch(`https://assiztric-software.vercel.app/getNotification/${code}`,
          {
            method: "GET",
            headers: {
              token: Cookies.get("token"),
              userId: Cookies.get("userId"),
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setShowFilterList(false);
    }
    fetchNotification();
  }, [code]);

  function SetCode(code) {
    setCode(code);
  }

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
            <Filter_List setCode={SetCode} code={code} />
          </div>
        )}
        {notifications != null &&
          notifications != [] &&
          Object.entries(notifications).map(
            ([date, notifications]) => (
              <Notification_Group date={date} data={notifications} />
            )
          )}
      </div>
      <Blank />
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
