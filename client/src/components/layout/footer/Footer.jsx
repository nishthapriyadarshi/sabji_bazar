import React from "react";
import { FaLeaf, FaFacebookF, FaDiscord, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-2xl font-bold uppercase">
              <p className="text-green-400">Sabji</p>
              <p className="text-yellow-400">Bazzar</p>
              <FaLeaf className="text-green-500" />
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Bazar se sasta bazar se accha
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-primary">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-green-400">
                    Sabji Bazar
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-green-400">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-primary">Follow us</h2>
              <ul className="space-y-2">
                <li>
                  <a href="tel:+9771756448" className="hover:text-green-400">
                    Mobile: 9771756448
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/9771756448" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                    Whatsapp: 9771756448
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-primary">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-green-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-start md:items-end">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-300">Connect with us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Address Section */}
        <div className="text-center text-sm text-gray-400">
          <p>Address: sheikhpura, bihar, Sheikhpura, Bihar, India 811105</p>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2025 <span className="font-semibold text-green-400">Sabji Bazzar</span>. All rights reserved.
          </p>
          <div className="text-sm mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="text-gray-400 hover:text-green-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
