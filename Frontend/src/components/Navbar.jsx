import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For the hamburger menu
import { motion, AnimatePresence } from "framer-motion"; // For animations
import logo from "../assets/s-transparent.png"; // Import logo image
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const Navbar = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const navigate = useNavigate();

  const handleNavigateToFooter = () => {
    navigate("/#footer"); // Navigate to the Home page and add the hash to scroll to the section
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("footer").offsetTop,
        behavior: "smooth",
      });
    }, 100); // Delay to allow the page to load before scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-transparent p-4 fixed w-full top-0 z-50 transition-all duration-300 ease-in-out font-JosefinSans">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo with Image */}
        <div className="text-white text-2xl font-bold flex items-center space-x-3">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={logo}
              alt="Brand Logo"
              className="transition-transform transform hover:scale-110 duration-300 ease-in-out"
              style={{ width: "150px", height: "100px", objectFit: "cover" }}
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            {t.home}
          </Link>
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            {t.products}
          </Link>
          <Link
            to="#footer"
            onClick={handleNavigateToFooter}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            {t.contacts}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-[#3d6c26] text-3xl hover:text-[#F5F6F8] transition-all duration-300"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }} // Start off-screen to the right
            animate={{ x: 0 }} // Slide in to cover half the page
            exit={{ x: "100%" }} // Slide out to the right
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            className="fixed top-0 right-0 h-full w-1/2 bg-[#3d6c26] p-4 shadow-lg z-40"
          >
            {/* Close Button (X) */}
            <button
              onClick={handleMenuToggle}
              className="text-white text-3xl absolute top-4 left-4 hover:text-[#F5F6F8] transition-all duration-300"
            >
              <FaTimes />
            </button>

            {/* Menu Links */}
            <div className="flex flex-col space-y-6 mt-16">
              <Link
                to="/"
                className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Products
              </Link>
              <Link
                to="#footer"
                className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavigateToFooter();
                }}
              >
                Contact
              </Link>
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
