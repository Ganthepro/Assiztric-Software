import "./Dashboard_Graph.css"

function Dashboard_Graph(props) {
    return (
        <div className="main-dashboardGraph">
            <h4>การใช้ไฟฟ้าในครัวเรือน</h4>
            <div className="dashboardGraph">แผนภูมิ</div>
            <p style={{textAlign:"end"}}>อัปเตดวันนี้ 10.43 PM</p>
        </div>
    );
}

export default Dashboard_Graph;