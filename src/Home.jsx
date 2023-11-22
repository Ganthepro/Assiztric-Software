import './Home.css'
import { useRef } from 'react'
import Nav from './Nav'
import Iconfan from './Iconfan'
import Icontv from './Icontv'

export function Home() {
  const setRef = useRef(null);

  function Start(){
    setRef.current.style.backgroundColor = "#be6850";
  }
  function End(){
    setRef.current.style.backgroundColor = "#E9714F";
  }
  return(
    <div className="app-main">
      <div className="app-content">
        <button className="app-overlay-button" onTouchStart={Start} onTouchEnd={End} ref={setRef}>
          +{/* (Optional) Overlay Button */}
        </button>
        <div className="large-box-topic flex-space-between">
          <div className="box-left flex-col">
          <h1>Assiztric</h1>
          <p style={{color: "#E9714F"}}>Today, 21 Nov </p>
          </div>
          <div className="box-right">
            <div className="profile">
              {/* <img src="" alt="profile-pic" /> */}
            </div>
          </div>
        </div>
        <div className="large-box-topic flex-space-between" style={{height: "36px"}}>
          <h1>Home</h1>
        </div>
        <div className="x-large-box"></div>
        <div className="large-box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="large-box-topic flex-space-between" style={{height: "36px"}}>
          <h1>Chart</h1>
        </div>
        <div className="free-box">
          <div className="stat-item">
            <div className="info-pic">
              <Iconfan/>
            </div>
            <div className="info-desc">
              <p>พัดลม</p>
              <div className="stat-one-line">

                <div className="graph-info">
                  <div className="graph">======</div>
                  <div className="text">2ชม. 3นาที</div>
                </div>

                <div className="arrow-right">{">"}</div>
              </div>
            </div>
          </div>
          <div className="stat-item"><div className="info-pic">
              <Icontv/>
            </div>
            <div className="info-desc">
              <p>โทรทัศน์</p>
              <div className="stat-one-line">

                <div className="graph-info">
                  <div className="graph">=========</div>
                  <div className="text">2ชม. 3นาที</div>
                </div>

                <div className="arrow-right">{">"}</div>
              </div>
            </div>

          </div>
          <div className="stat-item"></div>
          <div className="stat-item"></div>
          <div className="stat-item"></div>
        </div>
        <div className="gap-box"></div>
      </div>
    <Nav/>
    </div>
  )
}

// export default Home