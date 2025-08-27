import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ text, trigger, className }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;

    // 文字分割
    if (!el) return;
    const chars = el.querySelectorAll('.char');

    // trigger を正規化（string / Element / ref の全対応）
    const resolvedTrigger =
      typeof trigger === 'string'
        ? trigger
        : trigger && 'current' in trigger
        ? trigger.current
        : trigger;

    // DOM要素または有効なセレクタでなければ中断
    if (!resolvedTrigger) return;

    const tween = gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: resolvedTrigger,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [trigger]);

  return (
    <div ref={titleRef} className={className}>
      <h2>
        {text.split('').map((char, i) => (
          <span key={i} className="char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default AnimatedTitle;
