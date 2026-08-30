import { toPng } from "html-to-image";

// Builds a filesystem-safe filename from the property title.
function buildFileName(title) {
  const slug = (title || "nestora-property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return `${slug || "nestora-property"}-post.png`;
}

// Exports the given DOM node (the unscaled 1080x1080 creative) as a PNG
// and triggers a browser download. `pixelRatio: 1` combined with the
// node's own fixed 1080x1080 layout box guarantees the exported file is
// exactly 1080x1080 pixels, regardless of how it is visually scaled down
// on screen for preview.
export async function exportNodeAsPng(node, title) {
  if (!node) {
    throw new Error("Nothing to export yet — generate a post first.");
  }

  const dataUrl = await toPng(node, {
    width: 1080,
    height: 1080,
    pixelRatio: 1,
    cacheBust: true,
    style: {
      transform: "none",
      margin: "0",
    },
  });

  const link = document.createElement("a");
  link.download = buildFileName(title);
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
