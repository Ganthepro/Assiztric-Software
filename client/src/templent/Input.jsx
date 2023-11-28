import './input.css'

function Input(props) {
    return (
        <div className='main-input'>
            <label>{props.title}</label>      
            {
                props.isBig ? 
                <textarea placeholder={props.placeholder} rows="4" cols="50" ref={props.ref} />
                :
                <input type="text" placeholder={props.placeholder} size="50" ref={props.ref} />
            }      
        </div>
    )
}

export default Input