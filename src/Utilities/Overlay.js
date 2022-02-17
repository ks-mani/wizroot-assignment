import React from 'react';
import './Overlay.css'

export default function Overlay(props) {
    return (
        <div className="overlay d-flex align-items-center justify-content-center">
            {props.children}
        </div>
    )
}