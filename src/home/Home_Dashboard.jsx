import "./Home_Dashboard.css";

function Home_Dashboard() {
  return (
    <div className="main-homeDashboard">
      <div>
        <h4>รายการเครื่องใช้ไฟฟ้าภายในครัวเรือน</h4>
        <p style={{ color: "#e9714f" }}>วันนี้, 21 พ.ย.</p>
      </div>
      <h4 className="detail">รวมการใช้พลังงาน 63.53 หน่วย</h4>
      <div className="homeDashboard">แผนภูมิ</div>
    </div>
  );
}

export default Home_Dashboard;
