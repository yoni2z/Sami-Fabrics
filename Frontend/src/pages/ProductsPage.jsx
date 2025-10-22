import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import translations from "../locales"; // Import translations

const colors = {
  primary: "#3d6c26",
  secondary: "#124c5f",
  accent: "#6a4d1a",
};

const ProductsPage = () => {
  const { language } = useLanguage(); // Get current language
  const t = translations[language]; // Get translations for current language

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch all products initially
    fetchProducts();
  }, []);

  const fetchProducts = (categoryId = "") => {
    setLoading(true);
    let url = "http://127.0.0.1:8000/api/products/";
    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    axios
      .get(url)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <div className="py-30 container mx-auto p-6 font-JosefinSans">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {t.explore}
      </h1>

      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">
        {/* Sidebar: Category Filter */}
        <div className="w-full lg:w-1/4 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t.categories}
          </h2>

          {/* Category List */}
          <ul className="space-y-2 overflow-y-auto max-h-[400px]">
            <li
              className={`p-3 rounded-md cursor-pointer transition-all duration-300 ${
                selectedCategory === ""
                  ? "bg-[#124c5f] text-white"
                  : "bg-gray-100 hover:bg-[#3d6c26]"
              }`}
              onClick={() => handleCategoryChange("")}
            >
              {t.allCategories}
            </li>
            {categories.map((category) => {
              // Determine which category name to display based on the selected language
              const categoryName =
                language === "am" ? category.name_amh : category.name;

              return (
                <li
                  key={category.id}
                  className={`p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-[#124c5f] text-white"
                      : "bg-gray-100 hover:bg-[#3d6c26]"
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {categoryName} {/* Use the translated category name */}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product Display Grid */}
        <div className="w-full lg:w-3/4">
          {/* Loading State */}
          {loading && (
            <div className="text-center text-lg text-gray-600">
              Loading products...
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Use ProductCard Component */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* No Products Message */}
          {!loading && products.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
