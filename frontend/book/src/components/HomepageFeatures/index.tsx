import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ScrollFadeIn from '../common/ScrollFadeIn'; // Import the new component

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('feature-item-container col col--12 md:col--6 lg:col--4 group')}>
      <div className="feature-item-card text--center">
        <Svg className="feature-item-svg" role="img" />
        <div className="padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className="homepage-features-section">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <ScrollFadeIn key={idx} delay={idx * 150}> {/* Wrap with ScrollFadeIn */}
              <Feature {...props} />
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
