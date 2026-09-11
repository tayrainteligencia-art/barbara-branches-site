import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".screenshots";
const label = process.argv[4] ?? "section";
const reducedMotion = process.argv.includes("--reduced-motion");

fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch();
let hadErrors = false;

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  // Scroll real via wheel (Lenis intercepta wheel/touch, não scrollTo direto)
  // para que os ScrollTriggers disparem de verdade antes do screenshot fullPage.
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrolled = 0;
  while (scrolled < totalHeight) {
    await page.mouse.wheel(0, 600);
    scrolled += 600;
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(400);

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const hasHorizontalScroll = scrollWidth > clientWidth + 1;

  const fileSuffix = reducedMotion ? "-reduced-motion" : "";
  const filePath = `${outDir}/${label}-${vp.name}${fileSuffix}.png`;
  await page.screenshot({ path: filePath, fullPage: true });

  console.log(`[${vp.name}${reducedMotion ? " reduced-motion" : ""}] scrollWidth=${scrollWidth} clientWidth=${clientWidth} horizontalScroll=${hasHorizontalScroll} consoleErrors=${consoleErrors.length}`);
  if (hasHorizontalScroll) hadErrors = true;
  if (consoleErrors.length) {
    hadErrors = true;
    for (const e of consoleErrors) console.log("  ERROR:", e);
  }

  await context.close();
}

await browser.close();
process.exit(hadErrors ? 1 : 0);
