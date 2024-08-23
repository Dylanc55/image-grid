import { useCallback, useEffect, useRef, useState } from "react";

export default function ImageCarousel({ data, orientation }) {
  const [width, setWidth] = useState();
  const [current, setCurrent] = useState(0);

  const carousel = useRef();

  const imagesLength = data.length;
  const showPrev = current > 0;
  const showNext = current < imagesLength - 1;

  let carouselStyles;
  let itemStyles;

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const onResize = useCallback(() => {
    if (carousel.current && width !== carousel.current.clientWidth) {
      setWidth(carousel.current.clientWidth);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    onResize();

    () => window.removeEventListener("resize", onResize);
  }, [width, onResize]);

  useEffect(() => {
    setCurrent(0);
  }, [imagesLength]);

  if (orientation === "square") {
    carouselStyles = { height: `${width}px` };
    itemStyles = { height: `${width}px`, minWidth: `${width}px` };
  }

  if (orientation === "portrait") {
    carouselStyles = { height: `${width * 1.25}px` };
    itemStyles = { height: `${width * 1.25}px`, minWidth: `${width}px` };
  }

  if (orientation === "landscape") {
    carouselStyles = { height: `${width * 0.67}px` };
    itemStyles = { height: `${width * 0.67}px`, minWidth: `${width}px` };
  }

  return (
    <div ref={carousel} id="instagram-carousel">
      {imagesLength === 0 && <div className="placeholder"></div>}

      {imagesLength > 0 && (
        <div className="main-carousel" style={carouselStyles}>
          <ul style={{ left: `-${width * current}px` }}>
            {data.map(({ id, image: { src, alt } }) => (
              <li key={id} className="image-container" style={itemStyles}>
                <img src={src} alt={alt} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {imagesLength > 0 && showPrev && (
        <button className="prev-button" onClick={handlePrev}>
          &#10094;
        </button>
      )}

      {imagesLength > 0 && showNext && (
        <button className="next-button" onClick={handleNext}>
          &#10095;
        </button>
      )}

      {imagesLength > 1 && (
        <ul className="carousel-indicator-container">
          {data.map(({ id }, index) => (
            <li
              key={id}
              className={
                index === current
                  ? "carousel-indicator current"
                  : "carousel-indicator"
              }
            ></li>
          ))}
        </ul>
      )}
    </div>
  );
}
