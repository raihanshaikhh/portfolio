import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LinkItem = ({ children, href }) => (
  <a
    href={href}
    className="transition-colors duration-300"
  >
    {children}
  </a>
);

function Navbar() {
  const hasAnimated = useRef(false);

  const [navTheme, setNavTheme] = useState("light");

useEffect(() => {
  const sections = [
    {
      id: "hero",
      theme: "dark",
    },
    {
      id: "about",
      theme: "light",
    },
    {
      id: "projects",
      theme: "dark",
    },
    {
      id: "expertise",
      theme: "light",
    },
    {
      id: "services",
      theme: "dark",
    },
    {
      id: "contact",
      theme: "light",
    },
  ];

  const elements = sections
    .map((section) => ({
      ...section,
      element: document.getElementById(section.id),
    }))
    .filter((section) => section.element);

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (visible.length > 0) {
        const active = elements.find(
          (section) =>
            section.element === visible[0].target
        );

        if (active) {
          setNavTheme(active.theme);
        }
      }
    },
    {
      threshold: [0.2, 0.4, 0.6, 0.8],
    }
  );

  elements.forEach(({ element }) => {
    observer.observe(element);
  });

  return () => observer.disconnect();
}, []);

  return (
    <motion.nav
      initial={
        hasAnimated.current
          ? false
          : {
              translateY: "-50px",
              opacity: 0,
            }
      }
      animate={{
        translateY: "0px",
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        hasAnimated.current = true;
      }}
      className={`
        fixed
        left-0
        z-50
        flex
        w-full
        items-center
        justify-between
        bg-transparent
        px-6
        py-4
        transition-colors
        duration-300
        md:px-16

        ${
          navTheme === "dark"
            ? "text-white/90"
            : "text-black"
        }
      `}
    >
      <h1 className="text-2xl">
        Raihan Shaikh
      </h1>

      <div className="flex gap-6 text-2xl">
        <LinkItem href="#about">
          About
        </LinkItem>

        <LinkItem href="#projects">
          Projects
        </LinkItem>

        <LinkItem href="#expertise">
          Skills
        </LinkItem>

        <LinkItem href="#contact">
          Contact
        </LinkItem>
      </div>
    </motion.nav>
  );
}

export default Navbar;