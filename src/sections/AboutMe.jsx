import { useEffect, useRef } from 'react';
import { FiAward, FiUser, FiBriefcase, FiCode, FiTarget, FiLayers, FiClock, FiCheckCircle, FiBook } from 'react-icons/fi';
import { FaSearch, FaPaintBrush, FaLaptopCode, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef([]);
  const statsRef = useRef([]);
  const approachHeadingRef = useRef(null);
  const approachCardsRef = useRef([]);
  const highlightRef = useRef(null);

  const stats = [
    { icon: <FiBriefcase />, value: 3, label: 'Years Experience', suffix: '+' },
    { icon: <FiAward />, value: 12, label: 'Projects Completed', suffix: '+' },
    { icon: <FiUser />, value: 12, label: 'Happy Clients', suffix: '+' },
    { icon: <FiCheckCircle />, value: 100, label: 'Success Rate', suffix: '%' }
  ];

  const approachItems = [
    {
      title: 'Discover',
      description: 'Research project goals and user needs',
      icon: <FaSearch />
    },
    {
      title: 'Design',
      description: 'Create intuitive interfaces with attention to detail',
      icon: <FaPaintBrush />
    },
    {
      title: 'Develop',
      description: 'Write clean, efficient code with best practices',
      icon: <FaLaptopCode />
    },
    {
      title: 'Deliver',
      description: 'Deploy and support for optimal performance',
      icon: <FaRocket />
    }
  ];

  const coreValues = [
    {
      icon: <FiTarget />,
      title: 'Goal-Oriented',
      description: 'Clear objectives, measurable results'
    },
    {
      icon: <FiCode />,
      title: 'Quality Code',
      description: 'Clean, maintainable, scalable'
    },
    {
      icon: <FiLayers />,
      title: 'Full-Stack',
      description: 'End-to-end solutions'
    },
    {
      icon: <FiBook />,
      title: 'BSCS Graduate',
      description: 'Strong CS foundation'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section entrance
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });

      // Main heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -40,
        duration: 1,
        ease: 'power3.out'
      });

      // Paragraphs animation
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.from(para, {
            scrollTrigger: {
              trigger: para,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out'
          });
        }
      });

      // Stats cards animation
      statsRef.current.forEach((statCard, index) => {
        if (!statCard) return;
        
        const valueElement = statCard.querySelector('.stat-value');
        const stat = stats[index];
        
        gsap.from(statCard, {
          scrollTrigger: {
            trigger: statCard,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.8,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Count up animation
            if (valueElement) {
              const countObj = { value: 0 };
              gsap.to(countObj, {
                value: stat.value,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function() {
                  const currentValue = Math.round(countObj.value);
                  valueElement.textContent = `${currentValue}${stat.suffix}`;
                }
              });
            }
          }
        });
      });

      // Approach section heading
      if (approachHeadingRef.current) {
        gsap.from(approachHeadingRef.current, {
          scrollTrigger: {
            trigger: approachHeadingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Approach cards staggered entrance
      approachCardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'back.out(1.7)'
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-500"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-20">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
          >
            About Me
          </h2>
          <div ref={highlightRef} className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Full-Stack Developer with BSCS background, crafting digital solutions with precision
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Introduction */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p ref={el => paragraphsRef.current[0] = el} className="text-lg text-gray-600 dark:text-gray-300">
                Passionate <span className="font-semibold text-teal-600 dark:text-teal-400">Full Stack Developer</span> with a <span className="font-semibold text-teal-600 dark:text-teal-400">BSCS degree</span> and 3+ years building modern web applications.
              </p>
              
              <p ref={el => paragraphsRef.current[1] = el} className="text-lg text-gray-600 dark:text-gray-300">
                My computer science foundation enables me to build scalable, efficient solutions that solve real-world problems.
              </p>

              <p ref={el => paragraphsRef.current[2] = el} className="text-lg text-gray-600 dark:text-gray-300">
                I blend <span className="font-medium text-teal-600 dark:text-teal-400">technical expertise</span> with <span className="font-medium text-teal-600 dark:text-teal-400">creative problem-solving</span> to deliver exceptional results.
              </p>
            </div>

            {/* Core Values - Now includes Education */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                My Strengths
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-teal-100 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${value.title === 'BSCS Graduate' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-teal-100 dark:bg-teal-900/30'}`}>
                        <div className={`${value.title === 'BSCS Graduate' ? 'text-blue-600 dark:text-blue-400' : 'text-teal-600 dark:text-teal-400'}`}>
                          {value.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {value.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Education */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Experience
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    ref={el => statsRef.current[index] = el}
                    className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md border border-teal-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-500 text-white">
                        {stat.icon}
                      </div>
                      <div>
                        <h3 className="stat-value text-2xl font-bold text-gray-800 dark:text-gray-200">
                          0{stat.suffix}
                        </h3>
                        <p className="text-teal-600 dark:text-teal-400 font-medium text-sm">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-teal-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <FaGraduationCap className="text-xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Education
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Bachelor of Science in Computer Science (BSCS)
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      Graduated
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Strong foundation in algorithms, data structures, software engineering, and web technologies.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-800 dark:text-white">Key Focus:</span> Web Development, Database Systems, Software Architecture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3
              ref={approachHeadingRef}
              className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
            >
              My Process
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              4-step approach to building great products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {approachItems.map((item, index) => (
              <div
                key={index}
                ref={el => approachCardsRef.current[index] = el}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-teal-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                    <div className="text-xl text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <span className="text-teal-600 dark:text-teal-400 font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Closing Note */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
            <p className="text-gray-600 dark:text-gray-300">
              Combining <span className="font-medium text-teal-600 dark:text-teal-400">academic knowledge</span> with <span className="font-medium text-teal-600 dark:text-teal-400">practical experience</span> to build better software
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}