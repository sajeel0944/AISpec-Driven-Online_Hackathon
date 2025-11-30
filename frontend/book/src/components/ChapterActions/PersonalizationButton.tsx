import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { ChapterPersonalizationRequest, ChapterPersonalizationResponse, PersonalizationTone } from '../../types/chapter';

interface PersonalizationButtonProps {
  chapterId: string;
  onPersonalizationComplete: (content: string) => void;
}

export default function PersonalizationButton({
  chapterId,
  onPersonalizationComplete,
}: PersonalizationButtonProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<PersonalizationTone | ''>('');
  const [showOptions, setShowOptions] = useState(false);

  const handlePersonalize = async () => {
    if (!selectedTone) {
      setError("Please select a tone for personalization.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const requestBody: ChapterPersonalizationRequest = {
      chapterId: chapterId,
      options: {
        tone: selectedTone as PersonalizationTone,
        // Add other personalization options here once implemented in the UI
      },
    };

    try {
      const response = await fetch(`${siteConfig.customFields?.backendUrl}/api/personalize-chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming auth token is stored in localStorage or similar
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: ChapterPersonalizationResponse = await response.json();
      onPersonalizationComplete(data.personalizedContent);
      setShowOptions(false); // Close options after successful personalization
    } catch (err) {
      setError(`Failed to personalize chapter: ${err.message}`);
      console.error('Personalization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.personalizationContainer}>
      <button
        className={styles.actionButton}
        onClick={() => setShowOptions(!showOptions)}
        disabled={isLoading}
      >
        {isLoading ? 'Personalizing...' : 'Personalize'}
      </button>

      {showOptions && (
        <div className={styles.personalizationOptions}>
          <label htmlFor="tone-select">Tone:</label>
          <select
            id="tone-select"
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value as PersonalizationTone)}
          >
            <option value="">Select Tone</option>
            {Object.values(PersonalizationTone).map((tone) => (
              <option key={tone} value={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </option>
            ))}
          </select>
          <button
            className={styles.actionButton}
            onClick={handlePersonalize}
            disabled={isLoading || !selectedTone}
          >
            Apply Personalization
          </button>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}