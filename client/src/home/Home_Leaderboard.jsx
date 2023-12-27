import "./Home_Leaderboard.css"
import Leaderboard_Data from "../template/Leaderboard_Data"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

function Home_Leaderboard(props) {
    const [leaderboard, setLeaderboard] = useState(null);

    function getLeaderboard() {
        if (Cookies.get("userId") == "" || Cookies.get("userId") == undefined || Cookies.get("userId") == null) return;
        fetch(`https://assiztric-software.vercel.app/getLeaderboard/${Cookies.get("userId")}`, {
            method: "GET",
            cors: "no-cors",
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

    function showInfo() {
        props.setShow(true);
    }

    function setId(id) {
        props.setId(id);
    }   

    return (
        <div className="main-homeLeaderboard">
            <h4 style={{marginBottom: "10px"}}>การใช้งาน</h4>
            <div className="homeLeaderboard">
                {
                    leaderboard != null ? leaderboard.Types.map((data, index) => {
                        if (index < 3) {
                            const leaderboardData = [leaderboard.Types[index], leaderboard.usagePercent[index], leaderboard.timeOfUsege[index], leaderboard.active[index], leaderboard.applianceId[index]];
                            return <Leaderboard_Data isLast={index === 2} data={leaderboardData} isDark={true} setShow={showInfo} setId={setId} />
                        } 
                    }) : <h1 style={{margin:"10px"}}>Loading...</h1>
                }
            </div>
        </div>
    )
}

export default Home_Leaderboard