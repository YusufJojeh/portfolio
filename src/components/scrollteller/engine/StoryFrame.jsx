import Image from 'next/image';

/**
 * A photograph laid out like `object-fit: cover` with an explicit focal point,
 * but as a real box. Two frames with the same props line up pixel for pixel,
 * which is what lets a transparent cutout sit exactly over its source photo.
 *
 * `bleed` adds extra height so a parent camera can drift upward without
 * exposing an edge. Focus values are percentages; `mobileFocus` applies
 * below the md breakpoint through CSS, so there is no hydration jump.
 * `mobileSrc` (with its own `mobileAspect`) swaps in a phone-sized capture
 * below md; both frames are in the markup and CSS picks one.
 */
export default function StoryFrame({
  src,
  alt = '',
  aspect,
  focus = [50, 50],
  mobileFocus,
  mobileSrc,
  mobileAspect,
  bleed = 48,
  priority = false,
  quality = 85,
  sizes = '(max-width: 767px) 400vw, 125vw',
  className = '',
}) {
  const [fx, fy] = focus;
  const [mx, my] = mobileFocus ?? focus;
  const vars = { '--fx': `${fx}%`, '--fy': `${fy}%`, '--mx': `${mx}%`, '--my': `${my}%` };
  const frame = (source, ratio, extra, frameSizes) => (
    <div
      className={`story-frame absolute ${extra} ${className}`}
      style={{ aspectRatio: ratio, width: `max(100%, calc((100svh + ${bleed}px) * ${ratio}))`, ...vars }}
    >
      <Image src={source} alt={alt} fill priority={priority} quality={quality} sizes={frameSizes} className="object-cover" />
    </div>
  );

  if (!mobileSrc) return frame(src, aspect, '', sizes);
  return (
    <>
      {frame(src, aspect, 'hidden md:block', '125vw')}
      {frame(mobileSrc, mobileAspect ?? aspect, 'md:hidden', '(max-width: 767px) 150vw, 1px')}
    </>
  );
}
