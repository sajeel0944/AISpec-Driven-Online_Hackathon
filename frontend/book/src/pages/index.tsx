import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Chatbot from '@site/src/components/Chat/Chatbot'; // Import the Chatbot component

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', 'hero-banner hero-background')}>
      <div className="container">
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
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Explore the world of Physical AI and Humanoid Robotics with our interactive book and AI chatbot.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <Chatbot /> 
    </Layout>
  );
}
