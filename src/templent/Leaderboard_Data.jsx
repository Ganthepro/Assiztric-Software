import "./Leaderboard_Data.css";
import TV_Logo from "../assets/Television_Icon.svg";
import RightArrow from "../assets/RightArrow.svg";

function Leaderboard_Data(props) {
  return (
    <>
      <div className="main-leaderboardData">
        <img src={TV_Logo} style={{ width: "40px" }} />
        <div className="leaderboardData">
            <div style={{flexDirection:"column",justifyContent: "space-around",display:"flex",alignItems:"unset",height:"100%",width:"100%"}}>
                <p>โทรทัศน์</p>
                <div
                    style={{
                    height: "5px",
                    backgroundColor: "#A2A2A2",
                    width: "95%",
                    borderRadius: "10px",
                    }}
                ></div>
            </div>
            <p style={{height:"fit-content",whiteSpace:"nowrap"}}>1 ชม. 3 นาที</p>    
        </div>
        <img src={RightArrow} alt="" style={{height:"17px"}} />
      </div>
      {props.isLast ? null : <hr />}
    </>
  );
}

export default Leaderboard_Data;
