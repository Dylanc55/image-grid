export default function ImagePicker({ images, selectedImages, onSelect }) {
  return (
    <div id="image-picker">
      <p>Select images to add to grid</p>
      <ul>
        {images.map(({ id, image: { src, alt } }) => (
          <li
            key={id}
            className={selectedImages.includes(id) ? "selected" : undefined}
            onClick={() => onSelect(id)}
          >
            <img src={src} alt={alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}
