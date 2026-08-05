import { useEffect, useState } from "react";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlackHoleBackground from "./components/BlackHoleBackground";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const timer = setTimeout(() => {
      document.body.classList.remove("no-scroll");
      setShowSplash(false);
    }, 3050);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <Splash />}
      <BlackHoleBackground
        centre={{ voidX: 50, voidY: 50, voidRadius: 50 }}
        colors={["#FF0000"]}
        outerRadius={64}
        particleSize={1}
        orbitSpeed={1}
        tilt={11}
        tiltSideway={161}
      />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
