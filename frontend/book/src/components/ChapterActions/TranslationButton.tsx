import React, { useState } from 'react';
import { ChapterTranslationRequest, ChapterTranslationResponse } from '../../types/chapter';

interface TranslationButtonProps {
  chapterId: string;
  contentToTranslate: string;
  onTranslationComplete: (translatedContent: string) => void;
}

export default function TranslationButton({
  chapterId,
  contentToTranslate,
  onTranslationComplete,
}: TranslationButtonProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError(null);

    const requestBody: ChapterTranslationRequest = {
      chapterId: chapterId,
      targetLanguage: 'ur', // Assuming Urdu for now
      content: contentToTranslate,
    };

    try {
      // Mocking user ID for now
      const mockUserId = 'user123'; 

      const response = await fetch('/api/translate-chapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': mockUserId, // Pass mock user ID for authentication
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Translation failed');
      }

      const data: ChapterTranslationResponse = await response.json();
      onTranslationComplete(data.translatedContent);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="translate-button" onClick={handleTranslate} disabled={isLoading}>
      {isLoading ? 'Translating...' : 'Translate to Urdu'}
      {error && <span className="translate-error-message"> (Error: {error})</span>}
    </button>
  );
}
