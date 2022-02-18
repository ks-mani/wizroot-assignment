import React, { useCallback, useState, useEffect } from 'react';
import './NewsComponent.css';
import plus from '../assets/icon_ionic-ios-add.svg';

import { news_categories, API_KEY } from '../Data/constants';
import Overlay from '../Utilities/Overlay'
import AddCategoryModal from './AddCategoryModal';
import axios from 'axios';

import moment from 'moment';

import spinner from '../assets/Spinner-1s-200px.svg'


function NewsCard({data}) {
    return (
        <div className="data-card row justify-content-between">
            <div className="text-container col-12 col-md-9 mt-3 mt-md-0">
                <h3 className="m-0">{data.title}</h3>
                <div className="author-date mb-2">
                    <span>{data.author}</span>
                    <span style={{margin: '0 10px'}}>•</span>
                    <span>{moment(data.publishedAt).format('YYYY-MM-DD hh:mm A')}</span>
                </div>
                <p>{data.description}</p>
            </div>
            <div className="img-container col-12 col-md-3 order-first order-md-last d-flex align-items-center justify-content-center">
                <img src={data.urlToImage} alt='' style={{width: 'auto', height: '100%'}} />
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
    const [showSpinner, setShowSpinner] = useState(false);

    const callNewsApi= useCallback((apiUrl)=>{
        setShowSpinner(true);
        axios.get(apiUrl)
        .then((resp)=>{
            setContent(resp.data.articles)
        })
        .catch(err=>{
            console.log("There is an error")
        })
        .finally(()=>{
            setShowSpinner(false);
        })
    },[]);

    useEffect(()=>{
        if(selectedCategory) {
            let obj = categories.find(item=>item.id===selectedCategory);
            let apiUrl = obj.api+`&apiKey=${API_KEY}`
            callNewsApi(apiUrl);
        }
    }, [selectedCategory, callNewsApi, categories])

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
    }, [inputData, callNewsApi])

    return (
        <> 
            <ul className='category-list' onClick={selectedCategoryClickHandler}>
                {categories.map((item, index)=>{
                    if(item.id === selectedCategory) return <li id={item.id} key={item.id} className='category-list-item active-item'>{item.name}</li>
                    return <li id={item.id} key={item.id} className='category-list-item'>{item.name}</li>
                })}
                {
                    (categories.length<5) ? (
                        <li id='add-item' className='category-list-item'><img src={plus} alt='' /></li>
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
            {
                showSpinner ? (
                    <Overlay>
                        <img src={spinner} alt='' width="100px"></img>
                    </Overlay>
                ): null
            }
        </>
    )
}

