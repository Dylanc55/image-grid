import { useCallback, useEffect, useRef, useState } from "react";

let isFirstRender = true;

export default function ImageCarousel({ data, orientation }) {
  const [width, setWidth] = useState();
  const [current, setCurrent] = useState(0);

  const carousel = useRef();

  const showPrev = current > 0;
  const showNext = current < data.length - 1;

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

    if (isFirstRender) {
      isFirstRender = false;
      onResize();
    }

    () => window.removeEventListener("resize", onResize);
  }, [width, onResize]);

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
      {data.length === 0 && <div className="placeholder"></div>}

      {data.length > 0 && (
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

      {data.length > 0 && showPrev && (
        <button className="prev-button" onClick={handlePrev}>
          &#10094;
        </button>
      )}

      {data.length > 0 && showNext && (
        <button className="next-button" onClick={handleNext}>
          &#10095;
        </button>
      )}
    </div>
  );
}
