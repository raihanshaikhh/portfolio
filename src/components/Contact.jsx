import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectForm from "./Projectform";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function Contact() {
    const sectionRef = useRef(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],
    });

    const nameX = useTransform(
        scrollYProgress,
        [0, 1],
        ["3%", "-3%"]
    );

    const nameOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 1],
        [0.05, 0.09, 0.14]
    );

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="
        relative
        overflow-hidden
        bg-[#eeeeee]
        px-6
        pb-0
        pt-24
        text-black
        md:px-20
        md:pt-32
      "
        >
            <div className="relative mx-auto max-w-7xl">

                {/* HEADER */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    className="
            flex
            flex-col
            gap-10
            md:flex-row
            md:items-center
            md:justify-between
          "
                >
                    {/* Heading */}

                    <h2
                        className="
              max-w-4xl
              font-space
              text-4xl
              font-medium
              leading-[1.02]
              tracking-[-0.05em]
              md:text-6xl
              lg:text-7xl
            "
                    >
                        Let&apos;s talk about your project
                        <br className="hidden md:block" />
                        and make something great out of it.
                    </h2>

                    {/* START PROJECT */}

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="
    group
    flex
    h-14
    w-fit
    shrink-0
    items-center
    justify-center
    gap-3
    rounded-full
    bg-[#e2e2e2]
    px-6
    text-sm
    font-medium
    transition-all
    duration-300
    hover:bg-black
    hover:text-white
    md:h-16
    md:px-7
    md:text-base
  "
                    >
                        <span>Start project</span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                        </span>
                    </button>
                </motion.div>

                {/* DIVIDER */}

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
            mt-20
            h-px
            origin-left
            bg-black/10
            md:mt-24
          "
                />

                {/* CONTACT INFO */}

                <div
                    className="
            grid
            grid-cols-1
            gap-12
            py-12
            md:grid-cols-[1fr_1fr_auto]
            md:gap-20
            md:py-16
          "
                >
                    {/* CONTACT */}

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                    >
                        <p className="mb-4 text-sm text-black/45">
                            Contact
                        </p>

                        <a
                            href="mailto:raihanshaikh91201@gmail.com"
                            className="
                block
                w-fit
                text-lg
                transition-colors
                hover:text-black/50
                md:text-xl
              "
                        >
                            raihanshaikh91201@gmail.com
                        </a>

                        <p className="mt-2 text-lg md:text-xl">
                            Mumbai, India
                        </p>
                    </motion.div>

                    {/* SOCIAL */}

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                    >
                        <p className="mb-4 text-sm text-black/45">
                            Social
                        </p>

                        <div className="flex flex-col items-start gap-2">
                            <a
                                href="https://github.com/raihanshaikhh"
                                className="
                  text-lg
                  transition-colors
                  hover:text-black/50
                  md:text-xl
                "
                            >
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/in/raihan-shaikhh/"
                                className="
                  text-lg
                  transition-colors
                  hover:text-black/50
                  md:text-xl
                "
                            >
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* COPYRIGHT */}

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        className="
              flex
              flex-col
              md:items-end
              md:text-right
            "
                    >
                        <p className="text-lg text-black/50 md:text-xl">
                            © 2026
                        </p>

                        <p className="mt-3 text-lg md:text-xl">
                            Raihan Shaikh
                        </p>
                    </motion.div>
                </div>

                {/* GIANT NAME */}

                <div
                    className="
            pointer-events-none
            select-none
            overflow-hidden
            whitespace-nowrap
          "
                >
                    <motion.h3
                        style={{
                            x: nameX,
                            opacity: nameOpacity,
                        }}
                        className="
              w-fit
              font-space
              text-[25vw]
              font-medium
              leading-[0.72]
              tracking-[-0.08em]
              text-black
              md:text-[16vw]
            "
                    >
                        RAIHAN SHAIKH
                    </motion.h3>
                </div>

            </div>
            <ProjectForm
  isOpen={isFormOpen}
  onClose={() => setIsFormOpen(false)}
/>
        </section>
    );
}

export default Contact;