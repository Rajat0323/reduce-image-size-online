import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/images/converter");
const pdfPath = path.join(__dirname, "fixtures/sample.pdf");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3010";

async function shot(locator, file) {
  await locator.screenshot({
    path: path.join(outDir, file),
    animations: "disabled",
  });
  console.log("wrote", file);
}

async function convertReady(page) {
  await page.setInputFiles('input[type="file"]', pdfPath);
  await page.waitForSelector(".home-studio-workspace");
  await page.waitForFunction(() => {
    const meta = document.querySelector(".home-pdf-meta p");
    return meta && /\d+\s+pages?/i.test(meta.textContent || "");
  });
  await page.waitForTimeout(500);
  await page.locator("button.home-btn-primary").click();
  await page.waitForFunction(() => document.querySelectorAll(".home-pdf-thumb").length > 0, null, {
    timeout: 60000,
  });
  await page.waitForTimeout(800);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector(".home-studio-dropzone");
  await page.waitForSelector("text=Choose PDF");

  await shot(page.locator(".home-studio-shell"), "upload-screen.png");

  await page.setInputFiles('input[type="file"]', pdfPath);
  await page.waitForSelector(".home-studio-workspace");

  // Force a visible progress state for the progress screenshot
  await page.evaluate(() => {
    const btn = document.querySelector("button.home-btn-primary");
    if (btn) {
      btn.setAttribute("disabled", "true");
      btn.textContent = "Converting… 48%";
    }
    const controls = document.querySelector(".home-studio-controls");
    if (controls && !document.querySelector(".home-progress")) {
      const bar = document.createElement("div");
      bar.className = "home-progress";
      bar.setAttribute("aria-hidden", "true");
      bar.innerHTML = '<i style="width:48%;animation:none"></i>';
      const cta = document.querySelector(".home-studio-cta-row");
      controls.insertBefore(bar, cta);
    }
  });
  await shot(page.locator(".home-studio-controls"), "conversion-progress.png");

  // Clean convert path for preview + download
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector(".home-studio-dropzone");
  await convertReady(page);

  await shot(page.locator(".home-studio-preview-card").nth(1), "converted-preview.png");
  await shot(page.locator(".home-studio-workspace"), "download-screen.png");

  await browser.close();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
