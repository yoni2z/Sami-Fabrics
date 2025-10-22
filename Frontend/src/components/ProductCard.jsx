import { useState } from "react";
import { motion } from "framer-motion";

const colors = {
  primary: "#3d6c26",
  secondary: "#124c5f",
  accent: "#6a4d1a",
};

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Product Card */}
      <motion.div
        className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
        style={{ borderColor: colors.accent }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </motion.div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl">
            {/* Large Image */}
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white font-bold text-4xl hover:text-[#6a4d1a] p-2 rounded-full shadow-lg transition duration-300 ease-in-out"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Product Name */}
            <h2
              className="text-lg font-semibold text-center mt-4"
              style={{ color: colors.primary }}
            >
              {product.name}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
