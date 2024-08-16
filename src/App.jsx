import { useState } from "react";
import ImagePicker from "./components/ImagePicker";

import images from "./images.js";
import ImageGrid from "./components/ImageGrid.jsx";

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);

  const data = selectedImages.map((id) => images.find((obj) => obj.id === id));

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
        <ImageGrid data={data} />

        <ImagePicker
          images={images}
          selectedImages={selectedImages}
          onSelect={handleOnSelect}
        />
      </main>
    </>
  );
}
