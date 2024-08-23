import { useState } from "react";

import images from "./images.js";

import GridOptions from "./components/GridOptions.jsx";
import ImagePicker from "./components/ImagePicker";
import FacebookGrid from "./components/FacebookGrid.jsx";
import TwitterGrid from "./components/TwitterGrid.jsx";
import ImageCarousel from "./components/ImageCarousel.jsx";

const initialGridOptions = {
  style: "facebook",
  orientation: "square",
};

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [options, setOptions] = useState(initialGridOptions);

  const data = selectedImages.map((id) => images.find((obj) => obj.id === id));
  const style = options.style;
  const orientation = options.orientation;

  let imageGrid;

  function handleSetOptions(data) {
    setOptions((prev) => {
      if (prev.style === "twitter") return { ...data, orientation: "square" };
      else return { ...prev, ...data };
    });
  }

  function handleOnSelect(imageId) {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImages((prev) => [...prev, imageId]);
    }
  }

  if (style === "facebook") {
    imageGrid = <FacebookGrid data={data} orientation={orientation} />;
  }

  if (style === "twitter") {
    imageGrid = <TwitterGrid data={data} />;
  }

  if (style === "instagram") {
    imageGrid = <ImageCarousel data={data} orientation={orientation} />;
  }

  return (
    <>
      <header>
        <h1>Image Grid</h1>
      </header>

      <main>
        <GridOptions style={style} onSet={handleSetOptions} />

        <ImagePicker
          images={images}
          selectedImages={selectedImages}
          onSelect={handleOnSelect}
        />

        {imageGrid}
      </main>
    </>
  );
}
