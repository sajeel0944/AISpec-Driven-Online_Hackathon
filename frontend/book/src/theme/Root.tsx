import React from 'react';
import type {PropsWithChildren} from '@docusaurus/types';

export default function Root({children}: PropsWithChildren): JSX.Element {
  return <div className="font-sans antialiased">{children}</div>;
}