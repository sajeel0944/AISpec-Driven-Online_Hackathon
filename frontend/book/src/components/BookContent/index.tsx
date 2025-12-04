import React, { JSX, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function BookContent({ children }: Props): JSX.Element {
  return <div className="leading-relaxed prose">{children}</div>;
}
