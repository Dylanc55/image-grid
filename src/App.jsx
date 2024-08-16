import { useState } from "react";
import ImagePicker from "./components/ImagePicker";

import images from "./images.js";

export default function App() {
  const [selectedImages, setSelectedImages] = useState([]);

  function handleOnSelect(imageId) {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImages((prev) => [...prev, imageId]);
    }
  }

  return (
    <>
      <header>Header</header>
      <main>
        <ImagePicker
          images={images}
          selectedImages={selectedImages}
          onSelect={handleOnSelect}
        />
      </main>
    </>
  );
}
