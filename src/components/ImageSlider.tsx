import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import "./image-slider.css";

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = useCallback(() => {
    setImageIndex((prevIndex) => {
      if (imageIndex === images.length - 1) return 0;
      return prevIndex + 1;
    });
  }, [imageIndex, images]);

  const showPrevImage = useCallback(() => {
    setImageIndex((prevIndex) => {
      if (imageIndex === 0) return images.length - 1;
      return prevIndex - 1;
    });
  }, [imageIndex, images]);

  const showImageKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        showNextImage();
      }
      if (e.key === "ArrowLeft") {
        showPrevImage();
      }
    },
    [showNextImage, showPrevImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", showImageKeyboard);

    return function cleanup() {
      document.removeEventListener("keydown", showImageKeyboard);
    };
  }, [showImageKeyboard]);

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div className="img-container">
        {images.map(({ url, alt }, index) => {
          return (
            <img
              key={url}
              src={url}
              alt={alt}
              className="img-slider-img"
              style={{ transform: `translateX(${imageIndex * 100 * -1}%)` }}
              aria-hidden={index !== imageIndex}
            />
          );
        })}
      </div>

      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previus Image"
      >
        <ArrowBigLeft aria-hidden="true" />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden="true" />
      </button>
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "1rem",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => {
          return (
            <button
              className="img-slider-dot-btn"
              key={index}
              onClick={() => setImageIndex(index)}
              aria-label={`Display Image ${index + 1}`}
            >
              {index === imageIndex ? (
                <CircleDot aria-hidden="true" />
              ) : (
                <Circle aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ImageSlider;
