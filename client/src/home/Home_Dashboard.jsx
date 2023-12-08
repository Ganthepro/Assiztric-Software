import "./Home_Dashboard.css";
import { useEffect, useState } from "react";
import Chart from "../dashboard/Chart";

function Home_Dashboard() {
  const currentDate = new Date();
  const [thdate, setDate] = useState("");
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
        <h4>รายการเครื่องใช้ไฟฟ้าภายในครัวเรือน</h4>
        <p style={{ color: "#e9714f" }}>{`วันนี้, ${thdate}`}</p>
      </div>
      <h4 className="detail">รวมการใช้พลังงาน 63.53 หน่วย</h4>
      <div className="homeDashboard"><Chart /></div>
    </div>
  );
}

export default Home_Dashboard;
