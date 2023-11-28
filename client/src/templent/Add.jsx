import './Add.css';
import addPic from '../assets/add.svg';
import OverlayAdd from './OverlayAdd';
import { useState } from 'react';

function Add() {
    const [show, setShow] = useState(false);

    return (
        <div className='main-add'>
            {
                show ? <OverlayAdd setShow={setShow} /> : null
            }
            <div className='button-add' onClick={() => {setShow(true);console.log(show)}}>
                <img src={addPic} alt="add" />
            </div>
        </div>
    );
}

export default Add;