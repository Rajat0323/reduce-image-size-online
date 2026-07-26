/**
 * Everything except homepage + a few static pages redirects to /.
 * Site is PDF → image converter only.
 */

const TARGET_PRESET_REDIRECTS = {
  "compress-image-to-10kb": "/",
  "compress-image-to-20kb": "/",
  "compress-image-to-30kb": "/",
  "compress-image-to-40kb": "/",
  "compress-image-to-50kb": "/",
  "compress-image-to-60kb": "/",
  "compress-image-to-80kb": "/",
  "compress-image-to-100kb": "/",
  "compress-image-to-150kb": "/",
  "compress-image-to-200kb": "/",
  "compress-image-to-300kb": "/",
  "compress-image-to-500kb": "/",
  "compress-image-to-1mb": "/",
  "compress-image-to-2mb": "/",
  "compress-image-to-5mb": "/",
  "compress-to-20kb": "/",
  "compress-to-50kb": "/",
  "compress-to-100kb": "/",
  "compress-to-200kb": "/",
};

const FORMAT_REDIRECTS = {
  "jpg-to-webp-converter": "/",
  "png-to-jpg-converter": "/",
  "jpg-to-png-converter": "/",
  "webp-to-jpg-converter": "/",
  "png-to-webp-converter": "/",
  "webp-to-png-converter": "/",
  "heic-to-jpg-converter": "/",
  "heic-to-png-converter": "/",
  "bmp-to-jpg-converter": "/",
  "tiff-to-jpg-converter": "/",
};

const RESIZE_REDIRECTS = {
  "resize-image-to-200x200": "/",
  "resize-image-to-400x400": "/",
  "resize-image-to-800x800": "/",
  "resize-image-to-1080x1080": "/",
  "resize-image-to-1920x1080": "/",
  "resize-image-to-passport-size": "/",
  "resize-image-for-youtube-thumbnail": "/",
};

const HUB_REDIRECTS = {
  "image-compressor": "/",
  "image-resizer": "/",
  "image-converter": "/",
  "bulk-image-compressor": "/",
  "reduce-image-size": "/",
  "crop-image": "/",
  "rotate-flip-image": "/",
  "background-remover": "/",
  "image-upscaler": "/",
  "remove-image-metadata": "/",
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

/** No specialty tool pages remain. */
const KEPT_SPECIALTY_SLUGS = new Set();

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
  const toolRedirects = Object.entries(consolidationMap).map(([source, destination]) => ({
    source: `/${source}`,
    destination,
    permanent: true,
  }));

  return [
    ...toolRedirects,
    { source: "/blog", destination: "/", permanent: true },
    { source: "/blog/:path*", destination: "/", permanent: true },
    { source: "/articles", destination: "/", permanent: true },
    { source: "/articles/:path*", destination: "/", permanent: true },
  ];
}

module.exports = {
  consolidationMap,
  getConsolidationRedirect,
  getNextConfigRedirects,
  KEPT_SPECIALTY_SLUGS,
};
