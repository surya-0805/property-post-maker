import { AlertCircle, CheckCircle2, Download, Wand2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

const FIELD_CONFIG = [
  {
    key: "title",
    label: "Property & type",
    placeholder: "e.g. 4 BHK Luxury Villa, Ansal Golf City",
    type: "input",
  },
  {
    key: "location",
    label: "Location",
    placeholder: "e.g. Sushant Golf City, Lucknow",
    type: "input",
  },
  {
    key: "price",
    label: "Price",
    placeholder: "e.g. \u20B92.5 Cr onwards",
    type: "input",
  },
  {
    key: "highlights",
    label: "Highlights",
    placeholder: "e.g. 3000 sq.ft \u00B7 Corner plot \u00B7 Ready to move",
    type: "textarea",
  },
];

export default function ControlPanel({
  fields,
  onFieldChange,
  errors,
  imageDataUrl,
  onImageChange,
  onTrySample,
  onGenerate,
  onDownload,
  status,
  isExporting,
}) {
  return (
    <div className="control-panel">
      <div className="control-panel__intro">
        <h2>Create a property post</h2>
        <p>
          Fill in the property details below. Branding and contact info are
          added automatically.
        </p>
      </div>

      {FIELD_CONFIG.map((field) => (
        <div className="field" key={field.key}>
          <label className="field__label" htmlFor={field.key}>
            {field.label}
            <span className="required-dot" aria-hidden="true" />
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.key}
              className={`field__control${
                errors[field.key] ? " has-error" : ""
              }`}
              rows={3}
              placeholder={field.placeholder}
              value={fields[field.key] ?? ""}
              onChange={(e) => onFieldChange(field.key, e.target.value)}
            />
          ) : (
            <input
              id={field.key}
              className={`field__control${
                errors[field.key] ? " has-error" : ""
              }`}
              type="text"
              placeholder={field.placeholder}
              value={fields[field.key] ?? ""}
              onChange={(e) => onFieldChange(field.key, e.target.value)}
            />
          )}

          {field.key === "highlights" && (
            <span className="field__hint">
              {"Separate items with \u00B7, a comma, or a new line."}
            </span>
          )}

          {errors[field.key] && (
            <span className="field__error">
              <AlertCircle size={13} />
              {errors[field.key]}
            </span>
          )}
        </div>
      ))}

      <ImageUpload value={imageDataUrl} onChange={onImageChange} />

      <div className="control-panel__actions">
        <button type="button" className="btn btn-secondary" onClick={onTrySample}>
          <Wand2 size={16} />
          Try Sample
        </button>

        <button type="button" className="btn btn-primary" onClick={onGenerate}>
          <CheckCircle2 size={16} />
          Generate Post
        </button>

        <button
          type="button"
          className="btn btn-download"
          onClick={onDownload}
          disabled={isExporting}
        >
          <Download size={16} />
          {isExporting ? "Preparing PNG\u2026" : "Download PNG"}
        </button>
      </div>

      {status && (
        <div className={`status-banner ${status.type}`}>
          {status.type === "success" ? (
            <CheckCircle2 size={14} />
          ) : (
            <AlertCircle size={14} />
          )}
          {status.message}
        </div>
      )}
    </div>
  );
}
