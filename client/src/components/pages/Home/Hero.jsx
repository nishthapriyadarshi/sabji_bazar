import React from "react";
import { MdShoppingBag } from "react-icons/md";
import HeroImg from "../../../assets/sbLogo.png";
import LeafImg from "../../../assets/leaf.png";
import { FadeRight } from "../../utility/Animation";
import { motion } from "framer-motion"; // Corrected import path for motion
import MenuSection from "./MenuSection";

const Hero = () => {
  return (
    <>
      <section className="bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
          {/* Brand Info */}
          <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
            <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
              <motion.h1
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-headings text-textPrimary"
              >
                Healthy
                <br />
                Fresh <span className="text-orange-500">Sabji!</span>
              </motion.h1>
              <motion.p
                variants={FadeRight(0.9)}
                initial="hidden"
                animate="visible"
                className="text-2xl tracking-wide text-textPrimary font-body"
              >
                हर रोज़ ताज़गी भरी सब्जी का वादा
              </motion.p>
              <motion.p
                variants={FadeRight(1.2)}
                initial="hidden"
                animate="visible"
                className="text-textSecondary font-body"
              >
                Welcome to Mrsabji Bazaar—your one-stop online platform for
                fresh, organic, and high-quality vegetables delivered straight
                to your doorstep.
              </motion.p>
              <motion.div
                variants={FadeRight(1.5)}
                initial="hidden"
                animate="visible"
                className="flex justify-center md:justify-start"
              >
                <button className="bg-button text-white py-2 px-6 rounded shadow-card flex items-center gap-2 hover:bg-buttonHover transition-all duration-300">
                  <span>
                    <MdShoppingBag />
                  </span>
                  Order Now
                </button>
              </motion.div>
            </div>
          </div>

          {/* Hero Images */}
          <div className="flex justify-center items-center">
            <motion.img
              initial={{ opacity: 0, x: 200, rotate: 75 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              src={HeroImg}
              alt="Hero"
              className="w-[350px] md:w-[550px] drop-shadow-lg"
            />
          </div>

          {/* Leaf Image */}
          <div className="absolute top-25 md:top-20 right-1/2 blur-sm opacity-80 rotate-[40deg]">
            <motion.img
              initial={{ opacity: 0, y: -200, rotate: 75 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              src={LeafImg}
              alt="Leaf"
              className="w-full md:max-w-[300px]"
            />
          </div>
        </div>
      </section>
      <MenuSection />
    </>
  );
};

export default Hero;
