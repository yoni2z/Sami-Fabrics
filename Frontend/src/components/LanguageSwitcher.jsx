import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
    >
      {language === "en" ? "አማ" : "Eng"}
    </button>
  );
};

export default LanguageSwitcher;
