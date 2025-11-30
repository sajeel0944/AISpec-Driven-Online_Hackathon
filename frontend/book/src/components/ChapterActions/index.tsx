import React, { useState } from 'react';
import styles from './styles.module.css';
import TranslationButton from './TranslationButton';
import PersonalizationButton from './PersonalizationButton'; // Import the new component

export default function ChapterActions(): JSX.Element {
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);

  const handleTranslationComplete = (content: string) => {
    setTranslatedContent(content);
    setPersonalizedContent(null); // Clear personalized content if a new translation occurs
  };

  const handlePersonalizationComplete = (content: string) => {
    setPersonalizedContent(content);
    setTranslatedContent(null); // Clear translated content if new personalization occurs
  };

  // Dummy props for now, in a real app these would come from the chapter context
  const dummyChapterId = "chapter1";
  const dummyContent = "This is some dummy content to translate."; // This might become personalized content later

  return (
    <div className={styles.chapterActions}>
      <TranslationButton
        chapterId={dummyChapterId}
        contentToTranslate={dummyContent} // Or personalizedContent if available
        onTranslationComplete={handleTranslationComplete}
      />
      <PersonalizationButton
        chapterId={dummyChapterId}
        onPersonalizationComplete={handlePersonalizationComplete}
      />
      {(translatedContent || personalizedContent) && (
        <div className={styles.processedContent}>
          <h3>{translatedContent ? "Translated Content:" : "Personalized Content:"}</h3>
          <p>{translatedContent || personalizedContent}</p>
        </div>
      )}
    </div>
  );
}