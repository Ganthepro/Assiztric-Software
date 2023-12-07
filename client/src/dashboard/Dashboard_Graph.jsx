import "./Dashboard_Graph.css";
import { useEffect, useRef, useState } from "react";
import Chart from "./Chart";
import Cookies from "js-cookie";

function Dashboard_Graph() {
  const option = [useRef(null), useRef(null)];
  const slideBar = useRef(null);
  const [slideBarMove, setSlideBarMove] = useState(0);
  
  useEffect(() => {
    if (slideBar) {
      if (slideBarMove === 0) {
        slideBar.current.style.left = "0";
        slideBar.current.style.transition = "left 0.5s";
      } else slideBar.current.style.left = "50%";
    }
  }, [slideBarMove]);

  return (
    <div className="main-dashboardGraph">
      <h4 style={{ marginBottom: "5px" }}>การใช้ไฟฟ้าในครัวเรือน</h4>
      <div className="slideBar">
        <button
          style={{ left: "25%" }}
          ref={option[0]}
          onClick={() => setSlideBarMove(0)}
        >
          วัน
        </button>
        <button
          style={{ left: "75%" }}
          ref={option[1]}
          onClick={() => setSlideBarMove(1)}
        >
          สัปดาห์
        </button>
        <div className="bar-slideBar" ref={slideBar}></div>
      </div>
      <div className="dashboardGraph">
        <p
          style={{
            top: "0",
            left: "0",
            margin: "5px",
            position: "absolute",
            color: "#E9714F",
          }}
        >
          อัปเตดวันนี้ 10.43 PM
        </p>
        {/* แผนภูมิ */}
        {/* <Bar data={data} /> */}
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard_Graph;
