import { useCallback, useEffect, useRef, useState } from "react";

let isFirstRender = true;

export default function ImageCarousel({ data, orientation }) {
  const [width, setWidth] = useState();
  const [current, setCurrent] = useState(0);

  const carousel = useRef();

  const start = 0;
  const end = data.length ? data.length - 1 : 0;

  let styles;

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
    styles = { height: `${width}px` };
  }

  if (orientation === "portrait") {
    styles = { height: `${width * 1.25}px` };
  }

  return (
    <div ref={carousel} id="instagram-carousel">
      {data.length === 0 && <div className="placeholder"></div>}

      <ul>
        {data.map(({ id, image: { src, alt } }) => (
          <li key={id} className="image-container" style={styles}>
            <img src={src} alt={alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}
