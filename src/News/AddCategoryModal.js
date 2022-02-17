import React, { useState, useCallback } from 'react';
import "./AddCategoryModal.css";
import plus from '../assets/icon_ionic-ios-add_2.svg';

export default function AddCategoryModal() {
    const [categoryName, setCategoryName] = useState('');
    const [apiUrl, setApiUrl] = useState('');

    const buttonClickHandler = useCallback(()=>{

    }, [])
    return (
        <div className="modal-card" onClick={(e)=>{e.stopPropagation()}}>
            <h1>Add Category</h1>
            <input className="modal-input w-100" type="text" placeholder="Category Name" value={categoryName} onChange={(event)=>{
                event.stopPropagation();
                let val=event.target.value;
                setCategoryName(val)

            }}></input>
            <input className="modal-input w-100" type="text" placeholder="API URL" value={apiUrl} onChange={(event)=>{
                event.stopPropagation();
                let val=event.target.value;
                setApiUrl(val)
            }}></input>
            <button className="modal-submit" onClick={buttonClickHandler}><img src={plus} /><span>Add</span></button>
        </div>
    )
}