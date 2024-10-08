import { useCallback, useEffect, useRef, useState } from "react";

export default function FacebookGrid({ data, orientation }) {
  const [width, setWidth] = useState();

  const grid = useRef();

  const images = data.slice(0, 5);
  const isMoreThan5 = data.length > 5;

  let classes = "one-photo-grid";
  let styles = { gridAutoRows: `auto` };

  const onResize = useCallback(() => {
    if (grid.current && width !== grid.current.clientWidth) {
      setWidth(grid.current.clientWidth);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, [width, onResize]);

  switch (orientation) {
    case "square": {
      if (images.length === 2) {
        classes = "two-photo-grid";
        styles = { gridAutoRows: `${width / 2}px` };
      } else if (images.length === 3) {
        classes = "three-photo-grid";
        styles = { gridTemplateRows: `${width / 2}px ${width / 2}px` };
      } else if (images.length === 4) {
        classes = "four-photo-grid-square";
        styles = { gridTemplateRows: `${width / 2}px ${width / 2}px` };
      } else if (images.length === 5) {
        classes = "five-photo-grid";
        styles = {
          gridTemplateRows: `${width / 2}px ${width / 3}px`,
        };
      }

      break;
    }

    case "portrait": {
      if (images.length === 2) {
        classes = "two-photo-grid";
        styles = { gridAutoRows: `${width}px` };
      } else if (images.length === 3) {
        classes = "three-photo-grid-portrait";
        styles = { gridTemplateRows: `${width / 2}px ${width / 2}px` };
      } else if (images.length === 4) {
        classes = "four-photo-grid-portrait";
        styles = {
          gridTemplateRows: `${width / 3}px ${width / 3}px ${width / 3}px`,
        };
      } else if (images.length === 5) {
        classes = "five-photo-grid";
        styles = {
          gridTemplateRows: `${width / 2}px ${width / 3}px`,
        };
      }

      break;
    }

    case "landscape": {
      if (images.length === 2) {
        classes = "two-photo-grid-landscape";
        styles = { gridTemplateRows: `${width / 2}px ${width / 2}px` };
      } else if (images.length === 3) {
        classes = "three-photo-grid";
        styles = {
          gridTemplateRows: `${width / 1.505}px ${width / 3.018}px`,
        };
      } else if (images.length === 4) {
        classes = "four-photo-grid-landscape";
        styles = {
          gridTemplateRows: `${width / 3}px ${width / 3}px ${width / 3}px`,
        };
      } else if (images.length === 5) {
        classes = "five-photo-grid-landscape";
        styles = {
          gridTemplateRows: `${width / 6}px ${width / 6}px ${width / 6}px ${
            width / 6
          }px ${width / 6}px ${width / 6}px`,
        };
      }

      break;
    }

    default:
      break;
  }

  return (
    <div ref={grid} id="facebook-grid">
      {images.length === 0 && <div className="placeholder"></div>}

      {images.length > 0 && (
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
