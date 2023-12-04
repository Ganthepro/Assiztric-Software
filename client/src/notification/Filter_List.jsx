import './Filter_List.css'
import { useEffect, useRef } from 'react'

function Filter_List(props) {
    const filterRef = useRef([null,null,null])

    useEffect(() => {

    },[props.code])

    return (
        <div className='main-filterList'>
            <h5>กรุณาเลือกประเภทการแจ้งเตือน</h5>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <button ref={filterRef[0]} onClick={() => setCode(0)} >Tips</button>
                <button ref={filterRef[1]} onClick={() => setCode(1)} >Alert</button>
                <button ref={filterRef[2]} onClick={() => setCode(2)} >ค่า Ft</button>
            </div>
        </div>
    )
}

export default Filter_List