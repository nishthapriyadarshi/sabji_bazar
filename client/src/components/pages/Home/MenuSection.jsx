import React from "react";
import BrandInfo from "./BrandInfo";
import { motion } from "framer-motion";
import Tomato from "../../../assets/sabji/tamatar.jpg";
import Dhaniya from "../../../assets/sabji/dhaniya.jpg";
import Baigan from "../../../assets/sabji/baigan.jpg";
import Gazar from "../../../assets/sabji/gazar.jpg";
import Potato from "../../../assets/sabji/aalu.jpg";
import Onion from "../../../assets/sabji/pyaz.jpg";

// Default placeholder image
const DefaultImage = "https://via.placeholder.com/150";

// Animation variants for horizontal slide
const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Product card component
const ProductCard = ({ image, name, price }) => (
  <motion.div
    variants={slideIn}
    className="shadow-lg rounded-xl bg-background p-4 flex flex-col items-center min-w-[150px] sm:min-w-[200px] lg:min-w-[250px] mx-2"
  >
    <img
      src={image || DefaultImage}
      alt={name}
      className="w-20 h-20 mb-3 object-cover"
    />
    <h3 className="font-headings text-base sm:text-lg text-textSecondary mb-2">
      {name}
    </h3>
    <p className="text-button font-bold text-lg sm:text-xl">₹{price}</p>
  </motion.div>
);

// Menu section component
const MenuSection = () => {
  const products = [
    { id: 1, name: "Fresh Tomatoes", price: "3.99", image: Tomato },
    { id: 2, name: "Fresh Coriander", price: "4.99", image: Dhaniya },
    { id: 3, name: "Fresh Bringles", price: "5.99", image: Baigan },
    { id: 4, name: "Fresh Carrots", price: "2.99", image: Gazar },
    { id: 5, name: "Fresh Potatoes", price: "6.99", image: Potato },
    { id: 6, name: "Fresh Onion", price: "7.99", image: Onion }, // No image
  ];

  return (
    <>
      <section className="w-full py-10 bg-background text-textPrimary">
        {/* Section Title */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          initial="hidden"
          animate="visible"
          className="text-3xl font-headings mb-8 text-center text-textPrimary"
        >
          OUR MENU
        </motion.h2>

        {/* Horizontal Scrollable Product Cards */}
        <motion.div
          className="flex overflow-x-auto scroll-hide gap-4 px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </motion.div>
      </section>

      {/* Brand Info Section */}
      <BrandInfo />
    </>
  );
};

export default MenuSection;
