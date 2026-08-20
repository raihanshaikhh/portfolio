import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="
        mx-6
        flex flex-col
        gap-14
        py-20
        md:mx-26
        md:flex-row
        md:justify-between
        md:gap-0
        md:py-32
      "
    >
      {/* LEFT COLUMN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="
          mt-0
          w-full
          text-2xl
          font-mono
          md:mt-5
          md:w-100
        "
      >
        ABOUT ME

        <div
          className="
            mt-6
            w-full
            max-w-[320px]
            md:mt-10
            md:w-80
          "
        >
          <img
            src={profile}
            alt="Raihan"
            className="
              aspect-square
              w-full
              object-cover
            "
          />
        </div>
      </motion.div>

      {/* RIGHT COLUMN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="
          mt-0
          w-full
          md:mt-0
          md:ml-auto
          md:w-[40%]
        "
      >
        <h1
          className="
            font-roboto
            text-3xl
            leading-[1.1]
            tracking-tight
            sm:text-4xl
            md:text-5xl
            md:leading-tight
          "
        >
          Hi, I'm <span className="text-black">Raihan</span>,
          <br />
          <span>web developer based in India.</span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="
            mt-6
            text-base
            font-semibold
            leading-relaxed
            text-gray-600
            md:mt-10
            md:text-lg
          "
        >
          I build fast, responsive, and user-focused web applications using
          modern technologies like React, JavaScript, and Node.js. I care about
          clean code, thoughtful design, and shipping things that actually work
          in the real world.
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            relative
            mt-8
            mb-0
            h-14
            w-34
            cursor-pointer
            overflow-hidden
            rounded-full
            bg-gray-200
            font-roboto
            font-medium
            text-black
            transition-colors
            hover:bg-black
            hover:text-white
            md:mt-10
            md:mb-8
            md:p-2
          "
        >
          Start project
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;