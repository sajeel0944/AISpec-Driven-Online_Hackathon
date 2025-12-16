import type {ReactNode} from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className={clsx('hero hero--primary', 'hero-banner hero-background')}>
      {/* Animated Background Elements */}
      <div className="binary-code"></div>
      
      <div className="hero-content-wrapper">
        <div className="hero-text-content">
          <Heading as="h1" className="hero__title hero-title">
            Build The Future of
            <span style={{ display: 'block', fontSize: '0.9em', marginTop: '10px' }}>
              Physical AI & Robotics
            </span>
          </Heading>
          
          <p className="hero__subtitle hero-subtitle">
            Master humanoid robotics with our interactive learning platform.
            From basic mechanics to advanced AI integration — learn by building real systems.
          </p>
          
          <div className="hero-actions">
            <Link className="hero-cta-primary" to="/docs/intro">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              Start Learning Free
            </Link>
            <Link className="hero-cta-secondary" to="/docs/intro">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              View Courses
            </Link>
          </div>
          
          <div className="hero-features-quick">
            <span className="pill">Live Projects</span>
            <span className="pill">Industry Mentors</span>
            <span className="pill">Career Support</span>
            <span className="pill">Certification</span>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="robot-glow"></div>
          <img 
            src="/img/advanced-robot-3d.png" 
            alt="Advanced Humanoid Robot AI" 
            className="hero-robot-image"
            onError={(e) => {
              e.target.src = '/img/robot-placeholder.png';
            }}
          />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
      
      {/* Mouse Trailer Effect */}
      <div 
        className="custom-cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
    </header>
  );
}

// Stats Component
function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Hands-on Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Active Learners</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Community Support</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Practical Focus</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Build the Future?</h2>
        <p>
          Join thousands of engineers, researchers, and enthusiasts 
          who are shaping the future of humanoid robotics. 
          Start your journey today — no prior experience required.
        </p>
        <div className="cta-buttons">
          <Link className="hero-cta-primary" to="/signup">
            Start Free Trial
          </Link>
          <Link className="hero-cta-secondary" to="/blog">
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title} - Master Humanoid Robotics`}
      description="Interactive learning platform for Physical AI and Humanoid Robotics. Build real systems with hands-on projects and expert guidance."
      image="/img/social-preview.png">
      
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <StatsSection />
        <CTASection />
      </main>
    </Layout>
  );
}