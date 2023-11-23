import "./Home_Leaderboard.css"
import Leaderboard_Data from "../templent/Leaderboard_Data"

function Home_Leaderboard() {
    return (
        <div className="main-homeLeaderboard">
            <h4 style={{marginBottom: "10px"}}>การใช้งาน</h4>
            <div className="homeLeaderboard">
                <Leaderboard_Data />
            </div>
        </div>
    )
}

export default Home_Leaderboard