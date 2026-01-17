import { useEffect, useRef, useState } from 'react';
import myImage from '../assets/perf.png';
import { FiCode, FiUser, FiDownload, FiArrowRight, FiBriefcase, FiAward, FiStar } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';
import cvFile from '../assets/backendCv.pdf';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const techBadgesRef = useRef([]);
  const statsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const typedTextRef = useRef(null);
  
  // State for typing animation
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  // Refs to track state for typing animation
  const typingStateRef = useRef({
    currentRoleIndex: 0,
    currentText: '',
    isDeleting: false,
    isPaused: false
  });

  const roles = [
    "Full-Stack Developer",
    "Problem Solver",
    "BSCS Graduate",
  ];

  const techStack = [
    { icon: <FaReact />, name: 'React', color: 'text-cyan-400' },
    { icon: <FaNodeJs />, name: 'Node.js', color: 'text-green-500' },
    { icon: <SiTypescript />, name: 'TypeScript', color: 'text-blue-500' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: 'text-teal-400' },
    { icon: <FaDatabase />, name: 'MongoDB', color: 'text-emerald-500' }
  ];

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '12+', label: 'Projects' },
    { value: '100%', label: 'Success Rate' }
  ];

  // Typing animation effect
  useEffect(() => {
    let timeout;
    let isMounted = true;
    
    const type = () => {
      if (!isMounted) return;
      
      // Get current state from refs
      const state = typingStateRef.current;
      const currentRole = roles[state.currentRoleIndex];
      
      // If paused, wait then continue
      if (state.isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false);
          typingStateRef.current.isPaused = false;
          type();
        }, 1500);
        return;
      }
      
      // If deleting
      if (state.isDeleting) {
        const newText = state.currentText.substring(0, state.currentText.length - 1);
        
        if (newText.length === 0) {
          // Finished deleting, move to next role
          const nextIndex = (state.currentRoleIndex + 1) % roles.length;
          setCurrentRoleIndex(nextIndex);
          typingStateRef.current.currentRoleIndex = nextIndex;
          typingStateRef.current.currentText = '';
          setCurrentText('');
          timeout = setTimeout(() => {
            setIsDeleting(false);
            setIsPaused(false);
            typingStateRef.current.isDeleting = false;
            typingStateRef.current.isPaused = false;
            type();
          }, 500);
        } else {
          // Continue deleting
          setCurrentText(newText);
          typingStateRef.current.currentText = newText;
          timeout = setTimeout(type, 50);
        }
      } else {
        // Typing
        const newText = currentRole.substring(0, state.currentText.length + 1);
        
        if (newText.length === currentRole.length) {
          // Finished typing, pause then delete
          setCurrentText(newText);
          typingStateRef.current.currentText = newText;
          setIsPaused(true);
          typingStateRef.current.isPaused = true;
          timeout = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
            typingStateRef.current.isPaused = false;
            typingStateRef.current.isDeleting = true;
            type();
          }, 2000);
        } else {
          // Continue typing
          setCurrentText(newText);
          typingStateRef.current.currentText = newText;
          timeout = setTimeout(type, 100);
        }
      }
    };
    
    // Initialize refs
    typingStateRef.current = {
      currentRoleIndex: 0,
      currentText: '',
      isDeleting: false,
      isPaused: false
    };
    
    // Start typing animation
    timeout = setTimeout(type, 200);
    
    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // Function to handle CV download
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = cvFile;
      link.download = 'HafizMudassir_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Add download animation
      const button = document.querySelector('.download-btn');
      gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  // Animations
  useEffect(() => {
    // Mouse move tilt effect
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(imageRef.current, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Parallax effect for tech badges
      techBadgesRef.current.forEach((badge, index) => {
        if (badge) {
          const speed = 0.05 * (index + 1);
          gsap.to(badge, {
            x: x * 20 * speed,
            y: y * 20 * speed,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      gsap.to(imageRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      techBadgesRef.current.forEach((badge) => {
        if (badge) {
          gsap.to(badge, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    };

    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background elements
      tl.from('.bg-blur-1', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5
      })
      .from('.bg-blur-2', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5
      }, '-=1.2');

      // Content animations
      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1
      }, '-=0.5')
      .from(subheadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.7')
      .from('.typing-container', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.6')
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.4')
      .from('.stats-container', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.3');

      // Image and badges animations
      tl.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        x: 50,
        rotationY: 20,
        duration: 1.2
      }, '-=0.8');

      // Tech badges staggered entrance
      techBadgesRef.current.forEach((badge, index) => {
        if (badge) {
          tl.from(badge, {
            opacity: 0,
            scale: 0,
            y: 30,
            rotation: 180,
            duration: 0.6,
            delay: index * 0.1
          }, '-=0.5');
        }
      });

      // Stats counting animation
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const valueElement = stat.querySelector('.stat-value');
          const targetValue = stats[index].value;
          
          if (valueElement && targetValue.includes('+') || targetValue.includes('%')) {
            const numValue = parseInt(targetValue) || 100;
            const countObj = { value: 0 };
            
            tl.to(countObj, {
              value: numValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const currentValue = Math.round(countObj.value);
                valueElement.textContent = `${currentValue}${targetValue.includes('+') ? '+' : '%'}`;
              }
            }, index * 0.1);
          }
        }
      });

      // Floating animation for tech badges
      techBadgesRef.current.forEach((badge, index) => {
        if (badge) {
          gsap.to(badge, {
            y: '+=10',
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.2
          });
        }
      });

      // Scroll indicator animation
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // Add mouse event listeners
      const container = imageContainerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      // CTA button hover effect
      const ctaButton = ctaRef.current?.querySelector('button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)',
            duration: 0.3
          });
        });

        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            boxShadow: '0 10px 20px rgba(5, 150, 105, 0.2)',
            duration: 0.3
          });
        });
      }

    }, heroRef);

    return () => {
      ctx.revert();
      const container = imageContainerRef.current;
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-700/20 rounded-full blur-3xl animate-pulse bg-blur-1"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000 bg-blur-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-teal-600/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700/30 backdrop-blur-sm rounded-full border border-teal-500/30">
              <FiStar className="text-yellow-400" />
              <span className="text-sm font-medium">Full-Stack Developer</span>
            </div>

            {/* Main Heading */}
            <h1 
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-100">
                Mudassir
              </span>
            </h1>

            {/* Subheading with typing animation */}
            <div className="space-y-4 typing-container">
              <p 
                ref={subheadingRef}
                className="text-xl sm:text-2xl text-teal-100 dark:text-teal-200"
              >
                I create exceptional digital experiences
              </p>
              
              {/* Typing animation container */}
              <div className="h-12 lg:h-14 flex items-center justify-center lg:justify-start">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
                    {currentText}
                  </span>
                  <span className="typing-cursor ml-1 bg-teal-400 w-[3px] h-[1.2em] inline-block animate-pulse"></span>
                </div>
              </div>
              
              {/* Roles indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                {roles.map((role, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                      index === currentRoleIndex
                        ? 'bg-teal-500/30 border border-teal-400/50 text-white'
                        : 'bg-white/5 border border-white/10 text-teal-200/70'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-teal-50/90 dark:text-teal-100/90 max-w-lg">
              BSCS graduate with 3+ years of experience building scalable web applications. 
              Passionate about clean code, user-centric design, and solving complex problems.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
            onClick={handleDownload}
                className="download-btn group px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiDownload className="text-lg" />
                Download CV
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="#projects"
                className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiBriefcase />
                View Projects
              </a>
            </div>

            {/* Stats */}
            <div className="stats-container grid grid-cols-3 gap-4 pt-8 max-w-md">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  ref={el => statsRef.current[index] = el}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="stat-value text-2xl sm:text-3xl font-bold text-white mb-1">
                    0{stat.value.includes('%') ? '%' : '+'}
                  </div>
                  <div className="text-sm text-teal-200/80">{stat.label}</div>
                </div>
            ))}
          </div>
          </div>

          {/* Right Content - Image & Tech Stack */}
          <div className="relative">
            <div ref={imageContainerRef} className="relative mx-auto lg:mx-0 max-w-md lg:max-w-lg">
              {/* Main Image Container */}
              <div className="relative">
                {/* Floating tech badges */}
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    ref={el => techBadgesRef.current[index] = el}
                    className={`absolute z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center ${tech.color} text-xl shadow-lg`}
                    style={{
                      top: `${10 + (index * 15)}%`,
                      left: index % 2 === 0 ? '-5%' : 'auto',
                      right: index % 2 !== 0 ? '-5%' : 'auto'
                    }}
                    title={tech.name}
                  >
                    {tech.icon}
                  </div>
                ))}

          {/* Image Container */}
                <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    ref={imageRef}
                    src={myImage}
                    alt="Mudassir - Full Stack Developer"
                    className="w-full h-full object-cover transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 blur-xl opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 blur-xl opacity-50"></div>
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-6 -right-6 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 max-w-[200px] shadow-2xl">
              <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600">
                    <FiAward className="text-white text-xl" />
                </div>
                <div>
                    <h4 className="font-bold text-white">Expert Developer</h4>
                    <p className="text-sm text-teal-200/80">BSCS · 3+ Years</p>
                  </div>
                </div>
                </div>
              </div>

            {/* Tech stack labels */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3">
              {techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <span className={tech.color}>{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
                </div>
                </div>
              </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-sm text-teal-200/80 animate-pulse">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-teal-400/50 flex justify-center">
            <div className="w-1 h-3 bg-teal-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Add custom styles for typing cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .typing-cursor {
          animation: blink 1s infinite;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes deleting {
          from { width: 100%; }
          to { width: 0; }
        }
      `}</style>
    </div>
  );
}