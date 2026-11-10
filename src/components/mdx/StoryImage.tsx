import { Figure, useChapter } from './Figure';
import { scenes as scenes1 } from '../characters/Scenes';
import { scenes2 } from '../characters/Scenes2';

const scenes = { ...scenes1, ...scenes2 };
import images from '@/generated/images.json';

/**
 * গল্পের ছবি। /public/images/chapters/<slug>/<name>.webp থাকলে সেটা, নইলে বিল্ট-ইন SVG দৃশ্য।
 * (থাকা ফাইলের তালিকা `npm run gen:search` চালালে src/generated/images.json-এ উঠে আসে।)
 */
export function StoryImage({
  name,
  n,
  caption,
  alt,
}: {
  name: string;
  n: number;
  caption: string;
  alt?: string;
}) {
  const { slug } = useChapter();
  const file = `${slug}/${name}.webp`;
  const scene = scenes[name];
  const hasFile = (images.chapters as string[]).includes(file);
  const altText = alt ?? scene?.alt ?? caption;

  return (
    <Figure n={n} caption={caption} alt={altText}>
      {hasFile ? (
        <img
          src={`/images/chapters/${file}`}
          alt=""
          loading="lazy"
          decoding="async"
          width={1200}
          height={675}
          className="h-auto w-full rounded-xl"
        />
      ) : scene ? (
        <scene.Component />
      ) : (
        <p className="p-6 text-center text-ink-soft">ছবি পাওয়া যায়নি: {name}</p>
      )}
    </Figure>
  );
}
