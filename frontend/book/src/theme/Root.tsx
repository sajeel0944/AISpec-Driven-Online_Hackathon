import React, { useState, useEffect, JSX, PropsWithChildren } from 'react';
import { useLocation } from '@docusaurus/router'; // Import useLocation
import Chatbot from '@site/src/components/Chat/Chatbot'; // Import the Chatbot component
import { AuthProvider } from '@site/src/contexts/AuthContext'; // Import AuthProvider

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

  const showChatbot = location.pathname.startsWith('/docs');

  return (
    <AuthProvider>
      <div className="layout-root">
        <div className={`layout-transition-container ${transitionStage === 'fadeIn' ? 'fade-in' : 'fade-out'}`}>
          {displayChildren}
        </div>
        {showChatbot && <Chatbot />}
      </div>
    </AuthProvider>
  );
  }
