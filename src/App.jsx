import './App.css'
import Home from './sections/Home'
import AboutMe from './sections/AboutMe'
import Skills from './sections/Skills'
import Portfolio from './sections/Portfolio'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Navbar from './sections/Navbar'
import Testimonials from './sections/Testimonials'

function App() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
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
  )
}

export default App
