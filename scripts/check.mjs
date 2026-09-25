import { chromium } from "playwright";

// Uso: node scripts/check.mjs --url=http://localhost:3000 --width=1440 --theme=dark [--selector="#hero"] [--shot=hero-dark-1440] [--reduced-motion]
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const stripped = arg.replace(/^--/, "");
    const eqIndex = stripped.indexOf("=");
    if (eqIndex === -1) return [stripped, true];
    return [stripped.slice(0, eqIndex), stripped.slice(eqIndex + 1)];
  }),
);

const url = args.url ?? "http://localhost:3000";
const width = Number(args.width ?? 1440);
const theme = args.theme === "dark" ? "dark" : "light";
const selector = args.selector ?? null;
const shot = args.shot ?? null;
const reducedMotion = Boolean(args["reduced-motion"]);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height: 900 },
  colorScheme: theme,
  reducedMotion: reducedMotion ? "reduce" : "no-preference",
});
const page = await context.newPage();

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
// preloader (~1.5s) + reveal do headline (~1s) precisam assentar antes do check
await page.waitForTimeout(2800);

const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
const horizontalOverflow = scrollWidth > clientWidth + 1;

const brokenImages = await page.evaluate(() =>
  Array.from(document.images)
    .filter((img) => img.complete && img.naturalWidth === 0)
    .map((img) => img.src),
);

console.log(`url=${url} width=${width} theme=${theme} selector=${selector ?? "-"}`);
console.log(`consoleErrors: ${consoleErrors.length}`);
consoleErrors.forEach((e) => console.log(`  - ${e}`));
console.log(`horizontalOverflow: ${horizontalOverflow} (scrollWidth=${scrollWidth} clientWidth=${clientWidth})`);
console.log(`brokenImages: ${brokenImages.length}`);
brokenImages.forEach((src) => console.log(`  - ${src}`));

if (shot) {
  const target = selector ? page.locator(selector).first() : page;
  const path = `.screenshots/${shot}.png`;
  if (selector) {
    await target.scrollIntoViewIfNeeded();
    // espera as animações de entrada por scroll (GSAP/Framer) terminarem
    await page.waitForTimeout(1500);
  }
  await target.screenshot({ path });
  console.log(`screenshot: ${path}`);
}

await browser.close();
process.exit(consoleErrors.length || horizontalOverflow || brokenImages.length ? 1 : 0);
