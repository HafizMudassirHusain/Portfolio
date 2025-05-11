import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechSolutions',
      content: 'Working with this developer was an absolute pleasure. Their attention to detail and problem-solving skills helped us deliver our product ahead of schedule. The code quality was exceptional and their communication was top-notch.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCo',
      content: 'One of the most talented developers I\'ve worked with. They took our complex requirements and turned them into an elegant solution that exceeded our expectations. Would definitely hire again!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer, DigitalAgency',
      content: 'Their frontend skills are incredible. They implemented our designs pixel-perfectly while suggesting technical improvements we hadn\'t considered. A true collaborator who cares about the end product.',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'CTO, StartupHub',
      content: 'We hired them for a critical project when we were short on time. Not only did they deliver excellent work, but they also mentored our junior developers along the way. Outstanding professional.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ];

  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const paginate = (newDirection) => {
    setCurrentIndex([(currentIndex + newDirection + testimonials.length) % testimonials.length, newDirection]);
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: isMobile ? 0 : direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: isMobile ? 0 : direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-teal-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-cyan-300 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px" }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block py-2 px-4 mb-4 text-sm font-semibold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 rounded-full">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              Client Feedback
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take my word for it - here's what clients and colleagues say about working with me.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows - Desktop */}
          {!isMobile && (
            <>
              <motion.button 
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 transition-all"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft size={24} />
              </motion.button>
              
              <motion.button 
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 transition-all"
                aria-label="Next testimonial"
              >
                <FiChevronRight size={24} />
              </motion.button>
            </>
          )}

          {/* Testimonial Cards */}
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center px-4"
              >
                <div className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 ${isMobile ? 'w-full' : 'w-11/12 max-w-3xl'}`}>
                  {/* Rating Stars */}
                  <div className="flex mb-6 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`${i < testimonials[currentIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'} w-6 h-6 mx-1`} 
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <motion.p 
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center italic leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.p>

                  {/* Client Info */}
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-teal-100 dark:border-gray-700 shadow-md"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-teal-600 dark:text-teal-400">{testimonials[currentIndex].role}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const direction = index > currentIndex ? 1 : -1;
                  setCurrentIndex([index, direction]);
                }}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-teal-600 w-8' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {isMobile && (
            <div className="flex justify-center gap-4 mt-8">
              <motion.button 
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <FiChevronLeft size={18} />
                Previous
              </motion.button>
              <motion.button 
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                Next
                <FiChevronRight size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}