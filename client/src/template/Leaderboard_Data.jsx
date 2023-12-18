import "./Leaderboard_Data.css";
import TV_Logo_Light from "../assets/Television_Icon_Light.svg";
import RightArrow from "../assets/RightArrow.svg";
import { useRef, useEffect } from "react";

function Leaderboard_Data(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (props.data[3]) ref.current.style.backgroundColor = "#82DA85";
    else ref.current.style.backgroundColor = "#E94F4F";
  }, [ref,props.data[3]]);

  return (
    <>
      <div className="main-leaderboardData" onClick={() => {props.setShow();props.setId(props.data[4])}}>
        <img src={TV_Logo_Light} style={{ width: "40px" }} className="image" />
        <div className="leaderboardData">
            <div style={{flexDirection:"column",justifyContent: "space-around",display:"flex",alignItems:"unset",height:"100%",width:"100%"}}>
                <p style={{display:"flex", alignItems:"center"}}>{<div style={{height:"7px", borderRadius:"50%",aspectRatio:"1/1",marginRight:"5px"}} ref={ref}></div>}{props.data[0]}</p>
                <div
                    style={{
                      height: "5px",
                      backgroundColor: "#A2A2A2",
                      width: `${95 * props.data[1] / 100}%`,
                      borderRadius: "10px",
                    }}
                ></div>
            </div>
            <p style={{height:"fit-content",whiteSpace:"nowrap"}}>{props.data[2]} นาที</p>    
        </div>
        <img src={RightArrow} alt="" style={{height:"17px"}} />
      </div>
      {props.isLast ? null : <hr style={{width: "95%",margin:"auto"}} />}
    </>
  );
}

export default Leaderboard_Data;
