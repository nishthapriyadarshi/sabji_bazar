import React from "react";
import { motion } from "framer-motion";
import BannerLogo from "../../../assets/sbLogo.png";

const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const BrandInfo = () => {
  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 px-4 bg-background flex flex-col md:flex-row items-center gap-6"
      >
        <motion.div
          variants={scrollAnimation}
          className="flex-1 flex justify-center"
        >
          <img
            src={BannerLogo}
            alt="Brand logo"
            className="w-48 md:w-64 lg:w-72 object-contain rounded-lg"
          />
        </motion.div>
        <motion.div
          variants={scrollAnimation}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary mb-4">
            BRAND INFO
          </h2>
          <p className="text-base md:text-lg text-textSecondary mb-2">
            At MrSABJI bazaar, we believe that the way we eat should be
            connected to the way we grow. Our journey began with a simple idea:
            to make fresh, local vegetables easily accessible to everyone. We
            saw the gap between farmers and consumers and decided to bridge it
            by creating a platform that delivers farm-fresh produce directly
            to your doorstep.
          </p>
          <p className="text-base md:text-lg text-textSecondary mb-6">
            Your satisfaction is our priority.
          </p>
          <button className="bg-button text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-buttonHover">
            Learn More
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
        className="w-full p-4 bg-background text-center border rounded-lg shadow sm:p-8"
      >
        <h5 className="mb-2 text-2xl md:text-3xl font-bold text-textPrimary">
          Order fast from anywhere
        </h5>
        <p className="mb-5 text-sm md:text-base text-textSecondary sm:text-lg">
          Stay up to date and move work forward with Flowbite on iOS & Android.
          Download the app today.
        </p>
      </motion.section>
    </>
  );
};

export default BrandInfo;
