import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapHero(refs) {
  const { titleRef, subtitleRef, ctaRef, imageRef } = refs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (imageRef?.current) {
        tl.from(imageRef.current, { opacity: 0, scale: 1.05, duration: 1.5, clearProps: 'all' });
      }
      if (titleRef?.current) {
        tl.from(titleRef.current, { opacity: 0, y: 30, duration: 1 }, imageRef?.current ? '-=1' : 0);
      }
      if (subtitleRef?.current) {
        tl.from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
      }
      if (ctaRef?.current) {
        tl.from(ctaRef.current, { opacity: 0, y: 15, duration: 0.6 }, '-=0.5');
      }
    });
    return () => {
      ctx.revert();
    };
  }, [titleRef, subtitleRef, ctaRef, imageRef]);
}

export function useGsapReveal(containerRef, selector = '.gsap-reveal') {
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    const ctx = gsap.context(() => {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef, selector]);
}

export function useGsapStaggerList(listRef) {
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.children;
    const ctx = gsap.context(() => {
      gsap.from(items, {
        scrollTrigger: { 
          trigger: listRef.current, 
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, listRef);
    return () => {
      ctx.revert();
    };
  }, [listRef]);
}
