import { createContext, useState, useContext } from "react";

// Create Context
const LanguageContext = createContext();

// Custom Hook for using LanguageContext
export const useLanguage = () => useContext(LanguageContext);

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default to English

  // Toggle between English & Amharic
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
