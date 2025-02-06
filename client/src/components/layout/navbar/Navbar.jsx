import React, { useState, useEffect, useContext } from "react";
import { FaCarrot, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";
import "tailwindcss/tailwind.css";

const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Shop Veggies", link: "/product" },
  { id: 3, title: "About Us", link: "/about" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    ["token", "email", "role"].forEach((item) => localStorage.removeItem(item));
    setIsLoggedIn(false);
    navigate("/login");
  };

  const iconButtonClass =
    "text-2xl hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white rounded-full p-2 duration-200";

  const renderNavItems = (mobile = false) => (
    <>
      {NavbarMenu.map((menu) => (
        <li key={menu.id} className="text-lg">
          <Link
            to={menu.link}
            className="inline-block py-1 px-3 hover:text-green-600 hover:shadow-[0_3px_0_-1px_#32CD32] font-semibold"
            onClick={mobile ? toggleMobileMenu : undefined}
          >
            {menu.title}
          </Link>
        </li>
      ))}
      {isLoggedIn && (
        <div className="relative">
          <button className={iconButtonClass}>
            <Link
              to="/user/orders"
              onClick={mobile ? toggleMobileMenu : undefined}
            >
              <MdOutlineShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </button>
        </div>
      )}
    </>
  );

  return (
    <nav
      className={`shadow-lg w-full bg-background ${
        isMobileMenuOpen ? "fixed inset-0 z-50 bg-opacity-90 backdrop-blur-md" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8"
      >
        {/* Logo Section */}
        <Link
          to="/"
          className="text-2xl flex items-center gap-2 font-bold uppercase text-green-800"
        >
          <span className="text-orange-500">Sabji</span>
          <span className="text-green-500">Bazar</span>
          <FaCarrot className="text-orange-500" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-green-800">
          <ul className="flex items-center gap-6">{renderNavItems()}</ul>
          <div className="flex gap-4 items-center">
            {isLoggedIn ? (
              <button className={iconButtonClass} onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            ) : (
              <Link to="/signup">
                <button className={iconButtonClass}>
                  <FaUser />
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-4xl text-green-800">
            {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-r from-green-50 to-green-100 w-11/12 max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleMobileMenu}
                className="text-3xl text-green-800"
              >
                <MdClose />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-4 text-green-800">
              {renderNavItems(true)}
              <div className="flex gap-4 items-center">
                <button className={iconButtonClass}>
                  <MdOutlineShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </button>
                {isLoggedIn ? (
                  <button className={iconButtonClass} onClick={handleLogout}>
                    <FaSignOutAlt />
                  </button>
                ) : (
                  <Link to="/signup">
                    <button className={iconButtonClass}>
                      <FaUser />
                    </button>
                  </Link>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
