import { useRef, useState } from "react";
import ControlPanel from "./components/ControlPanel";
import PreviewStage from "./components/PreviewStage";
import { BRAND } from "./data/brand";
import { SAMPLE_PROPERTY } from "./data/sampleData";
import { validateFields } from "./utils/validation";
import { exportNodeAsPng } from "./utils/exportImage";

const EMPTY_FIELDS = { title: "", location: "", price: "", highlights: "" };

export default function App() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const creativeRef = useRef(null);

  function handleFieldChange(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleTrySample() {
    // Clone into a brand-new object rather than assigning the imported
    // constant by reference, so this always goes through a genuine state
    // update (and the shared SAMPLE_PROPERTY object can never be mutated
    // later by anything that touches `fields`).
    setFields({ ...SAMPLE_PROPERTY });
    setErrors({});
    setStatus(null);
  }

  function handleGenerate() {
    const { errors: nextErrors, isValid } = validateFields(fields);
    setErrors(nextErrors);

    if (!isValid) {
      setStatus({
        type: "error",
        message: "Fill in all four required fields to generate the post.",
      });
      return;
    }

    setStatus({ type: "success", message: "Post generated — ready to download." });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 500);
  }

  async function handleDownload() {
    const { errors: nextErrors, isValid } = validateFields(fields);
    setErrors(nextErrors);

    if (!isValid) {
      setStatus({
        type: "error",
        message: "Fill in all four required fields before downloading.",
      });
      return;
    }

    setIsExporting(true);
    setStatus(null);
    try {
      await exportNodeAsPng(creativeRef.current, fields.title);
      setStatus({ type: "success", message: "PNG downloaded — 1080\u00D71080px." });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Couldn't export the PNG. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__mark">N</div>
        <div className="app-header__text">
          <h1>Property Post Maker</h1>
          <p>
            {BRAND.name} · {BRAND.subtitle}
          </p>
        </div>
      </header>

      <main className="app-body">
        <ControlPanel
          fields={fields}
          onFieldChange={handleFieldChange}
          errors={errors}
          imageDataUrl={imageDataUrl}
          onImageChange={setImageDataUrl}
          onTrySample={handleTrySample}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
          status={status}
          isExporting={isExporting}
        />

        <section className="preview-column">
          <span className="preview-column__label">Live Preview</span>
          <PreviewStage
            ref={creativeRef}
            fields={fields}
            imageDataUrl={imageDataUrl}
            pulse={pulse}
          />
          <p className="preview-column__footnote">
            {"Exports as a 1080 \u00D7 1080px PNG, ready to post on Instagram or share on WhatsApp."}
          </p>
        </section>
      </main>
    </div>
  );
}
