import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaLeaf, FaHandPaper, FaStar, FaHeart } from "react-icons/fa"; // React Icons
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const AboutUsSection = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language

  return (
    <section id="about-us" className="bg-[#F5F6F8] py-16 font-JosefinSans">
      <div className="container mx-auto px-6 text-center">
        <div className="bg-[#6a4d1a] text-white py-20 px-6 relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#3d6c26] opacity-20"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Short Brand Story Heading */}
            <h2 className="text-5xl font-extrabold mb-6 text-[#F5F6F8] animate__animated animate__fadeIn">
              {t.ourStory}
            </h2>

            {/* Story Description */}
            <p className="text-lg text-[#F5F6F8] max-w-3xl mx-auto mb-8 opacity-90 leading-relaxed">
              {t.storyDescription}
            </p>

            {/* Call-to-Action Button */}
            <Link
              to="/products"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#3d6c26] text-white px-8 py-3 rounded-full font-semibold 
      hover:bg-[#124c5f] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t.exploreBags}
            </Link>
          </div>
        </div>

        <div className="bg-[#F5F6F8] py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Mission & Values Heading */}
            <h2 className="text-5xl font-extrabold text-[#2D3035] mb-6 animate__animated animate__fadeIn">
              {t.ourMissionValues}
            </h2>
            <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto mb-12">
              {t.missionDescription}
            </p>

            {/* Mission & Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {/* Sustainability */}
              <div
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg 
          hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
              >
                <div className="bg-[#3d6c26] text-white rounded-full p-5 mb-4 shadow-md">
                  <FaLeaf size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3035] mb-2">
                  {t.sustainability}
                </h3>
                <p className="text-[#4A4A4A]">{t.sustainabilityDescription}</p>
              </div>

              {/* Handmade Craftsmanship */}
              <div
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg 
          hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
              >
                <div className="bg-[#3d6c26] text-white rounded-full p-5 mb-4 shadow-md">
                  <FaHandPaper size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3035] mb-2">
                  {t.handmadeCraftsmanship}
                </h3>
                <p className="text-[#4A4A4A]">
                  {t.handmadeCraftsmanshipDescription}
                </p>
              </div>

              {/* Premium Quality */}
              <div
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg 
          hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
              >
                <div className="bg-[#3d6c26] text-white rounded-full p-5 mb-4 shadow-md">
                  <FaStar size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3035] mb-2">
                  {t.premiumQuality}
                </h3>
                <p className="text-[#4A4A4A]">{t.premiumQualityDescription}</p>
              </div>

              {/* Passion for Culture */}
              <div
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg 
          hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
              >
                <div className="bg-[#3d6c26] text-white rounded-full p-5 mb-4 shadow-md">
                  <FaHeart size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3035] mb-2">
                  {t.passionForCulture}
                </h3>
                <p className="text-[#4A4A4A]">
                  {t.passionForCultureDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
