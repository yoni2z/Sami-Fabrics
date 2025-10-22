import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations
import i4 from "../assets/Hero/4.jpg";
import LanguageSwitcher from "./LanguageSwitcher";

const colors = ["#3d6c26", "#124c5f", "#6a4d1a"];

const Hero = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language

  const [showShopName, setShowShopName] = useState(true);
  const [colorIndex1, setColorIndex1] = useState(0);
  const [colorIndex2, setColorIndex2] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex1((prev) => (prev + 1) % colors.length);
      setColorIndex2((prev) => (prev + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowShopName((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden font-JosefinSans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={i4}
          alt="Luxury Bags"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <AnimatePresence mode="wait">
          {showShopName ? (
            <motion.div
              key="shop-name"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t.welcome}{" "}
                <span
                  className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl transition-colors duration-500"
                  style={{ color: colors[colorIndex1] }}
                >
                  Sami
                </span>
                <span
                  className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl transition-colors duration-500"
                  style={{ color: colors[colorIndex2] }}
                >
                  Fabrics
                </span>
              </h1>

              {/* Animated Buttons */}
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 50 }} // Start from below
                animate={{ opacity: 1, y: 0 }} // Move up to final position
                exit={{ opacity: 0, y: 50 }} // Exit to bottom
                transition={{ duration: 0.8 }}
              >
                <Link
                  to="/products"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  {t.exploreCollections}
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t.headline}{" "}
                <span className="text-[#3d6c26]">{t.luxuryBags}</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-6">
                {t.heroDescription}
              </p>

              {/* Animated Buttons */}
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 50 }} // Start from below
                animate={{ opacity: 1, y: 0 }} // Move up to final position
                exit={{ opacity: 0, y: 50 }} // Exit to bottom
                transition={{ duration: 0.8 }}
              >
                <Link
                  to="/products"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  {t.exploreCollections}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
