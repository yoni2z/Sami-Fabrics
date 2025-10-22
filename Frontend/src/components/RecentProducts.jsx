import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const RecentProducts = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product-list") // Adjust API URL
      .then((res) => res.json())
      .then((data) => {
        // Sort products by latest `created_at` date (newest first)
        const sortedProducts = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setProducts(sortedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="py-5 px-6 bg-[#F5F6F8] font-JosefinSans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-[#3d6c26] mb-6 animate__animated animate__fadeIn">
          {t.recentProductsTitle}
        </h2>
        <p className="text-lg text-[#4A4A4A] mb-12">
          {t.recentProductsDescription}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.slice(0, 8).map((product) => {
              // Determine which category name to display based on the selected language
              const categoryName =
                language === "am"
                  ? product.category.name_amh
                  : product.category.name;

              return (
                <div
                  key={product.id}
                  className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={categoryName} // Use the translated category name for alt text
                    className="w-full h-64 object-cover group-hover:brightness-75 transition duration-300"
                  />

                  {/* Hover Effect - Show Product Name & Price */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 flex flex-col justify-center items-center transition duration-300">
                    <h3 className="text-lg font-semibold text-white">
                      {categoryName} {/* Use the translated category name */}
                    </h3>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-4">{t.noProductsMessage}</p>
          )}
        </div>

        {/* More Products Button */}
        <div className="mt-12">
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <button className="bg-[#3d6c26] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#124c5f] hover:scale-105 transition duration-300 shadow-lg hover:shadow-2xl">
              {t.moreProductsButton}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;
