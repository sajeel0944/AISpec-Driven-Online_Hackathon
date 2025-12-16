import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ScrollFadeIn from '../common/ScrollFadeIn';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  iconColor?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hands-On Projects',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Build real humanoid robots with step-by-step tutorials, from basic 
        mechanics to advanced AI integration.
      </>
    ),
    iconColor: '#667eea',
  },
  {
    title: 'AI-Powered Learning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Master reinforcement learning, computer vision, and NLP specifically 
        tailored for physical AI systems.
      </>
    ),
    iconColor: '#764ba2',
  },
  {
    title: 'Industry Case Studies',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn from real-world implementations in healthcare, manufacturing, 
        and space exploration.
      </>
    ),
    iconColor: '#4facfe',
  },
  {
    title: 'Simulation Tools',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Access to Gazebo, ROS, and custom simulation environments for 
        risk-free testing and development.
      </>
    ),
    iconColor: '#00f2fe',
  },
  {
    title: 'Community Support',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Join our global community of researchers, engineers, and enthusiasts 
        building the future of robotics.
      </>
    ),
    iconColor: '#10b981',
  },
  {
    title: 'Latest Research',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Stay updated with cutting-edge papers, algorithms, and techniques 
        from top robotics labs worldwide.
      </>
    ),
    iconColor: '#f59e0b',
  },
];

function Feature({title, Svg, description, iconColor}: FeatureItem) {
  return (
    <div className={clsx('feature-item-container col col--12 md:col--6 lg:col--4')}>
      <div className="feature-item-card">
        <div className="feature-icon-wrapper">
          <Svg 
            className="feature-item-svg" 
            role="img" 
            style={{ color: iconColor }}
          />
        </div>
        <div className="feature-content">
          <Heading as="h3" className="feature-title">{title}</Heading>
          <p className="feature-description">{description}</p>
        </div>
        <div className="feature-hover-effect"></div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className="homepage-features-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Learn With Us?</h2>
          <p>
            Our comprehensive platform combines theoretical knowledge with 
            practical implementation, giving you everything you need to 
            excel in physical AI and humanoid robotics.
          </p>
        </div>
        <div className="features-grid">
          {FeatureList.map((props, idx) => (
            <ScrollFadeIn key={idx} delay={idx * 100}>
              <Feature {...props} />
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}