import "./Leaderboard_Data.css";
import Washing_Logo from '../assets/Washing_Icon.svg';
import Fan_Logo from '../assets/Fan_Icon.svg';
import Fridge_Logo from '../assets/Fridge_Icon.svg';
import AirCon_Logo from '../assets/AirCon_Icon.svg';
import Iron_Logo from '../assets/Iron_Icon.svg';
import RiceCookie from '../assets/RiceCooker_Icon.svg';
import AirPurifier from '../assets/AirPurifier_Icon.svg';
import RightArrow from "../assets/RightArrow.svg";
import { useRef, useEffect } from "react";

function Leaderboard_Data(props) {
  const ref = useRef(null);
  const icons = [
    ['WashingMC',Washing_Logo],
    ['RiceCooker',RiceCookie],
    ['ElecFan',Fan_Logo],
    ['Fridge',Fridge_Logo],
    ['AirCon',AirCon_Logo],
    ['Iron',Iron_Logo],
    ['TV',TV_Logo_Dark],
    ['AirPurifier',AirPurifier]
  ]
  useEffect(() => {
    if (props.data[3]) ref.current.style.backgroundColor = "#82DA85";
    else ref.current.style.backgroundColor = "#E94F4F";
  }, [ref,props.data[3]]);

  return (
    <>
      <div className="main-leaderboardData" onClick={() => {props.setShow();props.setId(props.data[4])}}>
        <img src={props.data[0] ? icons.filter((value) => {
          return value[0] === props.data[0] ? value[1] : null
        })[0][1] : TV_Logo_Dark} style={{ width: "40px" }} className="image" />
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
            <p style={{height:"fit-content",whiteSpace:"nowrap"}}>{parseInt(props.data[2])} นาที</p>    
        </div>
        <img src={RightArrow} alt="" style={{height:"17px"}} />
      </div>
      {props.isLast ? null : <hr style={{width: "95%",margin:"auto"}} />}
    </>
  );
}

export default Leaderboard_Data;
