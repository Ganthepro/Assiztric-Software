import Chart from '../dashboard/Chart';
import './Appliance_Info_Graph.css'
import { useState } from 'react';

function Appliance_Info_Graph(props) {
    const [meanData, setMean] = useState(null);

    return (
        <div className="main-applianceInfoGraph">
            <div className='applianceInfoGraph' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                {
                    props.data != null ? <Chart isOnly={props.data.name} setMean={setMean} /> : <p>Loading..</p>
                }
            </div>
            <div className='applianceInfoGraphDatas'>
                <div className="applianceInfoGraphData">
                    <p>ค่าเฉลี่ยประจำวัน</p>
                    <p>{props.data != null ? `${parseInt(props.data.mean)} วัตต์` : "Avarage"}</p>
                </div>
                <hr />
                <div className="applianceInfoGraphData">
                    <p>เวลาที่ใช้งาน</p>
                    <p>{props.data != null ? `${props.data.timeOfUsege} นาที` : "Time of Usege"}</p>
                </div>
                <hr />
                <div className="applianceInfoGraphData">
                    <p>อัปเดตล่าสุด</p>
                    <p>{props.data != null ? `${props.data.updatedTime}` : "Updated Time"}</p>
                </div>
            </div>
        </div>
    );
}

export default Appliance_Info_Graph;