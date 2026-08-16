import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";


const projects = [
  {
    number: "01",
    title: "Flow",
    category: "Project Management Platform",
    description:
      "An all-in-one SaaS tool to manage workspaces, tasks, and teams with role-based access.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "/projects/flow.jpg",
    link: "https://project-management-webapp-cufm.vercel.app/",
  },
  {
    number: "02",
    title: "FitTrack",
    category: "Fitness & Wellness Website",
    description:
      "A responsive dashboard to track workouts, progress, and daily activity with clean data visualizations.",
    tags: ["React", "Chart.js", "Tailwind CSS", "Express"],
    image: "/projects/moderngym.jpg",
    link: "https://moderngymlandingpage.netlify.app/",
  },
  {
    number: "03",
    title: "World Beauty",
    category: "E-commerce Storefront",
    description:
      "A freelance storefront for a Mumbai modest-fashion brand with animated product reveals and WhatsApp checkout.",
    tags: ["React", "Tailwind CSS", "Swiper.js", "AOS"],
    image: "/projects/worldbeauty.jpg",
    link: "https://www.worldbeauty.in/",
  },
  {
    number: "04",
    title: "Student Management System",
    category: "Admin Portal",
    description:
      "A full-stack admin system for managing students, attendance, and grading with a live PostgreSQL backend.",
    tags: ["React", "PostgreSQL", "Express", "Vercel"],
    image: "/projects/studentmanagement.jpg",
    link: "https://student-management-system-assessmen.vercel.app/",
  },
];

const ACCENT = "#5D5FEF"; // signature accent — used sparingly for the active index + underline

function ProjectRow({ project, isActive, isDimmed, onEnter, onLeave }) {
  return (


    <div
      className="group relative border-b border-white/10 py-5 md:py-10"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Desktop row */}
      <div
        className="hidden items-center gap-6 transition-opacity duration-500 md:flex"
        style={{ opacity: isDimmed ? 0.35 : 1 }}
      >
        {/* Number */}
        <span
          className="w-8 shrink-0 font-mono text-[11px] tracking-[0.2em]"
          style={{ color: isActive ? ACCENT : "rgba(255,255,255,0.35)" }}
        >
          {project.number}
        </span>

        {/* Title */}
        <h3 className="font-space flex-1 text-2xl font-medium tracking-[-0.02em] text-white transition-transform duration-500 group-hover:translate-x-2 lg:text-3xl">
          {project.title}
        </h3>

        {/* Category */}
        <span className="hidden w-52 text-right text-[11px] uppercase tracking-[0.12em] text-white/40 lg:block">
          {project.category}
        </span>

        {/* Arrow */}
        <a
          href={project.link}
          aria-label={`View ${project.title}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-all duration-300"
          style={{
            borderColor: isActive ? ACCENT : "rgba(255,255,255,0.2)",
            color: isActive ? ACCENT : "rgba(255,255,255,0.5)",
            transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          ↗
        </a>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: ACCENT }}>
            {project.number}
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-white/35">
            {project.category}
          </span>
        </div>

        <h3 className="mt-2 font-space text-2xl font-medium tracking-[-0.02em] text-white">
          {project.title}
        </h3>

        <a
          href={project.link}
          className="mt-4 block overflow-hidden rounded-lg border border-white/10"
        >
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            whileTap={{ scale: 0.98 }}
            className="aspect-[16/10] w-full object-cover"
          />
        </a>
      </div>

      {/* Desktop underline */}
      <span
        className="absolute bottom-0 left-0 hidden h-px bg-white transition-all duration-500 ease-out md:block"
        style={{ width: isActive ? "100%" : "0%" }}
      />
    </div>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - bounds.left);
    mouseY.set(e.clientY - bounds.top);
  };

  const activeProject = projects.find((p) => p.number === hovered);

  return (
    <section
      id="projects"
      className="relative bg-black px-6 py-16 text-white md:px-10 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl md:mx-24">
        {/* Header */}
        {/* Header */}
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-white/40">
              02
            </span>

            <span className="h-px w-8 bg-white/20" />

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Projects
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
      lg:text-6xl
    "
          >
            Things I&apos;ve Built.
          </h2>
        </div>

        {/* Horizontal index list */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="relative border-t border-white/10"
        >
          {projects.map((project) => (
            <ProjectRow
              key={project.title}
              project={project}
              isActive={hovered === project.number}
              isDimmed={hovered !== null && hovered !== project.number}
              onEnter={() => setHovered(project.number)}
              onLeave={() => setHovered(null)}
            />
          ))}

          {/* Cursor-following image preview — desktop only */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-52 w-72 overflow-hidden rounded-lg md:block"
            style={{
              x: springX,
              y: springY,
              translateX: "24px",
              translateY: "-110px",
            }}
            animate={{
              opacity: activeProject ? 1 : 0,
              scale: activeProject ? 1 : 0.85,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.img
                  key={activeProject.title}
                  src={activeProject.image}
                  alt={`${activeProject.title} preview`}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>
        </div>

        {/* Bottom */}
        {/* <div className="mt-10 flex items-center justify-between pt-2">
          <span className="text-[11px] uppercase tracking-[0.14em] text-white/30">
            Selected work
          </span>

          <a
            href="#contact"
            className="group flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default Projects;