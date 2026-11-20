import { homeOgImage, ogSize } from '@/lib/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.identity.join(', ')}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return homeOgImage();
}
