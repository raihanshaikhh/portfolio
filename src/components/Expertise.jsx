import { motion } from "framer-motion";
import icon from "../assets/icon.png";

const layers = [
  {
    index: "01",
    title: "Design",
    role: "the surface",
    note: "What people see first.",
    skills: ["UI / UX", "Figma", "Responsive Design", "Motion"],
  },
  {
    index: "02",
    title: "Frontend",
    role: "the interface",
    note: "Where they click, type, and scroll.",
    skills: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    index: "03",
    title: "Backend",
    role: "the engine",
    note: "What holds it together, quietly.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function Expertise() {
  return (
    <section
      id="expertise"
      className="relative mx-6 overflow-hidden py-16 px-3 md:mx-20 md:py-28"
    >
      {/* Subtle blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative md:mx-24">
        {/* Header */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-black/40">
              04
            </span>

            <span className="h-px w-8 bg-black/20" />

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40">
              Expertise
            </span>
          </div>

          <h2
            className="
    max-w-5xl
    font-space
    text-5xl
    font-medium
    leading-[0.95]
    tracking-[-0.055em]
    md:text-7xl
    lg:text-6xl
  "
          >
            From interface to infrastructure.
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-black/45 md:text-lg">            Three layers of the same build — from what you see, to what
            makes it move, to what keeps it running.
          </p>
        </motion.div>

        {/* Rows */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-12 border-t border-black/10"
        >
          {layers.map((layer) => (
            <motion.div
              key={layer.title}
              variants={fadeUp}
              className="
                group
                relative
                border-b
                border-black/10
                py-7
                transition-colors
                duration-300
                md:grid
                md:grid-cols-[60px_1fr_1.5fr]
                md:items-start
                md:gap-10
                md:py-9
                md:hover:bg-black/[0.02]
              "
            >
              {/* INDEX — hidden on mobile, left column on desktop */}
              <span className="hidden font-mono text-xs text-black/30 md:block md:pt-1">
                {layer.index}
              </span>

              {/* CONTENT ROW (title + skills) — mobile only, desktop uses md:contents */}
              <div className="flex items-start justify-between gap-4 md:contents">

                {/* ICON + TITLE + NOTE */}
                <div className="flex min-w-0 flex-1 gap-2.5 md:grid md:grid-cols-[28px_1fr] md:gap-3">
                  {/* ICON */}
                  <div className="pt-1 md:pt-2">
                    <img
                      src={icon}
                      alt=""
                      className="h-4 w-4 object-contain opacity-80 md:h-5 md:w-5"
                    />
                  </div>

                  {/* TITLE + NOTE */}
                  <div className="min-w-0">
                    {/* Heading */}
                    <div className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:items-center md:gap-x-3">
                      <h3
                        className="
                        font-space
                        text-2xl
                        leading-tight
                        tracking-[-0.04em]
                        md:text-4xl
                      "
                      >
                        {layer.title}
                      </h3>

                      <span
                        className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-black/80
                        md:text-[15px]
                      "
                      >
                        — {layer.role}
                      </span>
                    </div>

                    {/* Note */}
                    <p className="mt-2 text-xs text-black/70 md:mt-3 md:text-md">
                      {layer.note}
                    </p>
                  </div>
                </div>

                {/* SKILLS */}
                <div
                  className="
                  grid
                  grid-cols-1
                  gap-y-2
                  pt-1
                  text-right
                  md:col-start-3
                  md:grid-cols-2
                  md:gap-x-8
                  md:gap-y-2
                  md:pt-0
                  md:text-left
                "
                >
                  {layer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                      w-full
                      font-space
                      text-xs
                      tracking-[-0.01em]
                      text-black/60
                      transition-colors
                      duration-300
                      group-hover:text-black
                      md:w-fit
                      md:text-xl
                      md:tracking-[-0.02em]
                    "
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Expertise;