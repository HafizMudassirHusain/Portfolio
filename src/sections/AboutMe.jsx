import { useEffect, useRef } from 'react';
import { FiAward, FiUser, FiBriefcase, FiCode } from 'react-icons/fi';
import { FaSearch, FaPaintBrush, FaLaptopCode } from 'react-icons/fa';
import images from '../assets/perf.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef([]);
  const statsRef = useRef([]);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const bgLayer1Ref = useRef(null);
  const bgLayer2Ref = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const approachHeadingRef = useRef(null);
  const approachCardsRef = useRef([]);

  const stats = [
    { icon: <FiBriefcase />, value: 3, label: 'Years Experience', suffix: '+' },
    { icon: <FiAward />, value: 12, label: 'Projects Completed', suffix: '' },
    { icon: <FiUser />, value: 12, label: 'Happy Clients', suffix: '' }
  ];

  const approachItems = [
              {
                title: 'Discovery',
                description: 'Thorough research to understand project goals and user needs',
                icon: <FaSearch className="text-white text-4xl" />,
                color: 'bg-teal-500'
              },
              {
                title: 'Design',
                description: 'Creating intuitive interfaces with attention to detail',
                icon: <FaPaintBrush className="text-white text-4xl" />,
                color: 'bg-teal-600'
              },
              {
                title: 'Development',
                description: 'Clean, efficient code with modern best practices',
                icon: <FaLaptopCode className="text-white text-4xl" />,
                color: 'bg-teal-700'
              }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading animation from left
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Paragraphs line-by-line fade animation
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          // Split text into lines for line-by-line animation
          const words = para.textContent.split(' ');
          para.innerHTML = words.map(word => `<span class="inline-block">${word}</span>`).join(' ');
          
          const wordSpans = para.querySelectorAll('span');
          
          gsap.from(wordSpans, {
            scrollTrigger: {
              trigger: para,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
            delay: index * 0.1
          });
        }
      });

      // Stats cards - counting animation and stagger
      statsRef.current.forEach((statCard, index) => {
        if (!statCard) return;
        
        const valueElement = statCard.querySelector('h3');
        if (!valueElement) return;
        
        const stat = stats[index];
        const targetValue = stat.value;
        const suffix = stat.suffix || '';
        
        const countObj = { value: 0 };
        
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
          delay: index * 0.15,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Count up animation
            gsap.to(countObj, {
              value: targetValue,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: function() {
                const currentValue = Math.round(countObj.value);
                valueElement.textContent = `${currentValue}${suffix}`;
              }
            });
          }
        });
      });

      // Image parallax scroll effect
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -50,
          scale: 1.05,
          ease: 'none'
        });
      }

      // Background layers parallax
      if (bgLayer1Ref.current) {
        gsap.to(bgLayer1Ref.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: 30,
          rotation: 8,
          ease: 'none'
        });
      }

      if (bgLayer2Ref.current) {
        gsap.to(bgLayer2Ref.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -30,
          rotation: -8,
          ease: 'none'
        });
      }

      // Badge sliding animations
      if (badge1Ref.current) {
        gsap.from(badge1Ref.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: -100,
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3
        });
      }

      if (badge2Ref.current) {
        gsap.from(badge2Ref.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: 100,
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5
        });
      }

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
        
        const icon = card.querySelector('div > div');
        
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

        // Hover interactions
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          if (icon) {
            gsap.to(icon, {
              rotation: 360,
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          if (icon) {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
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
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
            >
              About Me
            </h2>
            <p
              ref={el => paragraphsRef.current[0] = el}
              className="text-xl mb-6 text-gray-600 dark:text-gray-300"
            >
              I'm a dedicated <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300">Full Stack Developer</span> passionate about building seamless, scalable, and impactful digital solutions.
            </p>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p ref={el => paragraphsRef.current[1] = el}>
                My journey into web and app development began during my college years, where I developed my first interactive project. Since then, I've collaborated with startups and organizations to design and develop end-to-end solutions that solve real-world problems.
              </p>
              <p ref={el => paragraphsRef.current[2] = el}>
    I specialize in the <span className="font-medium">React ecosystem, Node.js, and modern JavaScript frameworks</span>, backed by solid experience in database management and backend APIs. With a strong eye for design and user experience, I bridge the gap between front-end creativity and back-end functionality.
  </p>
              <p ref={el => paragraphsRef.current[3] = el}>
    Beyond coding, I enjoy exploring new technologies, working on side projects, and learning continuously. My problem-solving mindset allows me to craft solutions that are not only technically sound but also intuitive for users.
  </p>
              <p ref={el => paragraphsRef.current[4] = el}>
    My mission is to combine <span className="font-medium">technical expertise</span> with <span className="font-medium">creative thinking</span> to build digital experiences that inspire, engage, and deliver measurable value.
  </p>
</div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center shadow-lg border border-teal-100 dark:border-slate-700 cursor-pointer transition-all duration-500 hover:shadow-xl"
                >
                  <div className="text-teal-500 dark:text-teal-400 text-2xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">0{stat.suffix}</h3>
                  <p className="text-teal-500 dark:text-teal-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image with Badges */}
          <div ref={imageContainerRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background layers */}
              <div
                ref={bgLayer1Ref}
                className="absolute inset-0 bg-teal-600/30 dark:bg-slate-800/40 rounded-2xl rotate-6 transition-colors duration-500"
              />
              <div
                ref={bgLayer2Ref}
                className="absolute inset-0 bg-teal-600/30 dark:bg-slate-800/40 rounded-2xl -rotate-6 transition-colors duration-500"
              />

              {/* Main Image */}
              <img
                ref={imageRef}
                src={images}
                alt="Profile"
                className="relative z-10 rounded-2xl bg-teal-600/40 dark:bg-slate-800/50 w-full h-full object-cover shadow-xl transition-colors duration-500"
              />

              {/* Floating Badges */}
              <div
                ref={badge1Ref}
                className="absolute -bottom-6 -left-6 bg-teal-600 dark:bg-slate-800 p-4 rounded-lg shadow-lg z-20 max-w-xs transition-colors duration-500 border border-teal-400/20 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-full transition-colors duration-500">
                    <FiCode className="text-xl text-teal-600 dark:text-teal-400 transition-colors duration-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white dark:text-slate-100 transition-colors duration-500">Full-Stack Specialist</h4>
                    <p className="text-sm text-teal-50 dark:text-teal-300 transition-colors duration-500">3+ years experience</p>
                  </div>
                </div>
              </div>

              <div
                ref={badge2Ref}
                className="absolute -top-6 -right-6 bg-teal-700 dark:bg-slate-800 p-4 rounded-lg shadow-lg z-20 max-w-xs transition-colors duration-500 border border-teal-400/20 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-full transition-colors duration-500">
                    <FiUser className="text-xl text-teal-500 dark:text-teal-400 transition-colors duration-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white dark:text-slate-100 transition-colors duration-500">UI/UX Focus</h4>
                    <p className="text-sm text-teal-50 dark:text-teal-300 transition-colors duration-500">User-centered design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approach Section */}
        <div className="mt-16">
          <h3
            ref={approachHeadingRef}
            className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
          >
            My Approach
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approachItems.map((item, index) => (
              <div
                key={index}
                ref={el => approachCardsRef.current[index] = el}
                className={`${item.color} dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-all duration-500 cursor-pointer hover:shadow-xl border border-transparent dark:border-slate-700`}
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                <p className="text-teal-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
