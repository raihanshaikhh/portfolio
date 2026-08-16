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
      className="mx-6 flex flex-col md:mx-24 md:flex-row md:justify-between p-20 md:py-32"
    >
      {/* LEFT COLUMN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10 text-2xl md:w-100 font-mono"
      >
        ABOUT ME
        <div className="mt-4 w-80 md:mt-10">
          <img
            src={profile}
            alt="Profile"
            className="aspect-square w-full object-cover"
          />
        </div>
      </motion.div>

      {/* RIGHT COLUMN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 w-full md:mt-0 md:ml-auto md:w-[40%]"
      >
        <h1 className="font-roboto text-3xl leading-tight md:text-5xl">
          Hi, I'm <span className="text-black">Raihan</span>,
          <br />
          <span>web developer based in India.</span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 text-base font-semibold leading-relaxed text-gray-600 md:mt-10 md:text-lg"
        >
          I build fast, responsive, and user-focused web applications using
          modern technologies like React, JavaScript, and Node.js. I care about
          clean code, thoughtful design, and shipping things that actually work
          in the real world.
        </motion.p>

        {/* Button */}
        <motion.button
          className="relative mt-8 mb-8 h-12 w-32 cursor-pointer overflow-hidden rounded-xl bg-gray-200 font-roboto font-medium text-black md:mt-10"
        >
          Start project
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;