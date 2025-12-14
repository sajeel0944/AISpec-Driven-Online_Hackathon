import React, { JSX, type ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function BookContent({ children }: Props): JSX.Element {
  return <div className="book-content">{children}</div>;
}

interface LanguageTextProps {
  en?: ReactNode;
  ur?: ReactNode;
  children?: ReactNode; // fallback (assumed English)
}

export function LanguageText({ en, ur, children }: LanguageTextProps): JSX.Element | null {
  const [lang, setLang] = useState<string>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bookLang');
      if (stored) setLang(stored);
    } catch (e) {
      setLang('en');
    }

    const handler = (e: Event) => {
      console.debug('[LanguageText] received event', e);
      try {
        // event detail may contain lang
        // @ts-ignore
        const newLang = e && (e as any).detail && (e as any).detail.lang ? (e as any).detail.lang : localStorage.getItem('bookLang') || 'en';
        setLang(newLang);
      } catch (err) {
        setLang('en');
      }
    };

    window.addEventListener('bookLanguageChanged', handler as EventListener);
    return () => window.removeEventListener('bookLanguageChanged', handler as EventListener);
  }, []);

  if (lang === 'ur') {
    return <>{ur ?? children ?? null}</>;
  }

  return <>{en ?? children ?? null}</>;
}
