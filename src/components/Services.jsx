import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "I design websites that suit you and your target audience. Clear, responsive, and user-friendly. No standard solutions, but individual concepts focusing on structure, impact, and aesthetics.",
  },
  {
    number: "02",
    title: "Development",
    description:
      "High-performance web development: I implement your website using modern technologies — for fast loading times, optimal stability and perfect display on all devices.",
  },
  {
    number: "03",
    title: "SEO",
    description:
      "Visibility isn't a matter of chance. I integrate SEO into the concept from the outset, through clean code, clear content, and a well-thought-out site structure. So that your website gets found.",
  },
  {
    number: "04",
    title: "Care & Support",
    description:
      "Even after launch, I'll stay by your side. Whether it's regular updates, technical support, or minor adjustments, I'll make sure everything runs smoothly.",
  },
];

const blurReveal = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(18px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const container = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function Services() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#111111]
        px-6
        py-24
        text-white
        md:px-20
        md:py-32
      "
    >
      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}

        <motion.div
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mb-20 md:mb-28"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-white/40">
              05
            </span>

            <span className="h-px w-8 bg-white/20" />

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Services
            </span>
          </div>

          <h2
            className="
              max-w-5xl
              font-space
              text-4xl
              font-medium
              leading-[0.95]
              tracking-[-0.055em]
              md:text-6xl
              lg:text-7xl
            "
          >
            Web design, development,
            <br className="hidden md:block" />
            SEO and maintenance.
          </h2>

          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-relaxed
              text-white/45
              md:text-lg
            "
          >
            Everything you need to take an idea from concept to a
            fast, polished, and reliable digital experience.
          </p>
        </motion.div>


        {/* SERVICES */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid
            grid-cols-1
            gap-x-16
            md:grid-cols-2
          "
        >
          {services.map((service) => (
            <motion.article
              key={service.number}
              variants={blurReveal}
              className="
                group
                border-t
                border-white/15
                py-10
                md:py-12
              "
            >
              {/* TOP */}

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/35">
                  {service.number}
                </span>

                <h3
                  className="
                    font-space
                    text-xl
                    font-medium
                    tracking-[-0.02em]
                    md:text-2xl
                  "
                >
                  {service.title}
                </h3>
              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-[1.65]
                  text-white/55
                  transition-colors
                  duration-500
                  group-hover:text-white/80
                  md:text-lg
                "
              >
                {service.description}
              </p>
            </motion.article>
          ))}
        </motion.div>


        {/* BOTTOM STATEMENT */}

        <motion.div
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mt-20
            border-t
            border-white/10
            pt-8
            md:mt-28
          "
        >
          <p
            className="
              max-w-2xl
              font-space
              text-2xl
              leading-tight
              tracking-[-0.03em]
              text-white/70
              md:text-4xl
            "
          >
            From the first idea to the final launch —
            I build with purpose.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Services;