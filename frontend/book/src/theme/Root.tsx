import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router'; // Import useLocation

export default function Root({children}: PropsWithChildren): JSX.Element {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    setTransitionStage('fadeOut');
  }, [location.pathname]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
      }, 300); // Duration of fade-out animation
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, children]);

  return (
    <div className="layout-root">
      <div className={`layout-transition-container ${transitionStage === 'fadeIn' ? 'fade-in' : 'fade-out'}`}>
        {displayChildren}
      </div>
    </div>
  );
}
