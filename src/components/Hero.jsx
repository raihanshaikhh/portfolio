import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Globe from "./Globe.jsx";
import AnimatedWave from "./AnimatedWave.jsx";
import heroImage from "../assets/hero_image.png";

function Hero() {
  const { scrollY } = useScroll();

  // Background
  const backgroundY = useTransform(scrollY, [0, 1200], [0, 60]);
  const backgroundScale = useTransform(scrollY, [0, 1200], [1, 1.05]);

  const smoothBackgroundY = useSpring(backgroundY, {
    stiffness: 120,
    damping: 20,
  });

  const smoothBackgroundScale = useSpring(backgroundScale, {
    stiffness: 120,
    damping: 20,
  });

  // Foreground content
  const headingY = useTransform(scrollY, [0, 300, 1000], [0, 0, -250]);
  const paragraphY = useTransform(scrollY, [0, 300, 1000], [0, 0, -180]);
  const buttonY = useTransform(scrollY, [0, 300, 1000], [0, 0, -150]);
  const locationY = useTransform(scrollY, [0, 300, 1000], [0, 0, -100]);

  const contentOpacity = useTransform(scrollY, [0, 350, 700], [1, 1, 0]);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen overflow-hidden"
    >
      <AnimatedWave />
      {/* <img src={heroImage} alt="Hero" className="absolute inset-0 h-full w-full object-cover" /> */}

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
                   opacity-[0.20]"
      />

      {/* Hero content */}
      <div
        className="relative z-10 mx-6 mt-28 flex max-w-7xl
                   flex-col items-start gap-8 px-4
                   sm:mx-10 sm:mt-32 sm:gap-12 sm:px-6
                   md:mt-64 md:flex-row md:items-center md:justify-between"
      >
        {/* Text */}
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            y: headingY,
            opacity: contentOpacity,
          }}
          className="text-5xl mt-10 font-semibold font-geist text-white leading-[1.05]
                     tracking-[-0.03em]
                     md:text-8xl lg:text-8xl z-10"
        >
          Web Developer
          <br />
          & Designer
        </motion.h1>

        {/* Location — inline on mobile, floats absolute on md+ */}
        <motion.div
          style={{
            y: locationY,
            opacity: contentOpacity,
          }}
          className="flex items-center gap-3 whitespace-nowrap
                     md:relative md:left-75 md:top-30"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8">
            <Globe />
          </div>

          <p className="text-base text-white sm:text-xl">
            Mumbai, India
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        style={{
          opacity: contentOpacity,
        }}
        className="relative mt-10 px-4 sm:mt-14 sm:px-6 md:mt-20"
      >
        <svg className="h-px w-full">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Bottom CTA */}
      <div
        className="mx-6 mt-6 flex
                   flex-col gap-6 px-4 text-white
                   sm:mx-10 sm:mt-9 sm:px-6
                   md:flex-row md:items-center md:justify-between"
      >
        <motion.p
          style={{
            y: paragraphY,
            opacity: contentOpacity,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="text-white/75 text-lg leading-relaxed
                     sm:text-xl md:max-w-xl md:text-2xl"
        >
          I design and develop digital experiences your users will remember.
        </motion.p>

        <motion.button
          style={{
            y: buttonY,
            opacity: contentOpacity,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="btn btn-white btn-animated w-full sm:w-auto"
        >
          Start Project
        </motion.button>
      </div>
    </motion.section>
  );
}

export default Hero;