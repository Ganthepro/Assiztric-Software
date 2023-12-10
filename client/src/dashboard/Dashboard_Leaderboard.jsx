import "./Dashboard_Leaderboard.css"
import Leaderboard_Data from "../template/Leaderboard_Data";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Dashboard_Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);

    function getLeaderboard() {
        fetch(`http://localhost:5500/getLeaderboard/${Cookies.get("userId")}`, {
            method: "GET",
            headers: {
                token: Cookies.get("token"),
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setLeaderboard(data);
        })
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <div className="main-dashboardLeaderboard">
            <h4 style={{marginBottom:"7px"}}>เวลาการใช้งาน</h4>
            <div className="dashboardLeaderboard">
                {
                    leaderboard != null ? leaderboard.Types.map((data, index) => {
                        const leaderboardData = [leaderboard.Types[index], leaderboard.usagePercent[index], leaderboard.timeOfUsege[index]]
                        return <Leaderboard_Data isLast={index === leaderboard.Types.length - 1} data={leaderboardData} />
                    }) : <h1 style={{margin:"10px"}}>Loading...</h1>
                }
            </div>
        </div>
    )    
}

export default Dashboard_Leaderboard;
