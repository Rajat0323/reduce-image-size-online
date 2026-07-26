/**
 * Programmatic / near-duplicate tool URLs → single homepage authority.
 * Used by next.config.js and the dynamic [slug] route.
 */

const TARGET_PRESET_REDIRECTS = {
  "compress-image-to-10kb": "/?target=10",
  "compress-image-to-20kb": "/?target=20",
  "compress-image-to-30kb": "/?target=30",
  "compress-image-to-40kb": "/?target=40",
  "compress-image-to-50kb": "/?target=50",
  "compress-image-to-60kb": "/?target=60",
  "compress-image-to-80kb": "/?target=80",
  "compress-image-to-100kb": "/?target=100",
  "compress-image-to-150kb": "/?target=150",
  "compress-image-to-200kb": "/?target=200",
  "compress-image-to-300kb": "/?target=300",
  "compress-image-to-500kb": "/?target=500",
  "compress-image-to-1mb": "/?target=1024",
  "compress-image-to-2mb": "/?target=2048",
  "compress-image-to-5mb": "/?target=5120",
  "compress-to-20kb": "/?target=20",
  "compress-to-50kb": "/?target=50",
  "compress-to-100kb": "/?target=100",
  "compress-to-200kb": "/?target=200",
};

const FORMAT_REDIRECTS = {
  "jpg-to-webp-converter": "/?format=webp",
  "png-to-jpg-converter": "/?format=jpeg",
  "jpg-to-png-converter": "/?format=png",
  "webp-to-jpg-converter": "/?format=jpeg",
  "png-to-webp-converter": "/?format=webp",
  "webp-to-png-converter": "/?format=png",
  "heic-to-jpg-converter": "/?format=jpeg",
  "heic-to-png-converter": "/?format=png",
  "bmp-to-jpg-converter": "/?format=jpeg",
  "tiff-to-jpg-converter": "/?format=jpeg",
};

const RESIZE_REDIRECTS = {
  "resize-image-to-200x200": "/?width=200&height=200",
  "resize-image-to-400x400": "/?width=400&height=400",
  "resize-image-to-800x800": "/?width=800&height=800",
  "resize-image-to-1080x1080": "/?width=1080&height=1080",
  "resize-image-to-1920x1080": "/?width=1920&height=1080",
  "resize-image-to-passport-size": "/?width=413&height=531",
  "resize-image-for-youtube-thumbnail": "/?width=1280&height=720",
};

const HUB_REDIRECTS = {
  "image-compressor": "/",
  "image-resizer": "/",
  "image-converter": "/",
  "bulk-image-compressor": "/",
  "reduce-image-size": "/",
};

const INTENT_TO_HOME = [
  "passport-photo-size-maker",
  "compress-signature-for-form",
  "compress-image-for-ssc-form",
  "compress-image-for-upsc-form",
  "compress-image-for-job-application",
  "compress-image-for-email",
  "compress-image-for-website-upload",
  "compress-image-for-instagram",
  "compress-image-for-facebook",
  "compress-image-for-linkedin",
  "compress-image-for-twitter",
  "compress-image-for-whatsapp",
  "compress-image-for-discord",
  "compress-image-for-shopify",
  "compress-image-for-wordpress",
  "compress-image-for-amazon",
  "compress-image-for-ebay",
  "compress-image-for-website",
];

/** Specialty tools that remain as their own pages (not size/intent clones). */
const KEPT_SPECIALTY_SLUGS = new Set([
  "crop-image",
  "rotate-flip-image",
  "background-remover",
  "image-upscaler",
  "remove-image-metadata",
]);

function buildConsolidationMap() {
  /** @type {Record<string, string>} */
  const map = {
    ...TARGET_PRESET_REDIRECTS,
    ...FORMAT_REDIRECTS,
    ...RESIZE_REDIRECTS,
    ...HUB_REDIRECTS,
  };

  for (const slug of INTENT_TO_HOME) {
    map[slug] = "/";
  }

  return map;
}

const consolidationMap = buildConsolidationMap();

function getConsolidationRedirect(slug) {
  return consolidationMap[slug] || null;
}

function getNextConfigRedirects() {
  return Object.entries(consolidationMap).map(([source, destination]) => ({
    source: `/${source}`,
    destination,
    permanent: true,
  }));
}

module.exports = {
  consolidationMap,
  getConsolidationRedirect,
  getNextConfigRedirects,
  KEPT_SPECIALTY_SLUGS,
};
