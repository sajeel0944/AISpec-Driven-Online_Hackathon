import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/case-study-humanoid-robot-navigation-in-unstructured-environments',
    component: ComponentCreator('/blog/case-study-humanoid-robot-navigation-in-unstructured-environments', '163'),
    exact: true
  },
  {
    path: '/blog/case-study-warehouse-automation-humanoid-robots',
    component: ComponentCreator('/blog/case-study-warehouse-automation-humanoid-robots', '6d8'),
    exact: true
  },
  {
    path: '/blog/emerging-trends-physical-ai',
    component: ComponentCreator('/blog/emerging-trends-physical-ai', '51c'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '85c'),
    exact: true
  },
  {
    path: '/blog/tags/logistics',
    component: ComponentCreator('/blog/tags/logistics', 'ba6'),
    exact: true
  },
  {
    path: '/blog/tags/mdx',
    component: ComponentCreator('/blog/tags/mdx', '3e2'),
    exact: true
  },
  {
    path: '/blog/tags/navigation',
    component: ComponentCreator('/blog/tags/navigation', '2df'),
    exact: true
  },
  {
    path: '/blog/tags/outdoor-robotics',
    component: ComponentCreator('/blog/tags/outdoor-robotics', '462'),
    exact: true
  },
  {
    path: '/blog/tags/tags/automation',
    component: ComponentCreator('/blog/tags/tags/automation', '235'),
    exact: true
  },
  {
    path: '/blog/tags/tags/case-study',
    component: ComponentCreator('/blog/tags/tags/case-study', '617'),
    exact: true
  },
  {
    path: '/blog/tags/tags/documentation',
    component: ComponentCreator('/blog/tags/tags/documentation', 'd03'),
    exact: true
  },
  {
    path: '/blog/tags/tags/humanoid',
    component: ComponentCreator('/blog/tags/tags/humanoid', 'ef3'),
    exact: true
  },
  {
    path: '/blog/tags/tags/physical-ai',
    component: ComponentCreator('/blog/tags/tags/physical-ai', '9e2'),
    exact: true
  },
  {
    path: '/blog/tags/tags/robotics',
    component: ComponentCreator('/blog/tags/tags/robotics', '1e1'),
    exact: true
  },
  {
    path: '/blog/tags/tags/trends',
    component: ComponentCreator('/blog/tags/tags/trends', 'd5b'),
    exact: true
  },
  {
    path: '/blog/the-role-of-mdx-in-physical-ai-documentation',
    component: ComponentCreator('/blog/the-role-of-mdx-in-physical-ai-documentation', 'e3b'),
    exact: true
  },
  {
    path: '/book/chapter1',
    component: ComponentCreator('/book/chapter1', '37e'),
    exact: true
  },
  {
    path: '/book/chapter2',
    component: ComponentCreator('/book/chapter2', '027'),
    exact: true
  },
  {
    path: '/book/chapter3',
    component: ComponentCreator('/book/chapter3', '984'),
    exact: true
  },
  {
    path: '/book/chapter4',
    component: ComponentCreator('/book/chapter4', '964'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/signin',
    component: ComponentCreator('/signin', 'ba0'),
    exact: true
  },
  {
    path: '/signup',
    component: ComponentCreator('/signup', '312'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '6ec'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '249'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e8f'),
            routes: [
              {
                path: '/docs/category/physical-ai-project-management',
                component: ComponentCreator('/docs/category/physical-ai-project-management', '274'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/physical-ai-tutorials',
                component: ComponentCreator('/docs/category/physical-ai-tutorials', '6e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial-basics/congratulations', '458'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '108'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial-basics/create-a-document', '8fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial-basics/create-a-page', '951'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', '4f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/docs/tutorial-basics/markdown-features', 'b05'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '978'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial-extras/translate-your-site', 'f9a'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
