import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LinkItem = ({ children, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="transition-colors duration-300"
  >
    {children}
  </a>
);

function Navbar() {
  const hasAnimated = useRef(false);

  const [navTheme, setNavTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [
      { id: "hero", theme: "dark" },
      { id: "about", theme: "light" },
      { id: "projects", theme: "dark" },
      { id: "expertise", theme: "light" },
      { id: "services", theme: "dark" },
      { id: "contact", theme: "light" },
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

  // Prevent portfolio from scrolling behind mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
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
          top-0
          z-50
          flex
          w-full
          items-center
          justify-between
          bg-transparent
          px-6
          py-5
          transition-colors
          duration-300
          md:px-16
          md:py-4

          ${menuOpen
            ? "text-black"
            : navTheme === "dark"
              ? "text-white/90"
              : "text-black"

          }
        `}
      >
        {/* LOGO */}

        <a
          href="#hero"
          onClick={closeMenu}
          className="font-space text-xl tracking-[-0.03em] md:text-2xl"
        >
          Raihan Shaikh
        </a>

        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-6 text-xl md:flex">
          <LinkItem href="#about">About</LinkItem>

          <LinkItem href="#projects">
            Projects
          </LinkItem>

          <LinkItem href="#expertise">
            Skills
          </LinkItem>

          <LinkItem href="#services">
            Services
          </LinkItem>

          <LinkItem href="#contact">
            Contact
          </LinkItem>
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-current
            md:hidden
          "
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={
                menuOpen
                  ? {
                    rotate: 45,
                    y: 4,
                  }
                  : {
                    rotate: 0,
                    y: 0,
                  }
              }
              className="block h-px w-4 bg-current"
            />

            <motion.span
              animate={
                menuOpen
                  ? {
                    rotate: -45,
                    y: -2,
                  }
                  : {
                    rotate: 0,
                    y: 0,
                  }
              }
              className="block h-px w-4 bg-current"
            />
          </div>
        </button>
      </motion.nav>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: "-100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-100%",
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              inset-0
              z-40
              flex
              flex-col
              bg-[#eeeeee]
              px-6
              pb-10
              pt-28
              text-black
              md:hidden
            "
          >
            {/* MENU LABEL */}

            <div className="mb-10 flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.2em] text-black/40">
                MENU
              </span>

              <span className="h-px w-8 bg-black/20" />
            </div>

            {/* LINKS */}

            <div className="flex flex-col">
              {[
                ["01", "About", "#about"],
                ["02", "Projects", "#projects"],
                ["03", "Skills", "#expertise"],
                ["04", "Services", "#services"],
                ["05", "Contact", "#contact"],
              ].map(([number, label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.08 * index,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-5
                    border-b
                    border-black/10
                    py-5
                  "
                >
                  <span className="font-mono text-xs text-black/30">
                    {number}
                  </span>

                  <span className="
                    font-space
                    text-3xl
                    tracking-[-0.04em]
                    transition-transform
                    duration-300
                    group-active:translate-x-2
                  ">
                    {label}
                  </span>

                  <span className="ml-auto text-xl text-black/30">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>

            {/* BOTTOM */}

            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/50">
                  Available for work
                </p>

                <p className="mt-2 text-sm text-black/60">
                  Mumbai, India
                </p>
              </div>

              <span className="font-mono text-xs text-black/30">
                © 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;