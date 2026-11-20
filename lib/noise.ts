/**
 * Small, dependency-free 3D value noise with fractal octaves.
 * Used to generate the hero's topographic height field (x, y, time).
 */

function hash(x: number, y: number, z: number) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return (h & 0xffff) / 0xffff;
}

const fade = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function valueNoise3(x: number, y: number, z: number) {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  const xf = x - xi,
    yf = y - yi,
    zf = z - zi;
  const u = fade(xf),
    v = fade(yf),
    w = fade(zf);

  const c000 = hash(xi, yi, zi),
    c100 = hash(xi + 1, yi, zi),
    c010 = hash(xi, yi + 1, zi),
    c110 = hash(xi + 1, yi + 1, zi),
    c001 = hash(xi, yi, zi + 1),
    c101 = hash(xi + 1, yi, zi + 1),
    c011 = hash(xi, yi + 1, zi + 1),
    c111 = hash(xi + 1, yi + 1, zi + 1);

  return lerp(
    lerp(lerp(c000, c100, u), lerp(c010, c110, u), v),
    lerp(lerp(c001, c101, u), lerp(c011, c111, u), v),
    w,
  );
}

export function fbm(x: number, y: number, z: number, octaves = 3) {
  let amp = 0.5,
    freq = 1,
    sum = 0,
    norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise3(x * freq, y * freq, z * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}
