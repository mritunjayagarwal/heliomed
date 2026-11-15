// Single source for site imagery. To swap in a real asset, drop the file into
// this folder and update the matching import (e.g. hero-bg.svg -> hero-bg.webp).
import aboutImage from './about-image.webp'
import heroBg from './hero-bg.webp'
import logo from './logo.png'
import rangeImage from './range-image.webp'

// Product images are keyed by product id: products/<product-id>.webp
const productImages = Object.fromEntries(
  Object.entries(import.meta.glob<string>('./products/*.webp', { eager: true, import: 'default' })).map(
    ([path, url]) => [path.slice('./products/'.length, -'.webp'.length), url],
  ),
)

export const images = {
  ...productImages,
  logo,
  heroBg,
  aboutImage,
  rangeImage,
}
