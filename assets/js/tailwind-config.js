// Shared Tailwind (CDN) config. Load AFTER https://cdn.tailwindcss.com
// Every font stack ends with Noto Sans Lao so Lao glyphs render correctly.
if (typeof tailwind !== 'undefined') tailwind.config = {
  "darkMode": "class",
  "theme": {
    "extend": {
      "colors": {
        "on-primary-container": "#fff6f5",
        "on-primary-fixed": "#410002",
        "error": "#ffb4ab",
        "tertiary-fixed-dim": "#90cdff",
        "outline": "#ac8884",
        "on-surface": "#fbdbd7",
        "card-elevated": "#242429",
        "on-primary-fixed-variant": "#93000b",
        "background": "#1f0f0d",
        "secondary-fixed": "#ffddb8",
        "primary-container": "#dc2626",
        "surface-container-highest": "#44302e",
        "amber-dim": "rgba(245, 158, 11, 0.15)",
        "amber-soft": "#D97706",
        "surface-tint": "#ffb4ab",
        "tertiary": "#90cdff",
        "surface": "#1f0f0d",
        "primary-fixed": "#ffdad6",
        "inverse-primary": "#bf0715",
        "on-secondary-fixed": "#2a1700",
        "text-primary": "#F4F4F5",
        "graphite-surface": "#18181B",
        "primary": "#ffb4ab",
        "card-highlight": "#2D2D35",
        "on-tertiary-container": "#f3f8ff",
        "on-secondary-fixed-variant": "#653e00",
        "tertiary-container": "#0078b2",
        "on-tertiary-fixed": "#001e30",
        "text-muted": "#A1A1AA",
        "obsidian-base": "#0F0F11",
        "text-dim": "#71717A",
        "crimson-glow": "#EF4444",
        "surface-dim": "#1f0f0d",
        "status-cancelled": "#EF4444",
        "on-secondary-container": "#5b3800",
        "wine-dark": "#450A0A",
        "on-primary": "#690005",
        "surface-bright": "#493432",
        "burgundy-deep": "#7F1D1D",
        "secondary": "#ffb95f",
        "inverse-on-surface": "#3f2c29",
        "surface-container-low": "#281715",
        "surface-variant": "#44302e",
        "secondary-container": "#ee9800",
        "on-surface-variant": "#e6bdb8",
        "status-preparing": "#38BDF8",
        "inverse-surface": "#fbdbd7",
        "tertiary-fixed": "#cbe6ff",
        "on-tertiary": "#003450",
        "crimson-dim": "rgba(220, 38, 38, 0.18)",
        "primary-fixed-dim": "#ffb4ab",
        "outline-variant": "#5c403c",
        "border-accent": "rgba(220, 38, 38, 0.35)",
        "on-secondary": "#472a00",
        "error-container": "#93000a",
        "status-completed": "#10B981",
        "status-ready": "#34D399",
        "on-background": "#fbdbd7",
        "surface-container-lowest": "#190a08",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "on-error": "#690005",
        "secondary-fixed-dim": "#ffb95f",
        "surface-container-high": "#382523",
        "on-tertiary-fixed-variant": "#004b71",
        "on-error-container": "#ffdad6",
        "status-pending": "#F59E0B",
        "surface-container": "#2d1b19"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "margin": "1rem",
        "space-xs": "0.5rem",
        "space-2xs": "0.25rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "margin-md": "1.5rem",
        "margin-lg": "2.5rem",
        "space-2xl": "3rem",
        "gutter": "1rem",
        "space-sm": "0.75rem",
        "gutter-sm": "0.75rem",
        "space-xl": "2rem",
        "gutter-lg": "1.5rem"
      },
      "fontFamily": {
        "headline-xl": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "label-sm": [
          "Space Grotesk",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "headline-sm": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "body-lg": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "price-display": [
          "Space Grotesk",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "headline-xl-mobile": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "label-md": [
          "Space Grotesk",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "body-md": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "label-lg": [
          "Space Grotesk",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "headline-md": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "body-sm": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ],
        "headline-lg": [
          "Plus Jakarta Sans",
          "Noto Sans Lao",
          "sans-serif"
        ]
      },
      "fontSize": {
        "headline-xl": [
          "40px",
          {
            "lineHeight": "48px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "label-sm": [
          "10px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.06em",
            "fontWeight": "600"
          }
        ],
        "headline-sm": [
          "18px",
          {
            "lineHeight": "26px",
            "fontWeight": "600"
          }
        ],
        "body-lg": [
          "16px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "price-display": [
          "18px",
          {
            "lineHeight": "22px",
            "fontWeight": "700"
          }
        ],
        "headline-xl-mobile": [
          "30px",
          {
            "lineHeight": "36px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "label-md": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.04em",
            "fontWeight": "500"
          }
        ],
        "body-md": [
          "14px",
          {
            "lineHeight": "20px",
            "fontWeight": "400"
          }
        ],
        "label-lg": [
          "14px",
          {
            "lineHeight": "18px",
            "letterSpacing": "0.03em",
            "fontWeight": "600"
          }
        ],
        "headline-md": [
          "22px",
          {
            "lineHeight": "30px",
            "fontWeight": "600"
          }
        ],
        "body-sm": [
          "12px",
          {
            "lineHeight": "18px",
            "fontWeight": "400"
          }
        ],
        "headline-lg": [
          "28px",
          {
            "lineHeight": "36px",
            "letterSpacing": "-0.015em",
            "fontWeight": "600"
          }
        ]
      }
    }
  }
};
