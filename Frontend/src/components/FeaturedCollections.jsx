import { useState, useEffect } from "react";
import CategoriesCard from "./CategoriesCard";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const FeaturedCollections = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className="py-12 font-JosefinSans">
      <h2 className="text-4xl font-bold text-center mb-8 text-[#3d6c26]">
        {t.featured}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {categories.map((category) => (
          <CategoriesCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
