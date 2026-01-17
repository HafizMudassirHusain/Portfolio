import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);

  // Initialize and sync dark mode with DOM
  useEffect(() => {
    const html = document.documentElement;
    
    // Always sync state with DOM
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home', route: '/' },
    { name: 'About', to: 'about', route: null },
    { name: 'Projects', to: 'projects', route: '/projects' },
    { name: 'Skills', to: 'skills', route: null },
    { name: 'Contact', to: 'contact', route: null },
  ];

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    
    // Update state - useEffect will handle DOM update
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    // Also update DOM immediately for instant feedback
    const html = document.documentElement;
    if (newDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-teal-900/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          {isHomePage ? (
            <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500"
            >
              HMH
            </motion.div>
            </ScrollLink>
          ) : (
            <RouterLink
              to="/"
              className="flex items-center cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500"
              >
                HMH
              </motion.div>
            </RouterLink>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.route) {
                return (
                  <RouterLink
                    key={link.to}
                    to={link.route}
                    className="relative text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white cursor-pointer transition-colors group"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 dark:bg-teal-500 transition-all duration-300 group-hover:w-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                    />
                  </RouterLink>
                );
              } else if (isHomePage) {
                return (
                  <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                    className="relative text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white cursor-pointer transition-colors group"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 dark:bg-teal-500 transition-all duration-300 group-hover:w-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                    />
                  </ScrollLink>
                );
              } else {
                return (
                  <RouterLink
                    key={link.to}
                    to={`/#${link.to}`}
                    className="relative text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white cursor-pointer transition-colors group"
              >
                {link.name}
                <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 dark:bg-teal-500 transition-all duration-300 group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
                  </RouterLink>
                );
              }
            })}

            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-teal-800 dark:bg-gray-700 text-teal-200 dark:text-teal-400 hover:bg-teal-700 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Toggle dark mode"
            >
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.div>
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* <button
              onClick={toggleTheme}
              className="p-2 mr-4 rounded-full bg-teal-800 dark:bg-gray-700 text-teal-200 dark:text-teal-400 hover:bg-teal-700 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Toggle dark mode"
            >
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.div>
            </button> */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-teal-800 dark:bg-gray-700 text-teal-200 dark:text-teal-400 hover:bg-teal-700 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-teal-900/95 dark:bg-gray-950/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  if (link.route) {
                    return (
                      <RouterLink
                        key={link.to}
                        to={link.route}
                        onClick={() => setIsOpen(false)}
                        className="text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white py-2 px-4 rounded-lg hover:bg-teal-800 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </RouterLink>
                    );
                  } else if (isHomePage) {
                    return (
                      <ScrollLink
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                        className="text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white py-2 px-4 rounded-lg hover:bg-teal-800 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </ScrollLink>
                    );
                  } else {
                    return (
                      <RouterLink
                        key={link.to}
                        to={`/#${link.to}`}
                        onClick={() => setIsOpen(false)}
                        className="text-teal-100 dark:text-gray-200 hover:text-white dark:hover:text-white py-2 px-4 rounded-lg hover:bg-teal-800 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    {link.name}
                      </RouterLink>
                    );
                  }
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}