import React, {useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './header';
import LazyImage from './lazy-image';
import ErrorPage from './error-page';

function ImageSearch() { 
// State variables
const [query, setQuery] = useState('');
const [images, setImages] = useState ([]);
const [page, setPage] = useState (1);
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
const [searchInitiated, setSearchInitiated] = useState(false)
const [hasError, setHasError] = useState(false)

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
            setSearchInitiated(true)
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

        // Updating the page number everytime infinite scroll component calls the fetchImages passed in the next which is triggered everytime scroll reaches bottom
        setPage(prevPage => prevPage+1 )

        // Updating hasError state to true as now we have got the succesful response
        setHasError(false)
    })
    .catch(error => { 
        console.log(error);

        // Updating hasError state to false has now we have got the unsuccessful response, and false state will render error component on screen
        setHasError(true);
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
    setSearchInitiated( query ? true : false)
};

return (
    <div>
        <Header handleSearchSubmit={handleSubmit} handleSearchChange={handlelnputChange} searchValue={query} paddingClass={screenWidth <= 900 && 'headerPaddingSmall'}/>

        { searchInitiated && !hasError ?
            <InfiniteScroll
                dataLength={images.length} next={fetchImages} hasMore={true}
                loader={<h4>Loading..</h4>}
            >
                {
                    images.map((image, index) => ( 
                        <LazyImage 
                        key={image.id}
                        src={image.urls.regular} 
                        alt={image.alt_description} 
                        screenWidth={screenWidth}
                        index={index}
                        />
                    ))
                } 
            </InfiniteScroll> : 
            searchInitiated && hasError ? <ErrorPage/> :
            <h4>Try to search an image...</h4>

        }
    </div>
)
 
}

export default ImageSearch;