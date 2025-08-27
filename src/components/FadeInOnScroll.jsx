// src/components/FadeInOnScroll.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeInOnScroll({
  children,
  className = '',
  from = { y: 24, autoAlpha: 0 },
  to = { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
  start = 'top 80%',
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;

    const target = wrapper.firstElementChild || wrapper;

    const tween = gsap.fromTo(target, from, {
      ...to,
      scrollTrigger: {
        trigger: target,
        start,
        toggleActions: 'play none none none',
        once,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [from, to, start, once]);

  return (
    <div
      ref={ref}
      className={`fade-in-on-scroll ${className}`}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  );
}
