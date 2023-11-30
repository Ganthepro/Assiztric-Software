import "./Dashboard_Leaderboard.css"
import Leaderboard_Data from "../template/Leaderboard_Data";

function Dashboard_Leaderboard() {
    return (
        <div className="main-dashboardLeaderboard">
            <h4 style={{marginBottom:"7px"}}>เวลาการใช้งาน</h4>
            <div className="dashboardLeaderboard">
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={false} />
                <Leaderboard_Data isLast={true} />
            </div>
        </div>
    )    
}

export default Dashboard_Leaderboard;
