import "./notifications.css";
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
        const response = await fetch(`https://assiztric-software.vercel.app/getNotification/${Cookies.get('userId')}/${code}`,
          {
            method: "GET",
            headers: {
              token: Cookies.get("token"),
            },
          }
        );
        if (!response.ok) {
          // console.log(response.status);
          // const cookies = document.cookie.split(";");
          // for (let i = 0; i < cookies.length; i++) {
          //   const cookie = cookies[i];
          //   const eqPos = cookie.indexOf("=");
          //   const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          //   Cookies.remove(name);
          // }
          // window.location.reload();
        };
        const data = await response.json();
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
    <div style={{backgroundColor:"white"}}className="main-notification">
      <div className="body-notification">
        <div style={{zIndex:"1000", boxShadow:"0px 2.5px 5px 5px rgba(0,0,0,0.10)"}}className="top">
          <div  className="in-header">
          <div className="empty"></div>
          <h1 style={{fontSize:"24px"}}>Notification</h1>
          <div className="sub-header">
            <h4 style={{fontSize:"16px"}}>รายการแจ้งเตือน</h4>
            <img
              src={Filter}
              alt="filter"
              onClick={() => setShowFilterList(!showFilterList)}
            />
          </div>
          </div>
        </div>
        {showFilterList && (
          <div style={{zIndex:"-10", position: "absolute", left: "0" , top:"120px"}}>
            <Filter_List style={{zIndex:"-5"}} setCode={SetCode} code={code} />
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
      <Add />
      <Nav id={props.id} />
    </div>
  );
}
