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
          <p className="hero__subtitle hero-subtitle">An Interactive Journey into the Future of AI and Robotics</p>
          <div className="hero-actions">
            <Link
              className="button button--lg hero-button"
              to="/docs/intro"> {/* Link to your book's intro or first chapter */}
              Start Reading Now 🚀
            </Link>
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
