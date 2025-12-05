import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

type ScrollFadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children, delay = 0, duration = 600, className }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // isIntersecting is true when element and viewport intersect
      // isIntersecting is false when element leaves viewport
      if (entries[0].isIntersecting) {
        setVisible(true);
        // We only want to observe once, so disconnect after first intersection
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      }
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  const transitionStyle = {
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  return (
    <div
      className={clsx('scroll-fade-in', className)}
      style={transitionStyle}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default ScrollFadeIn;
