import { useState } from "react";

import images from "./images.js";

import GridOptions from "./components/GridOptions.jsx";
import ImagePicker from "./components/ImagePicker";
import ImageGrid from "./components/ImageGrid.jsx";

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

  function handleSetOptions(data) {
    setOptions(data);
  }

  function handleOnSelect(imageId) {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImages((prev) => [...prev, imageId]);
    }
  }

  return (
    <>
      <header>
        <h1>Image Grid</h1>
      </header>

      <main>
        <GridOptions onSet={handleSetOptions} />

        <ImagePicker
          images={images}
          selectedImages={selectedImages}
          onSelect={handleOnSelect}
        />

        {style === "facebook" && (
          <ImageGrid data={data} orientation={orientation} />
        )}
      </main>
    </>
  );
}
