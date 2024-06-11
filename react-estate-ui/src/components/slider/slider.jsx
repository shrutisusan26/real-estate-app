import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeImages = (direction) =>{
    if(direction === 'left'){
      if(imageIndex == 0) {
          setImageIndex(images.length - 1); // go back to the last element 
      }
      else{
        setImageIndex((prev) => (prev - 1));

      }
    }
    if(direction === 'right'){
      if(imageIndex === images.length - 1){
          setImageIndex(0); // go back to the first element
      }
      else{
        setImageIndex((prev) => (prev + 1));
      }
    }
  }
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img src="/arrow.png" alt=""  onClick={() => {changeImages('left')} }/>
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow">
            <img src="/arrow.png" className="right" onClick={() => {changeImages('right')}} alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X{" "}
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, idx) => (
          <img
            src={image}
            alt=""
            key={idx}
            onClick={() => setImageIndex(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
