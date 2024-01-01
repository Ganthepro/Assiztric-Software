import './Appliance_Info.css';
import LeftArrowIcon from '../assets/Left_Arrow_Icon.svg';
import Appliance_Info_Graph from './Appliance_Info_Graph';
import Appliance_Info_Info from './Appliance_Info_Info';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Appliance_Info(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://assiztric-software.vercel.app/getApplianceInfo/${Cookies.get('userId')}/${props.id}`, {
      method: "GET",
      headers: {
        token: Cookies.get("token"),
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
        console.log(err);
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          Cookies.remove(name);
        }
        window.location.reload();
      });
  }, [props.id]);

  return (
        <div className="main-applianceInfo">
        <div style={{display: "flex",marginBottom:"15px"}}>
            <div style={{display: "flex",justifyContent:"space-between",alignItems:"center",width:"65px"}} onClick={() => props.setShow(false)}>
                <img src={LeftArrowIcon} alt="left-arrow-icon" style={{width: "15px", height: "15px"}} />
                <p style={{color:"#E9714F"}}>Home</p>
            </div>
            <h3 style={{ left: "50%",position: "absolute",transform:"translate(-50%,0)" }}>{data != null ? data.name : "Name"}</h3>
        </div>
        <Appliance_Info_Graph data={data} />
        <h4 style={{marginTop:"15px"}}>ข้อมูล</h4>
        <Appliance_Info_Info data={data} />
    </div>
  );
}

export default Appliance_Info;