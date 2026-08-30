import { useState } from "react";
import {
  Copy,
  Check,
  Instagram,
  MessageCircle,
  Hash,
  Video,
} from "lucide-react";

function buildMarketingContent(fields) {
  const { title, location, price, highlights } = fields;

  const cleanHighlights = highlights
    .split(/[·,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const highlightText =
    cleanHighlights.length > 0
      ? cleanHighlights.join(" • ")
      : "Premium features";

  const hashtags = [
    "#PropertyForSale",
    "#RealEstate",
    "#RealEstateIndia",
    `#${location.replace(/[^a-zA-Z0-9]/g, "")}`,
    `#${title
      .split(" ")
      .slice(0, 3)
      .join("")
      .replace(/[^a-zA-Z0-9]/g, "")}`,
  ].join(" ");

  const instagram = `🏡 ${title}

📍 ${location}
💰 ${price}

✨ ${highlightText}

Looking for your next dream property? This could be the perfect opportunity for you.

📞 Schedule a private viewing today.

${hashtags}`;

  const whatsapp = `🏡 PROPERTY FOR SALE

${title}

📍 Location: ${location}
💰 Price: ${price}

✨ Highlights:
${cleanHighlights.map((item) => `• ${item}`).join("\n")}

Interested in this property?
📞 Contact us to schedule a private viewing.

— NESTORA Property Consultants`;

  const description = `${title} in ${location}, available at ${price}. This property offers ${highlightText.toLowerCase()}. A great opportunity for buyers looking for a quality property in a desirable location.`;

  const reelScript = `🎬 15-SECOND PROPERTY REEL

Scene 1 — 0-3 sec
🏡 Show the property
Text: "${title}"

Scene 2 — 3-7 sec
📍 Show the location
Text: "${location}"

Scene 3 — 7-11 sec
✨ Highlight key features
Text: "${highlightText}"

Scene 4 — 11-15 sec
💰 Show the price
Text: "${price}"

Final CTA:
📞 Schedule your private viewing today.`;

  return {
    instagram,
    whatsapp,
    description,
    hashtags,
    reelScript,
  };
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="marketing-copy-btn"
      onClick={handleCopy}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label}
    </button>
  );
}

export default function SmartListingPack({ fields }) {
  const [generated, setGenerated] = useState(null);

  const hasFields =
    fields?.title?.trim() &&
    fields?.location?.trim() &&
    fields?.price?.trim() &&
    fields?.highlights?.trim();

  function handleGenerate() {
    if (!hasFields) return;

    setGenerated(buildMarketingContent(fields));
  }

  async function handleCopyAll() {
    if (!generated) return;

    const allContent = `INSTAGRAM CAPTION

${generated.instagram}

--------------------

WHATSAPP LISTING

${generated.whatsapp}

--------------------

PROPERTY DESCRIPTION

${generated.description}

--------------------

HASHTAGS

${generated.hashtags}

--------------------

15-SECOND REEL SCRIPT

${generated.reelScript}`;

    try {
      await navigator.clipboard.writeText(allContent);
    } catch {
      // Clipboard may be unavailable.
    }
  }

  return (
    <section className="marketing-pack">

      {/* Generate button */}
      <div className="marketing-pack__top">
        <div>
          <h3>Marketing Content</h3>
          <p>
            Ready-to-share content for Instagram, WhatsApp and video.
          </p>
        </div>

        <button
          type="button"
          className="marketing-generate-btn"
          onClick={handleGenerate}
          disabled={!hasFields}
        >
          ✨ Generate Marketing Pack
        </button>
      </div>

      {/* Before generation */}
      {!generated ? (
        <div className="marketing-empty">
          <p>
            Fill in all four property fields, then generate your complete
            marketing pack with one click.
          </p>
        </div>
      ) : (
        <div className="marketing-results">

          {/* Instagram */}
          <div className="marketing-card">
            <div className="marketing-card__top">
              <div>
                <Instagram size={18} />
                <h3>Instagram Caption</h3>
              </div>

              <CopyButton text={generated.instagram} />
            </div>

            <pre>{generated.instagram}</pre>
          </div>

          {/* WhatsApp */}
          <div className="marketing-card">
            <div className="marketing-card__top">
              <div>
                <MessageCircle size={18} />
                <h3>WhatsApp Listing</h3>
              </div>

              <CopyButton text={generated.whatsapp} />
            </div>

            <pre>{generated.whatsapp}</pre>
          </div>

          {/* Hashtags */}
          <div className="marketing-card">
            <div className="marketing-card__top">
              <div>
                <Hash size={18} />
                <h3>Hashtags</h3>
              </div>

              <CopyButton text={generated.hashtags} />
            </div>

            <pre>{generated.hashtags}</pre>
          </div>

          {/* Reel Script */}
          <div className="marketing-card">
            <div className="marketing-card__top">
              <div>
                <Video size={18} />
                <h3>15-Second Reel Script</h3>
              </div>

              <CopyButton text={generated.reelScript} />
            </div>

            <pre>{generated.reelScript}</pre>
          </div>

          {/* Property Description */}
          <div className="marketing-card marketing-card--description">
            <div className="marketing-card__top">
              <div>
                <h3>Property Description</h3>
              </div>

              <CopyButton text={generated.description} />
            </div>

            <p>{generated.description}</p>
          </div>

          {/* Copy entire pack */}
          <button
            type="button"
            className="marketing-copy-all"
            onClick={handleCopyAll}
          >
            <Copy size={16} />
            Copy Entire Marketing Pack
          </button>

        </div>
      )}
    </section>
  );
}