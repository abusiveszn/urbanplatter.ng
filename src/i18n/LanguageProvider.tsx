import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

type LanguageContextValue = {
  language: string;
  setLanguage: (l: string) => void;
  t: (key: string) => string;
};

const defaultLang = 'English';

const LanguageContext = createContext<LanguageContextValue>({
  language: defaultLang,
  setLanguage: () => {},
  t: (k: string) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultLang;
    return localStorage.getItem('language') ?? defaultLang;
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {}
  }, [language]);

  const t = (key: string) => {
    return translations[language]?.[key] ?? translations[defaultLang]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
