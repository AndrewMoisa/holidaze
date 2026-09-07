// Regenerates the derivatives in public/images from the full-size originals in
// assets/images. Run with `npm run images` after replacing an original.
import { mkdir, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'assets/images'
const OUTPUT_DIR = 'public/images'

/** Hero widths cover 1x phones up to 2x laptops; the frame is never taller than 288px. */
const HERO_WIDTHS = [960, 1440, 1920]

async function writeHero(source) {
  const written = []
  for (const width of HERO_WIDTHS) {
    const resized = sharp(source).resize({ width, withoutEnlargement: true })
    written.push(
      resized
        .clone()
        .jpeg({ quality: 72, mozjpeg: true })
        .toFile(join(OUTPUT_DIR, `hero-${width}.jpg`)),
      resized
        .clone()
        .webp({ quality: 70 })
        .toFile(join(OUTPUT_DIR, `hero-${width}.webp`)),
    )
  }
  await Promise.all(written)
  return HERO_WIDTHS.flatMap((width) => [`hero-${width}.jpg`, `hero-${width}.webp`])
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
