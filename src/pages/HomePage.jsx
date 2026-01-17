import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Home from '../sections/Home';
import AboutMe from '../sections/AboutMe';
import Skills from '../sections/Skills';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Navbar from '../sections/Navbar';
import Testimonials from '../sections/Testimonials';
import SplashScreen from '../components/SplashScreen';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);
  const contentRef = useRef(null);

  const handleSplashComplete = () => {
    setSplashComplete(true);
    setShowSplash(false);
  };

  useEffect(() => {
    if (splashComplete && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }
  }, [splashComplete]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div 
        ref={contentRef}
        className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500"
        style={{ opacity: splashComplete ? 1 : 0 }}
      >
        <Navbar />

        <section id="home">
          <Home />
        </section>

        <section id="about">
          <AboutMe />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Portfolio />
        </section>

        <section id="test">
          <Testimonials />
        </section>
        
        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </div>
    </>
  );
}

