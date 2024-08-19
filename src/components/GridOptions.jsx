export default function GidOptions({ onSet }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    onSet(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="style-select">Grid Style</label>
        <select name="style" id="style-select">
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="orientation-select">Orientation</label>
        <select name="orientation" id="orientation-select">
          <option value="square">Square</option>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <div className="form-actions">
        <button>Set</button>
      </div>
    </form>
  );
}
