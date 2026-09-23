import Image from 'next/image';

/**
 * A photograph laid out like `object-fit: cover` with an explicit focal point,
 * but as a real box. Two frames with the same props line up pixel for pixel,
 * which is what lets a transparent cutout sit exactly over its source photo.
 *
 * `bleed` adds extra height so a parent camera can drift upward without
 * exposing an edge. Focus values are percentages; `mobileFocus` applies
 * below the md breakpoint through CSS, so there is no hydration jump.
 */
export default function StoryFrame({
  src,
  alt = '',
  aspect,
  focus = [50, 50],
  mobileFocus,
  bleed = 48,
  priority = false,
  quality = 85,
  sizes = '(max-width: 767px) 400vw, 125vw',
  className = '',
}) {
  const [fx, fy] = focus;
  const [mx, my] = mobileFocus ?? focus;

  return (
    <div
      className={`story-frame absolute ${className}`}
      style={{
        aspectRatio: aspect,
        width: `max(100%, calc((100svh + ${bleed}px) * ${aspect}))`,
        '--fx': `${fx}%`,
        '--fy': `${fy}%`,
        '--mx': `${mx}%`,
        '--my': `${my}%`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
