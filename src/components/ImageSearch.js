import React, {useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function ImageSearch() { 
// State variables
const [query, setQuery] = useState('');
const [images, setlmages] = useState ([]);
const [page, setPage] = useState (1);

useEffect(() => {
// Fetch initial images when the component mounts 
fetchlmages();
}, []);

const fetchlmages = () => {
    // Make a GET request to the Unsplash API 
    axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}`, { 
        headers: {
            Authorization: 'Client-ID leSfvNLvtPfJROqCppHy6sW9XwBeD3prf0WMmxEGYoA',
        },
    })
    .then(response => {
        // Update the images state with the new results
        console.log(response, '1155351')
        setlmages(prevlmages => [...prevlmages, ...response.data.results]);
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
    setlmages ([]);
    setPage(1); 
    fetchlmages();
};

return (
    <div>
        <form onSubmit={handleSubmit}> 
            <input type="text" value={query} onChange={handlelnputChange} placeholder="Search images..." />
            <button type="submit">Search</ button>
        </form>

        <InfiniteScroll
        dataLength={images.length} next={fetchlmages} hasMore={true}
        loader={<h4>Loading..</h4>}
        >
            {
                images.map(image => ( 
                    <img 
                    key={image.id}
                    src={image.urls.small} 
                    alt={image.alt_description} 
                    />
                ))
            } 
        </InfiniteScroll>
    </div>
)
 
}

export default ImageSearch;