import { useEffect, useRef, useState } from "react";

export default function ImageGrid({ data }) {
  const [width, setWidth] = useState();

  const grid = useRef();

  const images = data.slice(0, 5);
  const isMoreThan5 = data.length > 5;

  const onResize = () => {
    if (grid.current) setWidth(grid.current.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, [width]);

  let classes = "one-photo-grid";
  let styles = { gridAutoRows: `auto` };

  if (images.length === 2) {
    classes = "two-photo-grid";
    styles = { gridAutoRows: `${width / 2}px` };
  }

  if (images.length === 3) {
    classes = "three-photo-grid";
    styles = {
      gridTemplateRows: `${width / 1.505}px ${width / 3.018}px`,
    };
  }

  if (images.length === 4) {
    classes = "four-photo-grid";
    styles = { gridTemplateRows: `${width / 2}px ${width / 2}px` };
  }

  if (images.length === 5) {
    classes = "five-photo-grid";
    styles = {
      gridTemplateRows: `${width / 2}px ${width / 3}px`,
    };
  }

  return (
    <div ref={grid} id="image-grid">
      {!images.length && <div className="placeholder"></div>}

      {!!images.length && (
        <ul className={classes} style={styles}>
          {images.map((image, index) => {
            const {
              id,
              image: { src, alt },
            } = image;

            return (
              <li
                key={id}
                className="image-container"
                style={
                  data.length === 1
                    ? { maxHeight: `${width * 1.5}px` }
                    : undefined
                }
              >
                <img src={src} alt={alt} />

                {/* <button>x</button> */}

                {index === 4 && isMoreThan5 && (
                  <div className="additional-images-overlay">
                    <div className="overlay-text">{`+${data.length - 5}`}</div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
