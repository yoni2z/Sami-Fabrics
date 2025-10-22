import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "", // English name
    name_amh: "", // Amharic name
    description: "", // English description
    description_amh: "", // Amharic description
    image: null, // Category image
  });
  const [newProduct, setNewProduct] = useState({
    category: "",
    image: null,
    is_available: true, // Set default availability to true
  });

  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage("Failed to load categories.");
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to load products.");
    }
  };

  // Add New Category
  const addCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.name_amh.trim()) {
      setErrorMessage("Category name in both English and Amharic is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name); // English name
    formData.append("name_amh", newCategory.name_amh); // Amharic name
    formData.append("description", newCategory.description || ""); // English description
    formData.append("description_amh", newCategory.description_amh || ""); // Amharic description

    // If an image is selected, append it; otherwise, send an empty string
    if (newCategory.image) {
      formData.append("image", newCategory.image);
    } else {
      formData.append("image", ""); // Prevent backend errors
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/categories/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchCategories();
      setCategoryMessage("Category added successfully!");
      setTimeout(() => setCategoryMessage(""), 3000);
      setNewCategory({
        name: "",
        name_amh: "",
        description: "",
        description_amh: "",
        image: null,
      });
      setErrorMessage(""); // Clear errors
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
      setErrorMessage("Failed to add category. Please check the input.");
      setCategoryMessage("Error adding category. Please try again.");
      setTimeout(() => setCategoryMessage(""), 3000); // Hide after 3 seconds
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Failed to delete category.");
    }
  };

  // Add New Product
  const addProduct = async () => {
    if (!newProduct.category || !newProduct.image) {
      setErrorMessage("Category and image are required.");
      return;
    }

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append product fields to the FormData object
      formData.append("category", newProduct.category); // Send only category ID
      formData.append("is_available", newProduct.is_available);
      formData.append("image", newProduct.image); // Appending the image file

      // Send the FormData to the backend using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the request is treated as form-data
          },
        }
      );

      fetchProducts(); // Refresh product list after adding new product
      setSuccessMessage("Product added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds

      setNewProduct({
        category: "",
        image: null,
        is_available: false,
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      setErrorMessage("Failed to add product.");
      setSuccessMessage("Error adding product. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product.");
    }
  };

  return (
    <div className="mt-10 p-6 pt-20 font-JosefinSans">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>

      {/* Display Error Messages */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-3 mb-4">{errorMessage}</div>
      )}

      {/* CATEGORY MANAGEMENT */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
        {/* Success Message */}
        {categoryMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-lg text-center">
            {categoryMessage}
          </div>
        )}
        <div className="flex flex-col gap-4 mb-4">
          {/* English Name */}
          <input
            type="text"
            placeholder="Category Name (English)"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Amharic Name */}
          <input
            type="text"
            placeholder="Category Name (Amharic)"
            value={newCategory.name_amh}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name_amh: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* English Description */}
          <input
            type="text"
            placeholder="Description (English)"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Amharic Description */}
          <input
            type="text"
            placeholder="Description (Amharic)"
            value={newCategory.description_amh}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                description_amh: e.target.value,
              })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) =>
              setNewCategory({ ...newCategory, image: e.target.files[0] })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Add Category Button */}
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <FaPlus /> <span>Add Category</span>
          </button>
        </div>

        {/* Display Categories */}
        <ul className="mt-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between bg-gray-100 p-3 rounded-lg my-2 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {category.image && (
                  <img
                    src={category.image} // Assuming your image is hosted or accessible directly
                    alt={category.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <span className="block font-semibold">{category.name}</span>
                  <span className="block text-sm text-gray-600">
                    {category.name_amh}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteCategory(category.id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCT MANAGEMENT */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.files[0] })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Optional: Checkbox to toggle availability */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newProduct.is_available}
              onChange={(e) =>
                setNewProduct({ ...newProduct, is_available: e.target.checked })
              }
              className="border p-2 rounded-lg"
            />
            <span>Available</span>
          </label>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <FaPlus /> <span>Add</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
