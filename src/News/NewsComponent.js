import React, { useState } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories } from '../Data/constants';


export default function NewsComponent() {
    const [categories,setCategories] = useState(news_categories);

    return (
        <>
            <ul className='category-list'>
                {categories.map((item, index)=>{
                    if(index===0) return <li className='category-list-item active-item'>{item.name}</li>
                    return <li className='category-list-item'>{item.name}</li>
                })}
                <li className='category-list-item'><img src={plus} /></li>
            </ul>
        </>
    )
}

