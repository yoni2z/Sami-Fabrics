import { Link } from "react-router-dom";
import { FaFacebookF, FaTiktok, FaInstagram, FaTelegram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const Footer = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language

  return (
    <footer
      id="footer"
      className="bg-gradient-to-r from-[#3d6c26] to-[#124c5f] text-white py-16 font-JosefinSans"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#F5F6F8] mb-6 tracking-wide">
              {t.footerBrandInfoTitle}
            </h2>
            <p className="text-lg text-[#F5F6F8] opacity-80">
              {t.footerBrandInfoDescription}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-2xl font-semibold text-[#F5F6F8] mb-4">
              {t.footerQuickLinksTitle}
            </h3>
            <ul className="text-lg space-y-4 text-[#F5F6F8]">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#F5F6F8] hover:underline transition duration-300"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t.footerHomeLink}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#F5F6F8] hover:underline transition duration-300"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t.footerProductsLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-semibold text-[#F5F6F8] mb-6">
              {t.footerFollowUsTitle}
            </h3>
            <div className="flex flex-col space-y-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaTiktok className="text-2xl hover:text-[#F5F6F8] transition-all duration-300 transform hover:scale-125 mr-3" />
                {t.tiktok}
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaInstagram className="text-2xl hover:text-[#F5F6F8] transition-all duration-300 transform hover:scale-125 mr-3" />
                {t.instagram}
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-[#F5F6F8] mb-4">
              {t.footerContactUsTitle}
            </h3>
            <ul className="space-y-4 text-[#F5F6F8]">
              {/* Address */}
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{t.footerAddress}</span>
              </li>
              {/* Phone */}
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+251940115697" className="hover:underline">
                  +251911239860
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#F5F6F8] mt-16 mb-8"></div>

        {/* Footer Bottom Section */}
        <div className="text-center">
          <p className="text-lg text-[#F5F6F8] opacity-70">
            &copy; {new Date().getFullYear()} Sami Fabrics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
