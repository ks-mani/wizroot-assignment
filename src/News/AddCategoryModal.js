import React from 'react';
import "./AddCategoryModal.css";
import plus from '../assets/icon_ionic-ios-add_2.svg';

export default function AddCategoryModal() {
    return (
        <div className="modal-card" onClick={(e)=>{e.stopPropagation()}}>
            <h1>Add Category</h1>
            <input className="modal-input w-100" type="text" placeholder="Category Name"></input>
            <input className="modal-input w-100" type="text" placeholder="API URL"></input>
            <button className="modal-submit"><img src={plus} /><span>Add</span></button>
        </div>
    )
}