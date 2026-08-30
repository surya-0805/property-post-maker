// Elegant built-in real-estate visual, drawn entirely as inline SVG so the
// post never depends on an external image file (and exports reliably).
export default function DefaultHero() {
  return (
    <svg
      className="default-hero"
      viewBox="0 0 1008 560"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4c44" />
          <stop offset="100%" stopColor="#142723" />
        </linearGradient>
        <linearGradient id="brassFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c79a5e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c79a5e" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect width="1008" height="560" fill="url(#skyFill)" />

      {/* faint horizon glow */}
      <ellipse cx="504" cy="430" rx="620" ry="180" fill="#a67c46" opacity="0.10" />

      {/* ground line */}
      <line x1="0" y1="430" x2="1008" y2="430" stroke="#c79a5e" strokeOpacity="0.35" strokeWidth="1" />

      {/* distant skyline, thin line art */}
      <g stroke="#c79a5e" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
        <path d="M40 430 L40 360 L90 360 L90 430" />
        <path d="M110 430 L110 380 L150 380 L150 430" />
        <path d="M860 430 L860 350 L905 350 L905 430" />
        <path d="M920 430 L920 390 L960 390 L960 430" />
      </g>

      {/* hero villa silhouette — the featured property */}
      <g transform="translate(324,190)">
        {/* main structure */}
        <path
          d="M0 240 L0 120 L180 40 L360 120 L360 240 Z"
          fill="none"
          stroke="#dcc9a3"
          strokeWidth="2.5"
        />
        {/* roofline accent */}
        <path d="M-16 128 L180 40 L376 128" fill="none" stroke="#c79a5e" strokeWidth="3" />
        {/* second wing */}
        <path d="M230 240 L230 150 L360 150" fill="none" stroke="#dcc9a3" strokeWidth="2" />
        {/* columns */}
        <line x1="70" y1="240" x2="70" y2="150" stroke="#dcc9a3" strokeWidth="2" />
        <line x1="130" y1="240" x2="130" y2="150" stroke="#dcc9a3" strokeWidth="2" />
        {/* door */}
        <rect x="160" y="180" width="40" height="60" fill="none" stroke="#c79a5e" strokeWidth="2" />
        {/* windows */}
        <rect x="40" y="165" width="22" height="26" fill="none" stroke="#a67c46" strokeWidth="1.5" />
        <rect x="298" y="175" width="22" height="26" fill="none" stroke="#a67c46" strokeWidth="1.5" />
        {/* plot / corner marks referencing "corner plot" listings */}
        <path d="M-40 240 L-40 260 L-20 260" fill="none" stroke="#c79a5e" strokeWidth="1.5" />
        <path d="M400 240 L400 260 L380 260" fill="none" stroke="#c79a5e" strokeWidth="1.5" />
      </g>

      {/* subtle rays */}
      <g stroke="url(#brassFade)" strokeWidth="1">
        <line x1="504" y1="60" x2="504" y2="10" />
        <line x1="560" y1="70" x2="600" y2="30" />
        <line x1="448" y1="70" x2="408" y2="30" />
      </g>
    </svg>
  );
}
