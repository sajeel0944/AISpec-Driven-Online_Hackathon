import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', 'hero-banner hero-background')}>
      <div className="container hero-content-wrapper"> {/* New wrapper for content and image */}
        <div className="hero-text-content"> {/* Wrapper for text content */}
          <Heading as="h1" className="hero__title hero-title">
            Physical AI & Humanoid Robotics
          </Heading>
          <p className="hero__subtitle hero-subtitle">An interactive, practical guide to building embodied AI systems — clear explanations, hands-on examples, and real-world case studies.</p>
          <div className="hero-actions">
            <Link className="hero-cta-primary" to="/docs/intro">Start Reading Now</Link>
            <Link className="hero-cta-secondary" to="/blog">Read the Blog</Link>
          </div>
          <div className="hero-features-quick">
            <span className="pill">Hands-on Guides</span>
            <span className="pill">Case Studies</span>
            <span className="pill">Practical Examples</span>
          </div>
        </div>
        <div className="hero-image-container"> {/* Container for the robot image */}
          <img src="/img/robot-placeholder.png" alt="AI Robot" className="hero-robot-image" />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Explore the world of Physical AI and Humanoid Robotics with our interactive book.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
