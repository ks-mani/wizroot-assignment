import React from 'react';
import './Overlay.css'

export default function Overlay(props) {
    return (
        <div onClick={props.closeModal} className="overlay d-flex align-items-center justify-content-center">
            {props.children}
        </div>
    )
}