import React from 'react';
import LazyLoad from 'react-lazyload';

const LazyImage = ({ src, alt }) => {
  return (
    <LazyLoad height={200}>
      <img src={src} alt={alt} />
    </LazyLoad>
  );
};

export default LazyImage;
