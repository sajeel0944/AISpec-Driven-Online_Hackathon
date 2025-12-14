export interface ChapterTranslationRequest {
  chapterId: string;
  targetLanguage: 'ur'; // Urdu
}

export interface ChapterTranslationResponse {
  translatedContent: string;
}
    
export enum PersonalizationTone {
  Formal = 'formal',
  Informal = 'informal',
  Technical = 'technical',
  Narrative = 'narrative',
}

export interface PersonalizationOptions {
  tone?: PersonalizationTone;
  length?: 'short' | 'medium' | 'long';
  complexity?: 'simple' | 'moderate' | 'advanced';
  keywords?: string[];
}

export interface ChapterPersonalizationRequest {
  chapterId: string;
  options: PersonalizationOptions;
}

export interface ChapterPersonalizationResponse {
  personalizedContent: string;
}
