'use client';
import { useEffect, useRef } from 'react';

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Tìm tất cả các phần tử có class 'fade-up' bên trong container này
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.fade-up');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
}