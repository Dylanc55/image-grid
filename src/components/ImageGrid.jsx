import { useEffect, useRef, useState } from "react";

export default function ImageGrid({ data }) {
  const [width, setWidth] = useState();

  const grid = useRef();

  const onResize = () => {
    if (grid.current) setWidth(grid.current.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, [width]);

  let content;

  if (data.length === 1) {
    content = (
      <ul className="one-photo-grid" style={{ gridAutoRows: `auto` }}>
        {data.map(({ id, image: { src, alt } }) => (
          <li
            key={id}
            className="image-container"
            style={{ maxHeight: `${width * 1.5}px` }}
          >
            <img src={src} alt={alt} />
            <button>x</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={grid} id="image-grid">
      {content}
    </div>
  );
}
