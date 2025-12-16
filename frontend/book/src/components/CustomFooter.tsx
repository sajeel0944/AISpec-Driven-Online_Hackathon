// src/components/CustomFooter.jsx
import React, { useState, useEffect } from 'react';
import '../css/footer.css';

const CustomFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  // Generate random particles
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div 
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__particles">
          {renderParticles()}
        </div>
        
        <div className="footer__content">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand-column">
              <a href="/" className="footer__logo">
                <div className="footer__logo-icon">RL</div>
                <div className="footer__logo-text">
                  <span className="footer__logo-title">RoboLearn</span>
                  <span className="footer__logo-subtitle">Physical AI Mastery</span>
                </div>
              </a>
              
              <p className="footer__description">
                Master humanoid robotics with our interactive learning platform. 
                From basic mechanics to advanced AI integration — learn by building real systems.
              </p>
              
              {/* Newsletter */}
              <div className="footer__newsletter">
                <div className="newsletter-title">Stay Updated</div>
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="newsletter-input"
                    required
                  />
                  <button 
                    type="submit" 
                    className="newsletter-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="newsletter-loading"></div>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
                {isSubscribed && (
                  <div className="newsletter-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thanks for subscribing!
                  </div>
                )}
                <p className="newsletter-disclaimer">
                  No spam. Unsubscribe at any time.
                </p>
              </div>
              
              {/* Stats */}
              <div className="footer__stats">
                <div className="stat-badge">
                  <div className="stat-number">1,000+</div>
                  <div className="stat-label">Active Learners</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects</div>
                </div>
              </div>
            </div>

            {/* Docs Column */}
            <div className="footer__links-column">
              <h3 className="footer__column-title">Learning</h3>
              <ul className="footer__links">
                <li className="footer__link-item">
                  <a href="/docs/intro" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Get Started
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/docs/robotics-basics" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Robotics Fundamentals
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/docs/ai-integration" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Integration
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/docs/projects" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Hands-on Projects
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/docs/advanced" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Advanced Topics
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div className="footer__links-column">
              <h3 className="footer__column-title">Community</h3>
              <ul className="footer__links">
                <li className="footer__link-item">
                  <a href="https://discord.gg/robotics" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4448.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1635-.3938-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.0371A19.7363 19.7363 0 003.677 4.3698C.5335 9.0457-.325 13.5799.0996 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923-.146-.0946-.0197-.193.1328-.1446 1.8168.5436 3.7728.5436 5.6028 0 .1516-.0496.278-.0496.1328.1446a14.984 14.984 0 01-1.8722.8923.076.076 0 00-.0416.1057c.36.698.7716 1.3628 1.226 1.9942a.076.076 0 00.0842.0286c1.9516-.6066 3.94-1.5218 5.9929-3.0294a.077.077 0 00.0312-.0561c.5004-5.1778-.8382-9.6739-3.5485-13.688zm-11.0057 10.3694c-1.2403 0-2.2576-1.1448-2.2576-2.5548 0-1.4101 1.013-2.5548 2.2576-2.5548 1.2417 0 2.2576 1.1448 2.2576 2.5548.0013 1.41-1.0124 2.5548-2.2576 2.5548zm6.7685 0c-1.2403 0-2.2576-1.1448-2.2576-2.5548 0-1.4101 1.013-2.5548 2.2576-2.5548 1.2417 0 2.2576 1.1448 2.2576 2.5548 0 1.41-1.0124 2.5548-2.2576 2.5548z"/>
                    </svg>
                    Discord
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="https://stackoverflow.com/questions/tagged/robotics" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                    </svg>
                    Stack Overflow
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="https://github.com/robolrn" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="https://twitter.com/robolearn" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter / X
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="https://www.linkedin.com/company/robolearn" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
              
              <div className="footer__social">
                <div className="footer__social-links">
                  <a href="https://youtube.com/robolearn" className="social-link" aria-label="YouTube">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/robolearn" className="social-link" aria-label="Instagram">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* More Column */}
            <div className="footer__links-column">
              <h3 className="footer__column-title">Company</h3>
              <ul className="footer__links">
                <li className="footer__link-item">
                  <a href="/about" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About Us
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/blog" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Blog
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/careers" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Careers
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/contact" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/privacy" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Privacy Policy
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/terms" className="footer__link">
                    <svg className="footer__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer__bottom">
            <div className="footer__copyright">
              © {new Date().getFullYear()} <a href="/">RoboLearn</a>. All rights reserved. 
              Empowering the next generation of robotics engineers.
            </div>
            
            <div className="footer__legal-links">
              <a href="/privacy" className="legal-link">Privacy Policy</a>
              <a href="/terms" className="legal-link">Terms of Service</a>
              <a href="/cookies" className="legal-link">Cookie Policy</a>
              <a href="/sitemap" className="legal-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
};

export default CustomFooter;