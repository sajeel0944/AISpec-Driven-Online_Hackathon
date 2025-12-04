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
    <header className={clsx('hero hero--primary', 'py-12 lg:py-24 text-center relative overflow-hidden bg-gradient-to-b from-primary-DEFAULT to-primary-dark text-white')}>
      <div className="container">
        <Heading as="h1" className="hero__title text-[2.5rem] lg:text-[3.5rem] font-bold mb-4 animate-fadeInDown">
          Physical AI & Humanoid Robotics
        </Heading>
        <p className="hero__subtitle text-[1.2rem] lg:text-[1.5rem] font-light mb-8 text-primary-light animate-fadeInUp">An Interactive Journey into the Future of AI and Robotics</p>
        <div className="flex items-center justify-center gap-4 animate-zoomIn">
          <Link
            className="button button--lg transition-all duration-300 ease-in hover:-translate-y-0.5 hover:shadow-lg bg-secondary-DEFAULT text-white hover:bg-secondary-dark"
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
