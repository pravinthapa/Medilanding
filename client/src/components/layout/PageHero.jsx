import { useRef } from 'react';
import { useGsapHero } from '../../hooks/useGsapAnimations';

export default function PageHero({ title, subtitle, image, children }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useGsapHero({ titleRef, subtitleRef, ctaRef, imageRef });

  return (
    <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col lg:min-h-[75vh] lg:flex-row lg:items-center">
        {/* Image Section (Appears first on mobile) */}
        <div 
          ref={imageRef} 
          className="relative w-full h-[40vh] lg:h-auto lg:w-1/2 lg:min-h-[75vh] order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 lg:bg-gradient-to-l lg:from-transparent lg:via-slate-900/40 lg:to-slate-900 dark:to-slate-950 dark:via-slate-950/60 z-10" />
          <img 
            src={image} 
            alt="Hero section" 
            className="absolute inset-0 h-full w-full object-cover" 
          />
        </div>

        {/* Text Section */}
        <div className="relative z-20 flex w-full flex-col justify-center px-4 py-16 sm:px-8 lg:w-1/2 lg:py-24 order-2 lg:order-1">
          <h1
            ref={titleRef}
            className="max-w-2xl text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]"
          >
            {title}
          </h1>
          {subtitle && (
            <p ref={subtitleRef} className="mt-6 max-w-xl text-lg text-slate-300 md:text-xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && (
            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
