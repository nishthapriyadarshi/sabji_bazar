import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../cart/CartContext"; // Assuming CartContext is available

const Product = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { addToCart } = useContext(CartContext); // Access CartContext to add products to cart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data); // Set the response data (products) to state
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when the component is mounted

  // Display loading, error, or product data
  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleAddToCart = (product) => {
    addToCart(product); // Add selected product to the cart
  };

  return (
    <div className="container mx-auto p-4 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No products available.
        </p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="max-w-sm rounded-lg overflow-hidden shadow-card bg-white border border-border transition-transform transform hover:scale-105"
          >
            <img
              className="w-full h-48 object-cover"
              src={`http://localhost:8080/${product.image}`}
              alt={product.name}
            />
            <div className="px-6 py-4">
              <h3 className="font-headings text-xl text-textPrimary mb-2">
                {product.name}
              </h3>
              <p className="text-textSecondary font-body">
                Price: ₹{product.price}
              </p>
              <p className="text-textSecondary font-body">Unit: {product.unit}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(product)} // Call the handleAddToCart function
                  className="w-full bg-button text-white hover:bg-buttonHover font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
