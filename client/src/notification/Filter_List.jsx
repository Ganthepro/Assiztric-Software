import './Filter_List.css'

function Filter_List() {
    return (
        <div className='main-filterList'>
            <h5>กรุณาเลือกประเภทการแจ้งเตือน</h5>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <button>Tips</button>
                <button>Alert</button>
                <button>ค่า Ft</button>
            </div>
        </div>
    )
}

export default Filter_List