import React, { useCallback, useState, useEffect } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories, API_KEY } from '../Data/constants';
import Overlay from '../Utilities/Overlay'
import AddCategoryModal from './AddCategoryModal';
import axios from 'axios';

import moment from 'moment';


function NewsCard({data}) {
    return (
        <div className="data-card row justify-content-between">
            <div className="text-container col-12 col-md-9">
                <h3 className="m-0">{data.title}</h3>
                <div className="author-date mb-2">
                    <span>{data.author}</span>
                    <span style={{margin: '0 10px'}}>•</span>
                    <span>{moment(data.publishedAt).format('YYYY-MM-DD hh:mm A')}</span>
                </div>
                <p>{data.description}</p>
            </div>
            <div className="img-container col-12 col-md-3 order-first order-md-last">
                <img src={data.urlToImage} style={{width: 'auto', height: '100%', marginLeft: '-50px'}} />
            </div>
        </div>
    )
}


export default function NewsComponent() {
    const [categories,setCategories] = useState(news_categories);
    const [selectedCategory, setSelectedCategory]= useState('techcrunch');
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState('');
    const [content, setContent] = useState([]);

    useEffect(()=>{
        if(selectedCategory) {
            let obj = categories.find(item=>item.id===selectedCategory);
            let apiUrl = obj.api+`&apiKey=${API_KEY}`
            callNewsApi(apiUrl);
        }
    }, [selectedCategory])

    const callNewsApi= useCallback((apiUrl)=>{
        axios.get(apiUrl)
        .then((resp)=>{
            setContent(resp.data.articles)
        })
        .catch(err=>{
            console.log("There is an error")
        })
    },[])

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
            let apiUrl = `https://newsapi.org/v2/everything?q=${inputData}&apiKey=${API_KEY}`;
            setSelectedCategory('');
            callNewsApi(apiUrl)
        }
    }, [inputData])

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
            <input className='search-box' type='text' placeholder='Search for keywords, author etc' value={inputData} onKeyPress={keyPressHandler} onChange={(event)=>{
                let val= event.target.value;
                setInputData(val)
            }}/>
            { content.length>0 ? (
                content.map((item)=>{
                    return (
                        <NewsCard key={item.publishedAt} data={item}></NewsCard>
                    )
                })
            ): null}
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

