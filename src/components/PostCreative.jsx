import { forwardRef } from "react";
import { MapPin, Ruler } from "lucide-react";
import DefaultHero from "./DefaultHero";
import { BRAND } from "../data/brand";
import { splitHighlights } from "../utils/highlights";

// Shrinks the title font as the text gets longer so long property names
// stay on a controlled number of lines instead of breaking the layout.
function titleFontSize(title) {
  const len = (title || "").length;
  if (len <= 26) return 58;
  if (len <= 38) return 50;
  if (len <= 52) return 42;
  if (len <= 70) return 35;
  return 30;
}

const PostCreative = forwardRef(function PostCreative(
  { title, location, price, highlights, imageDataUrl },
  ref
) {
  const chips = splitHighlights(highlights);
  const displayTitle = title && title.trim() ? title : "Your Property Name & Type";
  const displayLocation = location && location.trim() ? location : "Property location";
  const displayPrice = price && price.trim() ? price : "Price on request";

  return (
    <div className="post-creative" ref={ref}>
      <span className="post-creative__corner tl" />
      <span className="post-creative__corner tr" />
      <span className="post-creative__corner bl" />
      <span className="post-creative__corner br" />

      <div className="post-creative__hero">
        <div className="post-creative__hero-frame">
          {imageDataUrl ? (
            <img src={imageDataUrl} alt="Property" crossOrigin="anonymous" />
          ) : (
            <DefaultHero />
          )}
          <div className="post-creative__hero-shade" />

          <div className="post-creative__brand-tag">
            <strong>{BRAND.name}</strong>
            <span>{BRAND.subtitle}</span>
          </div>

          <div className="post-creative__price-tag">{displayPrice}</div>
        </div>
      </div>

      <div className="post-creative__content">
        <h2
          className="post-creative__title"
          style={{ fontSize: titleFontSize(displayTitle) }}
        >
          {displayTitle}
        </h2>

        <div className="post-creative__location">
          <MapPin size={20} />
          <span>{displayLocation}</span>
        </div>

        <hr className="post-creative__divider" />

        <div className="post-creative__highlights">
          {chips.length > 0 ? (
            chips.map((chip, i) => (
              <span className="post-creative__chip" key={`${chip}-${i}`}>
                <Ruler size={14} />
                {chip}
              </span>
            ))
          ) : (
            <span className="post-creative__chip">
              <Ruler size={14} />
              Add highlights to feature them here
            </span>
          )}
        </div>
      </div>

      <div className="post-creative__footer">
        <div className="post-creative__agent">
          <div className="post-creative__avatar">{BRAND.initials}</div>
          <div className="post-creative__agent-text">
            <strong>{BRAND.consultantName}</strong>
            <span>{BRAND.role}</span>
          </div>
        </div>

        <div className="post-creative__contact">
          <div className="post-creative__contact-line">{BRAND.contactLine}</div>
          <div className="post-creative__contact-brand">{BRAND.contactHandle}</div>
        </div>
      </div>
    </div>
  );
});

export default PostCreative;
