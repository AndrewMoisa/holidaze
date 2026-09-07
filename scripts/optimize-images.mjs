// Regenerates the derivatives in public/images from the full-size originals in
// assets/images. Run with `npm run images` after replacing an original.
import { mkdir, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'assets/images'
const OUTPUT_DIR = 'public/images'

/** The hero spans the viewport, so cover 1x phones through 2x laptops. */
const HERO_WIDTHS = [960, 1440, 1920, 2560]

/**
 * The hero is a 3.4:1 banner, which collapses to a thin strip on a phone. Narrow
 * screens get the right-hand region instead — the part carrying the wordmark and
 * the offer — at an aspect ratio that still has some height to it.
 */
const HERO_MOBILE_CROP = { left: 2260, top: 0, width: 1580, height: 1118 }
const HERO_MOBILE_WIDTHS = [720, 1080]

async function writeVariants(image, basename, widths) {
  const written = []
  for (const width of widths) {
    const resized = image.clone().resize({ width, withoutEnlargement: true })
    written.push(
      resized
        .clone()
        .jpeg({ quality: 72, mozjpeg: true })
        .toFile(join(OUTPUT_DIR, `${basename}-${width}.jpg`)),
      resized.clone().webp({ quality: 70 }).toFile(join(OUTPUT_DIR, `${basename}-${width}.webp`)),
    )
  }
  await Promise.all(written)
  return widths.flatMap((width) => [`${basename}-${width}.jpg`, `${basename}-${width}.webp`])
}

async function writeHero(source) {
  return [
    ...(await writeVariants(sharp(source), 'hero', HERO_WIDTHS)),
    ...(await writeVariants(
      sharp(source).extract(HERO_MOBILE_CROP),
      'hero-mobile',
      HERO_MOBILE_WIDTHS,
    )),
  ]
}

/** The header renders the logo 24px tall, so 96px covers up to a 4x display. */
async function writeLogo(source) {
  await sharp(source)
    .resize({ height: 96, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(OUTPUT_DIR, 'logo.png'))
  return ['logo.png']
}

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`

await mkdir(OUTPUT_DIR, { recursive: true })

for (const name of await readdir(SOURCE_DIR)) {
  const source = join(SOURCE_DIR, name)
  const outputs = name.startsWith('hero')
    ? await writeHero(source)
    : name.startsWith('logo')
      ? await writeLogo(source)
      : null
  if (!outputs) continue

  const sizes = await Promise.all(outputs.map((file) => stat(join(OUTPUT_DIR, file))))
  console.log(`${name} ${mb((await stat(source)).size)}`)
  outputs.forEach((file, index) => console.log(`  ${file} ${mb(sizes[index].size)}`))
}
