import "./Home_Leaderboard.css"
import Leaderboard_Data from "../template/Leaderboard_Data"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

function Home_Leaderboard() {
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
        const interval = setInterval(getLeaderboard, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main-homeLeaderboard">
            <h4 style={{marginBottom: "10px"}}>การใช้งาน</h4>
            <div className="homeLeaderboard">
                {
                    leaderboard != null ? leaderboard.Types.map((data, index) => {
                        console.log(leaderboard.active[index]);
                        if (index < 3) {
                            const leaderboardData = [leaderboard.Types[index], leaderboard.usagePercent[index], leaderboard.timeOfUsege[index], leaderboard.active[index]];
                            return <Leaderboard_Data isLast={index === 2} data={leaderboardData} isDark={true} />
                        } 
                    }) : <h1 style={{margin:"10px"}}>Loading...</h1>
                }
            </div>
        </div>
    )
}

export default Home_Leaderboard