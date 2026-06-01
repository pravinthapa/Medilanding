import { useRef } from 'react';
import { useGsapHero } from '../../hooks/useGsapAnimations';

export default function PageHero({ title, subtitle, image, children, overlay = true }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useGsapHero({ titleRef, subtitleRef, ctaRef, imageRef });

  return (
    <section className="relative min-h-[70vh] overflow-hidden lg:min-h-[78vh]">
      <div ref={imageRef} className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-slate-900/40 dark:from-slate-950/98 dark:via-slate-950/85" />
        )}
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 lg:min-h-[78vh] lg:px-8">
        <h1
          ref={titleRef}
          className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="mt-5 max-w-2xl text-lg text-slate-200 md:text-xl">
            {subtitle}
          </p>
        )}
        {children && (
          <div ref={ctaRef} className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
