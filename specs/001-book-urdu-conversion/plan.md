# ARCHITECTURAL PLAN
## Book Conversion to Urdu

**Feature Branch**: 003-book-urdu-conversion  
**Status**: Draft

## 1. Architecture Overview
The feature uses Docusaurus i18n to provide Urdu translations while preserving the original English content.

## 2. Key Decisions

### Decision 1: Use Docusaurus i18n
- Native and scalable solution
- Minimal custom logic required

### Decision 2: RTL Support via CSS
- Apply RTL only when locale is Urdu
- Use dir="rtl" and CSS selectors

### Decision 3: Locale-Based Routing
- /en/ for English
- /ur/ for Urdu

## 3. Components
- docusaurus.config.js (i18n config)
- i18n/ur/ content directory
- custom.css (RTL + fonts)
- Navbar language switcher

## 4. Data Flow
1. User selects Urdu
2. Locale changes
3. Urdu Markdown is rendered
4. RTL styles applied

## 5. Risks
- RTL layout issues
- Missing translations

## 6. Mitigation
- Isolated RTL CSS
- English fallback
