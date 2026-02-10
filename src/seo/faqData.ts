export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I reduce image size online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reduce image size online by uploading your image, selecting compression quality, and downloading the optimized file instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compress multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can upload multiple images and compress them together. If multiple images are selected, they will be downloaded as a ZIP file.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool reduce image size without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the tool reduces image size while maintaining visible quality by optimizing compression settings.",
      },
    },
    {
      "@type": "Question",
      name: "Is this image compressor secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All image compression happens in your browser. Your images are never uploaded to any server.",
      },
    },
  ],
};
