import React from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Expertise from "./components/Expertise.jsx";
import Contact from "./components/Contact.jsx";
import Services from "./components/Services.jsx";
import Loader from "./components/Loader.jsx";

function App() {
   useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,      // Increase for slower scroll
      smoothWheel: true,
      touchMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);


  return (
    <>
    <Loader />
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Expertise />
    <Services />
    <Contact />
    </>
  )
}
export default App;