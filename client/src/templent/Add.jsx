import './Add.css';
import addPic from '../assets/add.svg';
import OverlayAdd from './OverlayAdd';
import { useState, useRef } from 'react';

function Add() {
    const [show, setShow] = useState(false);
    const add = useRef(null);

    function onTouchStart() {
        add.current.style.backgroundColor = '#E9544F';
        add.current.style.borderRadius = '50%';
    }

    function onTouchEnd() {
        add.current.style.backgroundColor = '#E9714F';
        add.current.style.borderRadius = '50%';
    }

    return (
        <div className='main-add'>
            {
                show ? <OverlayAdd setShow={setShow} /> : null
            }
            <div className='button-add' onClick={() => {setShow(true);console.log(show)}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={add}>
                <img src={addPic} alt="add" />
            </div>
        </div>
    );
}

export default Add;