import React, { useCallback, useState } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories } from '../Data/constants';
import Overlay from '../Utilities/Overlay'


export default function NewsComponent() {
    const [categories,setCategories] = useState(news_categories);
    const [selectedCategory, setSelectedCategory]= useState('business');
    const [showModal, setShowModal] = useState(false);

    const selectedCategoryClickHandler = useCallback(function(e){
        let newCategory = e.target.closest('li').id;
        if(newCategory==='add-item') {
            setShowModal(true)
        }
        else {
            setSelectedCategory(newCategory)
        }
    }, [])

    return (
        <>
            <ul className='category-list' onClick={selectedCategoryClickHandler}>
                {categories.map((item, index)=>{
                    if(item.id === selectedCategory) return <li id={item.id} key={item.id} className='category-list-item active-item'>{item.name}</li>
                    return <li id={item.id} key={item.id} className='category-list-item'>{item.name}</li>
                })}
                <li id='add-item' className='category-list-item'><img src={plus} /></li>
            </ul>
            <input className='search-box' type='text' placeholder='Search for keywords, author etc' />
            {
                showModal ? (
                    <Overlay closeModal={()=>{
                        setShowModal(false)
                    }}>
                        <p>mani</p>
                    </Overlay>
                ):null
            }
        </>
    )
}

