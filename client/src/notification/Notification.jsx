import './notification.css'

export function Notification() {
    return (
        <div className='main-notification'>
            <div className='body-notification'>
                <h1>Notification</h1>
            </div>
            <Blank />
            <Add />
            <Nav id={props.id} />
        </div>
    )
}