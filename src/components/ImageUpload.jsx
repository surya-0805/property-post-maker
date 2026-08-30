import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

// Optional property photo uploader. Not one of the four required fields —
// when no photo is provided the creative falls back to the built-in visual.
export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const file = fileList && fileList[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (value) {
    return (
      <div className="field">
        <span className="field__label">Property photo</span>
        <div className="image-upload__preview">
          <img src={value} alt="Uploaded property" />
          <button
            type="button"
            className="image-upload__remove"
            onClick={handleRemove}
            aria-label="Remove uploaded photo"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="field">
      <span className="field__label">Property photo (optional)</span>
      <div
        className="image-upload"
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current && inputRef.current.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <span className="image-upload__icon">
          <ImagePlus size={18} />
        </span>
        <span className="image-upload__text">
          <strong>Upload a property photo</strong>
          <span>Skip this to use the default NESTORA visual</span>
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
