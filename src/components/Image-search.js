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
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(() => {
    // Fetch initial images when the component mounts 
    fetchImages();

    // setting  screen width when component initially mounts
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // clearing the event when component unmounts
    return () => {
        window.removeEventListener('resize', handleResize);
    };

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


const getImageSize = () => {
    if (screenWidth < 600) {
        // Small screen size
        return 'Small'
    } else if (screenWidth >= 600 && screenWidth < 1200) {
        // Medium screen size
        return 'Medium'
    } else {
        // Large screen size
        return 'Large'
    }
};

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

const imageSize = getImageSize();

return (
    <div>
        <Header handleSearchSubmit={handleSubmit} handleSearchChange={handlelnputChange} searchValue={query} paddingClass={imageSize === 'Small' && 'headerPaddingSmall'}/>

        <InfiniteScroll
            dataLength={images.length} next={fetchImages} hasMore={true}
            loader={<h4>Loading..</h4>}
        >
            {
                images.map(image => ( 
                    <LazyImage 
                    key={image.id}
                    src={image.urls.regular} 
                    alt={image.alt_description} 
                    heightWidthClass={`heightWidth${imageSize}`}
                    />
                ))
            } 
        </InfiniteScroll>
    </div>
)
 
}

export default ImageSearch;