import React, { useCallback, useState } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories } from '../Data/constants';


export default function NewsComponent() {
    const [categories,setCategories] = useState(news_categories);
    const [selectedCategory, setSelectedCategory]= useState('business');

    const selectedCategoryClickHandler = useCallback(function(){
        console.log("Mani")
    })

    return (
        <>
            <ul className='category-list' onClick={selectedCategoryClickHandler}>
                {categories.map((item, index)=>{
                    if(item.id === selectedCategory) return <li key={item.id} className='category-list-item active-item' onClick={(e)=>{console.log("Srivastava")}}>{item.name}</li>
                    return <li key={item.id} className='category-list-item' onClick={()=>console.log("Kumar")}>{item.name}</li>
                })}
                <li className='category-list-item'><img src={plus} /></li>
            </ul>
            <input className='search-box' type='text' placeholder='Search for keywords, author etc' />
        </>
    )
}

