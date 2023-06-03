import React, {useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './header';
import LazyImage from './lazy-image';

function ImageSearch() { 
// State variables
const [query, setQuery] = useState('');
const [images, setImages] = useState ([]);
const [page, setPage] = useState (1);

useEffect(() => {
// Fetch initial images when the component mounts 
fetchImages();
}, []);

useEffect(()=>{
// to automatically search images when user stops typing

// using debouncing to delay the execution of callback function and cleaning up the timer to prevent unnecessary api calls on every key press

const delayDebounceFn = setTimeout(()=>{
    if(query){
        setImages ([]);
        setPage(1); 
        fetchImages();
    }
}, 500)

return () => clearTimeout(delayDebounceFn)
}, [query])

const fetchImages = async () => {
    // Make a GET request to the Unsplash API 
    await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}`, { 
        headers: {
            Authorization: 'Client-ID leSfvNLvtPfJROqCppHy6sW9XwBeD3prf0WMmxEGYoA',
        },
    })
    .then(response => {
        // Update the images state with the new results
        setImages(prevlmages => [...prevlmages, ...response.data.results]);
        setPage(prevPage => prevPage+1 )
    })
    .catch(error => { console.log(error);
    });
}

const handlelnputChange = event => {
    setQuery (event.target.value); 
};

const handleSubmit = event => {
    event.preventDefault();
    // Clear existing images and fetch new ones based on the query 
    setImages ([]);
    setPage(1); 
    fetchImages();
};

return (
    <div>
        <Header handleSearchSubmit={handleSubmit} handleSearchChange={handlelnputChange} searchValue={query}></Header>

        <div>
            {
                images.map(image => ( 
                    <LazyImage 
                    key={image.id}
                    src={image.urls.regular} 
                    alt={image.alt_description} 
                    />
                ))
            } 
        </div>
    </div>
)
 
}

export default ImageSearch;