import React from 'react';
import LazyLoad from 'react-lazyload';

const LazyImage = ({ src, alt, screenWidth }) => {

  const styles = {
    width: `${screenWidth}px`,
    height: 'auto'
  };

  return (
    <LazyLoad>
      <img src={src} alt={alt} style={styles} />
    </LazyLoad>
  );
};

export default LazyImage;
