import React, { useCallback, useState, useEffect } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories, API_KEY } from '../Data/constants';
import Overlay from '../Utilities/Overlay'
import AddCategoryModal from './AddCategoryModal';
import axios from 'axios';


export default function NewsComponent() {
    const [categories,setCategories] = useState(news_categories);
    const [selectedCategory, setSelectedCategory]= useState('techcrunch');
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState('');

    useEffect(()=>{
        if(selectedCategory) {
            let obj = categories.find(item=>item.id===selectedCategory);
            let apiUrl = obj.api+`&apiKey=${API_KEY}`
            callNewsApiForCategory(apiUrl);
        }

        function callNewsApiForCategory(apiUrl) {
            axios.get(apiUrl)
            .then((resp)=>{
                console.log(resp)
            })
            .catch(err=>{
                console.log("There is an error")
            })
        }
    }, [selectedCategory])

    const selectedCategoryClickHandler = useCallback(function(e){
        let newCategory = e.target.closest('li') ? e.target.closest('li').id : '';
        if(newCategory==='') return;

        if(newCategory==='add-item') {
            setShowModal(true)
        }
        else {
            setSelectedCategory(newCategory);
        }
    }, [])

    const addCategory = useCallback((item)=>{
        let newItem = {
            ...item,
            id: item.name+(new Date().toString()) 
        }
        setCategories([...categories, newItem])
        setShowModal(false)
    }, [categories])

    const keyPressHandler = useCallback((event)=>{
        if(event.key === 'Enter') {
            console.log(event)
        } else {
            let val= event.target.value;
            setInputData(val)
        }
    }, [])

    return (
        <> 
            <ul className='category-list' onClick={selectedCategoryClickHandler}>
                {categories.map((item, index)=>{
                    if(item.id === selectedCategory) return <li id={item.id} key={item.id} className='category-list-item active-item'>{item.name}</li>
                    return <li id={item.id} key={item.id} className='category-list-item'>{item.name}</li>
                })}
                {
                    (categories.length<5) ? (
                        <li id='add-item' className='category-list-item'><img src={plus} /></li>
                    ):null
                }
            </ul>
            <input className='search-box' type='text' placeholder='Search for keywords, author etc' value={inputData} onKeyPress={keyPressHandler}/>
            {
                showModal ? (
                    <Overlay closeModal={()=>{
                        setShowModal(false)
                    }}>
                        <AddCategoryModal addCateg={addCategory}></AddCategoryModal>
                    </Overlay>
                ):null
            }
        </>
    )
}

