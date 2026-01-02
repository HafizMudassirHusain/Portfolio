import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const carouselRef = useRef(null);
  const starsRef = useRef([]);
  const contentRef = useRef(null);
  const clientInfoRef = useRef(null);
  const dotsRef = useRef([]);
  const navButtonsRef = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.8,
          y: -20,
          duration: 0.6,
          ease: 'back.out(1.7)'
        });
      }

      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });

      // Subheading animation
      gsap.from(subheadingRef.current, {
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });

      // Carousel container
      if (carouselRef.current) {
        gsap.from(carouselRef.current, {
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Animate testimonial content
      const animateTestimonial = () => {
        // Stars stagger
        starsRef.current.forEach((star, index) => {
          if (!star) return;
          gsap.from(star, {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          });
        });

        // Content fade in
        if (contentRef.current) {
          gsap.from(contentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out'
          });
        }

        // Client info slide up
        if (clientInfoRef.current) {
          gsap.from(clientInfoRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.6,
            delay: 0.5,
            ease: 'power3.out'
          });
        }
      };

      animateTestimonial();

      // Dots animation
      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;
        
        dot.addEventListener('mouseenter', () => {
          gsap.to(dot, {
            scale: 1.3,
            duration: 0.2,
            ease: 'power2.out'
          });
        });

        dot.addEventListener('mouseleave', () => {
          gsap.to(dot, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
      });

      // Navigation buttons
      navButtonsRef.current.forEach((button) => {
        if (!button) return;
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            rotation: 5,
            duration: 0.2,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex]);

  const paginate = (direction) => {
    const newIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    
    // Re-animate stars and content
    starsRef.current = [];
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: direction > 0 ? 50 : -50,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden transition-colors duration-500"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-teal-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-cyan-300 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            ref={badgeRef}
            className="inline-block py-2 px-4 mb-4 text-sm font-semibold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 rounded-full"
          >
            TESTIMONIALS
          </span>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              Client Feedback
            </span>
          </h2>
          <p
            ref={subheadingRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Don't just take my word for it - here's what clients and colleagues say about working with me.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows - Desktop */}
          {!isMobile && (
            <>
              <button
                ref={el => navButtonsRef.current[0] = el}
                onClick={() => paginate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 transition-all duration-500"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft size={24} />
              </button>
              
              <button
                ref={el => navButtonsRef.current[1] = el}
                onClick={() => paginate(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 transition-all duration-500"
                aria-label="Next testimonial"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <div className="relative h-[500px] md:h-[400px]">
            <div className={`bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 transition-colors duration-500 ${isMobile ? 'w-full' : 'w-11/12 max-w-3xl mx-auto'}`}>
              {/* Rating Stars */}
              <div className="flex mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    ref={el => starsRef.current[i] = el}
                    className={`${i < testimonials[currentIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'} w-6 h-6 mx-1`}
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p
                ref={contentRef}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center italic leading-relaxed"
              >
                "{testimonials[currentIndex].content}"
              </p>

              {/* Client Info */}
              <div ref={clientInfoRef} className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-teal-100 dark:border-slate-700 shadow-md transition-colors duration-500"
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
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                ref={el => dotsRef.current[index] = el}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-teal-600 w-8' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {isMobile && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => paginate(-1)}
                className="px-6 py-3 rounded-xl bg-teal-600 dark:bg-teal-700 text-white shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors flex items-center gap-2"
              >
                <FiChevronLeft size={18} />
                Previous
              </button>
              <button
                onClick={() => paginate(1)}
                className="px-6 py-3 rounded-xl bg-teal-600 dark:bg-teal-700 text-white shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors flex items-center gap-2"
              >
                Next
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
