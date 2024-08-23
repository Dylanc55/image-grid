import { useCallback, useEffect, useRef, useState } from "react";

let isFirstRender = true;

export default function TwitterGrid({ data }) {
  const [width, setWidth] = useState();

  const grid = useRef();

  const images = data.slice(0, 4);

  let classes;
  let styles;

  const onResize = useCallback(() => {
    if (grid.current && width !== grid.current.clientWidth) {
      setWidth(grid.current.clientWidth);
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

  if (images.length === 1) {
    classes = "one-photo-grid";
  }

  if (images.length === 2) {
    classes = "two-photo-grid";
    styles = { gridAutoRows: `${width / 1.5}px` };
  }

  if (images.length === 3) {
    classes = "three-photo-grid";
    styles = { gridTemplateRows: `${width / 3.1}px ${width / 3.1}px` };
  }

  if (images.length === 4) {
    classes = "four-photo-grid";
    styles = { gridAutoRows: `${width / 3.1}px` };
  }

  return (
    <div ref={grid} id="twitter-grid">
      {images.length === 0 && <div className="placeholder"></div>}

      {images.length > 0 && (
        <ul className={classes} style={styles}>
          {images.map(({ id, image: { src, alt } }) => (
            <li key={id} className="image-container">
              <img src={src} alt={alt} />

              {/* <button>x</button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
