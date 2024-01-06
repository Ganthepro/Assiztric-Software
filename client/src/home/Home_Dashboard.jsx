import "./Home_Dashboard.css";
import { useEffect, useState } from "react";
import Chart from "../dashboard/Chart";

function Home_Dashboard(props) {
  const currentDate = new Date();
  const [thdate, setDate] = useState("");
  const [watt, setWatt] = useState(0);
  const thMonthNames = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  
  useEffect(() => {
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const thaiMonth = thMonthNames[monthIndex];
    setDate(`${day} ${thaiMonth}`);
  },[]);
  
  return (
    <div className="main-homeDashboard">
      <div>
        <p>รายการเครื่องใช้ไฟฟ้าภายในครัวเรือน</p>
        <p style={{ color: "#e9714f" }}>{`วันนี้, ${thdate}`}</p>
      </div>
      <h4 className="detail">รวมการใช้พลังงาน {parseInt(watt)} วัตต์</h4>
      <div className="homeDashboard"><Chart emission={props.emission} watt={setWatt} cost={props.cost} /></div>
    </div>
  );
}

export default Home_Dashboard;
