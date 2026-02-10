export const metadata = {
  title: "Reduce Image Size Online Free | Compress Images Instantly",
  description:
    "Reduce image size online for free. Compress JPG, PNG, and WEBP images directly in your browser. No upload required. Fast, secure and unlimited.",
};

export default function Home() {
  return (
    <div style={{ background: "#f5f7fb" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Reduce Image Size Online
        </h1>

        <p style={{ fontSize: 18, color: "#555", marginBottom: 40 }}>
          Compress JPG, PNG and WEBP images directly in your browser.
          No upload required. 100% secure and free.
        </p>

        <a
          href="/reduce-image-size"
          style={{
            background: "#1a73e8",
            color: "white",
            padding: "16px 40px",
            borderRadius: 12,
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Start Compressing
        </a>
      </section>

      {/* TRUST SECTION */}
      <section
        style={{
          background: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 40 }}>
          Why Choose Our Image Compressor?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 40,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <div>
            <h3>⚡ Fast Processing</h3>
            <p>Images are compressed instantly inside your browser.</p>
          </div>

          <div>
            <h3>🔒 100% Secure</h3>
            <p>No image is uploaded to any server. Everything stays on your device.</p>
          </div>

          <div>
            <h3>📦 Bulk Compression</h3>
            <p>Upload single or multiple images and download them instantly.</p>
          </div>

          <div>
            <h3>🎯 Format Support</h3>
            <p>Supports JPG, PNG, and WEBP conversion with resize options.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "80px 20px",
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 50 }}>How It Works</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 40,
          }}
        >
          <div>
            <h3>1️⃣ Upload Images</h3>
            <p>Select single or multiple images from your device.</p>
          </div>

          <div>
            <h3>2️⃣ Adjust Settings</h3>
            <p>Choose quality, resize dimensions and output format.</p>
          </div>

          <div>
            <h3>3️⃣ Download</h3>
            <p>Download compressed images individually or as ZIP.</p>
          </div>
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
     <section style={{ maxWidth: 900, margin: "60px auto", lineHeight: 1.8 }}>
  <h2 style={{ fontSize: 32, marginBottom: 20 }}>
    How to Reduce Image Size Online – Fast & Secure
  </h2>

  <p style={{ color: "#475569", fontSize: 18 }}>
    Our tool allows you to <strong>reduce image size online</strong> directly in your browser 
    without uploading files to any server. You can compress single or multiple images at once 
    and instantly download optimized files. This helps improve website speed, SEO ranking, 
    and overall performance.
  </p>

  <p style={{ color: "#475569", fontSize: 18, marginTop: 20 }}>
    Whether you need to reduce image size in KB or MB for websites, blogs, e-commerce, 
    or social media, our free image compressor ensures high-quality results while 
    minimizing file size.
  </p>

  <h3 style={{ marginTop: 40, fontSize: 24 }}>
    ✨ Key Features
  </h3>

  <ul style={{ marginTop: 20, color: "#334155", fontSize: 17 }}>
    <li>✔ Reduce image size online instantly</li>
    <li>✔ Upload single or multiple images</li>
    <li>✔ Batch compression with ZIP download</li>
    <li>✔ Resize width and height</li>
    <li>✔ Maintain aspect ratio</li>
    <li>✔ Convert formats (JPG, PNG, WEBP)</li>
    <li>✔ Adjustable compression quality</li>
    <li>✔ 100% browser-based – no server upload</li>
    <li>✔ Free and unlimited usage</li>
  </ul>

  <h3 style={{ marginTop: 40, fontSize: 24 }}>
    🚀 How It Works
  </h3>

  <ol style={{ marginTop: 20, color: "#334155", fontSize: 17 }}>
    <li>1️⃣ Click on the upload box and select single or multiple images.</li>
    <li>2️⃣ Adjust quality, resize dimensions, or choose output format.</li>
    <li>3️⃣ Click "Compress Images".</li>
    <li>4️⃣ Download your optimized image or ZIP file instantly.</li>
  </ol>
</section>


      {/* CTA SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 30 }}>
          Ready to Reduce Your Image Size?
        </h2>

        <a
          href="/reduce-image-size"
          style={{
            background: "#1a73e8",
            color: "white",
            padding: "16px 40px",
            borderRadius: 12,
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Open Image Compressor
        </a>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#1a73e8",
          color: "white",
          textAlign: "center",
          padding: "30px 20px",
        }}
      >
        © {new Date().getFullYear()} ReduceImageSize. All rights reserved.
      </footer>
    </div>
  );
}
