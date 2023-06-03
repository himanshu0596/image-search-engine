import React from 'react';
import LazyLoad from 'react-lazyload';
import '../styles/lazy-image.css'

const LazyImage = ({ src, alt, heightWidthClass }) => {

  return (
    <LazyLoad>
      <img src={src} alt={alt} className={heightWidthClass} />
    </LazyLoad>
  );
};

export default LazyImage;
