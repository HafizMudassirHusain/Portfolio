import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useState } from 'react';

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

  const paginate = (newDirection) => {
    setCurrentIndex([(currentIndex + newDirection + testimonials.length) % testimonials.length, newDirection]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    })
  };

  const centerCardVariants = {
    normal: { scale: 1, zIndex: 1 },
    center: { 
      scale: 1.1, 
      zIndex: 2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 bg-gradient-to-b from-white to-teal-50 overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it - here's what clients and colleagues say about working with me.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto h-[500px]">
          {/* Navigation Arrows */}
          <motion.button 
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 rounded-full bg-white shadow-lg text-teal-600 hover:bg-teal-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 rounded-full bg-white shadow-lg text-teal-600 hover:bg-teal-100 transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </motion.button>

          {/* Animated Testimonial Cards */}
          <div className="relative w-full h-full">
            <AnimatePresence custom={direction} initial={false}>
              {[
                testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
                testimonials[currentIndex],
                testimonials[(currentIndex + 1) % testimonials.length]
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  custom={direction * (index - 1)}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`absolute top-0 w-full max-w-md ${index === 1 ? 'left-1/2 -translate-x-1/2' : 
                    index === 0 ? 'left-0' : 'right-0'}`}
                  style={{
                    originX: index === 1 ? 0.5 : index === 0 ? 0 : 1
                  }}
                >
                  <motion.div
                    variants={centerCardVariants}
                    animate={index === 1 ? "center" : "normal"}
                    className={`bg-white p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-xl ${
                      index === 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                    }`}
                    onClick={() => index !== 1 && paginate(index === 0 ? -1 : 1)}
                  >
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2 }}
                        >
                          <FiStar 
                            className={`${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} w-5 h-5`} 
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <motion.p 
                      className="text-gray-600 mb-6 italic"
                      whileHover={{ scale: index === 1 ? 1.02 : 1 }}
                    >
                      "{testimonial.content}"
                    </motion.p>

                    {/* Client Info */}
                    <div className="flex items-center">
                      <motion.img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-teal-200"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-teal-600">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div 
                      className="absolute top-4 right-4 text-teal-100 text-6xl font-serif z-0 select-none"
                      whileHover={{ scale: 1.2 }}
                    >
                      "
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <motion.div 
            className="flex justify-center mt-12 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  const direction = index > currentIndex ? 1 : -1;
                  setCurrentIndex([index, direction]);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-teal-600' : 'bg-teal-200'}`}
                animate={{
                  width: currentIndex === index ? 24 : 12
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}