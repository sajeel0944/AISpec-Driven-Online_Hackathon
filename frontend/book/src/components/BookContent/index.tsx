import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
}

export default function BookContent({ children }: Props): JSX.Element {
  return <div className={styles.bookContent}>{children}</div>;
}
