import './input.css'

function Input(props) {
    return (
        <div className='main-input'>
            <label>{props.title}</label>      
            {
                props.isBig ? 
                <textarea placeholder={props.placeholder} rows="4" cols="50" />
                :
                <input type="text" placeholder={props.placeholder} size="50" />
            }      
        </div>
    )
}

export default Input