import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const CategoriesCard = ({ category }) => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine which name and description to display based on the selected language
  const displayName = language === "am" ? category.name_amh : category.name;
  const displayDescription =
    language === "am" ? category.description_amh : category.description;

  return (
    <>
      {/* Category Card */}
      <div
        className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)} // Open modal on click
      >
        {/* Category Image */}
        <img
          src={category.image}
          alt={displayName} // Use the translated name for alt text
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay with Name */}
        <div className="absolute inset-0 bg-black opacity-50 flex flex-col items-center justify-center">
          <h3 className="text-white text-2xl font-bold text-center px-4">
            {displayName} {/* Use the translated name */}
          </h3>
          <button className="mt-2 px-4 py-2 bg-[#3d6c26] text-white font-semibold rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {t.readMore}
          </button>
        </div>
      </div>

      {/* Modal for Full Description */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black opacity-80">
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-md text-center"
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for Readability */}
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

            {/* Content */}
            <div className="relative z-10 p-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                {displayName} {/* Use the translated name */}
              </h2>
              <p className="text-white">{displayDescription}</p>{" "}
              {/* Use the translated description */}
              <Link
                to="/products"
                onClick={() => {
                  setIsModalOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-4 mx-6 px-6 py-2 bg-[#6a4d1a] text-white font-semibold rounded-lg"
              >
                {t.seeBags}
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-6 py-2 bg-[#6a4d1a] text-white font-semibold rounded-lg"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesCard;
