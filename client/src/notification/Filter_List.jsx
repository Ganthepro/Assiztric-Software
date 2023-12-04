import './Filter_List.css'
import { useEffect, useRef } from 'react'

function Filter_List(props) {
    const filterRef = useRef([null, null, null]);

    useEffect(() => {
      if (filterRef.current.every(ref => ref !== null)) {
        for (let i = 0; i < 3; i++) {
          if (i === props.code) {
            filterRef.current[i].style.backgroundColor = "#E9714F";
            filterRef.current[i].style.color = "white";
          } else {
            filterRef.current[i].style.backgroundColor = "#E0E0E0";
            filterRef.current[i].style.color = "#818080";
          }
          console.log(i);
        }
      }
    }, [props.code]);

    return (
        <div className='main-filterList'>
            <h5>กรุณาเลือกประเภทการแจ้งเตือน</h5>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <button ref={el => (filterRef.current[0] = el)} onClick={() => props.setCode(0)} >Tips</button>
                <button ref={el => (filterRef.current[1] = el)} onClick={() => props.setCode(1)} >Alert</button>
                <button ref={el => (filterRef.current[2] = el)} onClick={() => props.setCode(2)} >ค่า Ft</button>
            </div>
        </div>
    )
}

export default Filter_List