import { forwardRef, useEffect, useRef, useState } from "react";
import PostCreative from "./PostCreative";

// Renders the fixed 1080x1080 creative and visually scales it down with a
// CSS transform to fit any screen size. The creative's own DOM node (passed
// out via `creativeRef`) always keeps its true 1080x1080 layout box, which
// is what makes the PNG export exact regardless of on-screen size.
const PreviewStage = forwardRef(function PreviewStage(
  { fields, imageDataUrl, pulse },
  creativeRef
) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) setScale(width / 1080);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`preview-stage${pulse ? " pulse" : ""}`}
      ref={containerRef}
      style={{ height: 1080 * scale }}
    >
      <div
        className="preview-stage__scaler"
        style={{ transform: `scale(${scale})` }}
      >
        <PostCreative
          ref={creativeRef}
          title={fields.title}
          location={fields.location}
          price={fields.price}
          highlights={fields.highlights}
          imageDataUrl={imageDataUrl}
        />
      </div>
    </div>
  );
});

export default PreviewStage;
