import React from "react";
import LazyLoad from "react-lazyload";
import "../styles/lazy-image.css";

const LazyImage = ({ src, alt, screenWidth, index }) => {
  const styles = {
    //dynamically adjusting image width on screenwidth prop
    dynamicImage: {
      width: `${screenWidth * 0.7}px`,
      height: "auto",
    },

    /* 
      dynamically adjusting image container width and justifying the content which is image and paragraph to 
      flex end or flex start on screenwidth prop and index prop 
    */
    dynamicImageContainer: {
      justifyContent: `${index % 2 === 0 ? "flex-start" : "flex-end"}`,
      width: `${screenWidth}px`,
    },

    /* 
      dynamically adjusting font size of the text in paragraph based upon screen width 
    */
    dynamicDescriptionParagraph: {
      fontSize: `${
        screenWidth < 600 && screenWidth > 400
          ? "x-large"
          : screenWidth < 400
          ? "large"
          : "xx-large"
      }`,
    },
  };

  const descriptionElement = () => {
    // Common code reused twice, to display description along with the image
    return (
      <p
        className="descriptionParagraph"
        style={styles.dynamicDescriptionParagraph}
      >
        {alt.slice(0, 26) + "..."}
      </p>
    );
  };

  return (
    <LazyLoad>
      <div className="imageContainer" style={styles.dynamicImageContainer}>
        {index % 2 !== 0 && descriptionElement()}
        <img src={src} alt={alt} style={styles.dynamicImage} />
        {index % 2 === 0 && descriptionElement()}
      </div>
    </LazyLoad>
  );
};

export default LazyImage;
