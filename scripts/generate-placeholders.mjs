// Generates structurally correct placeholder JPGs for every job in the media
// registry: solid clay/stone blocks at the exact orientation, labeled with the
// registry id so the photographer knows which real photo replaces which file.
// Real photography drops in at public/media/<id>.jpg with zero code changes.
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const registrySource = await readFile(
  path.join(ROOT, "src/content/media/registry.ts"),
  "utf8"
);

const jobs = [...registrySource.matchAll(
  /id:\s*"([^"]+)"[\s\S]*?orientation:\s*"([^"]+)"/g
)].map(([, id, orientation]) => ({ id, orientation }));

if (jobs.length !== 24) {
  throw new Error(`Expected 24 media jobs in the registry, found ${jobs.length}`);
}

const dims = {
  "16:9": { w: 1600, h: 900 },
  "4:3": { w: 1200, h: 900 },
  "3:2": { w: 1200, h: 800 },
  "4:5": { w: 1000, h: 1250 },
  "21:9": { w: 2100, h: 900 },
};

// Design-system tones only: warm clay and stone, alternating.
const tones = ["#E8DDD0", "#D8D0C5"];

const outDir = path.join(ROOT, "public/media");
await mkdir(outDir, { recursive: true });

await Promise.all(
  jobs.map(async ({ id, orientation }, i) => {
    const { w, h } = dims[orientation];
    const background = tones[i % tones.length];
    const label = Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
          font-family="Georgia, serif" font-size="${Math.round(h / 18)}"
          fill="#121212" opacity="0.28">${id} · ${orientation}</text>
      </svg>`
    );
    await sharp({ create: { width: w, height: h, channels: 3, background } })
      .composite([{ input: label }])
      .jpeg({ quality: 70 })
      .toFile(path.join(outDir, `${id}.jpg`));
    console.log(`  ${id}.jpg  ${w}x${h}  ${background}`);
  })
);

console.log(`Generated ${jobs.length} placeholders in public/media/`);
