import { useEffect, useRef } from 'react';
import myImage from '../assets/perf.png';
import { FiCode, FiUser, FiDownload } from 'react-icons/fi';
import bg from '../assets/bg.png';
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
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const bgLayer1Ref = useRef(null);
  const bgLayer2Ref = useRef(null);
  const ctaButtonRef = useRef(null);
  const shineRef = useRef(null);

  // Function to handle the download
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = cvFile;
      link.download = 'HafizMudassir_Cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('CV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again later.');
    }
  };

  // Initial page load animations
  useEffect(() => {
    // Mouse move tilt effect handlers (defined outside gsap context for cleanup)
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(imageRef.current, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
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
    };

    const ctx = gsap.context(() => {
      // Staggered text animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1
      })
      .from(subheadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.5')
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.4');

      // Image animation from right with scale and rotation
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
        rotation: 5,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Background layers animation
      gsap.from([bgLayer1Ref.current, bgLayer2Ref.current], {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5
      });

      // Badge animations
      gsap.from(badge1Ref.current, {
        opacity: 0,
        x: -30,
        y: 30,
        scale: 0.8,
        duration: 0.8,
        delay: 0.8
      });

      gsap.from(badge2Ref.current, {
        opacity: 0,
        x: 30,
        y: -30,
        scale: 0.8,
        duration: 0.8,
        delay: 1
      });

      // Floating animation for badges using timeline
      const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      floatTimeline
        .to(badge1Ref.current, {
          y: '+=15',
          duration: 2,
          ease: 'power1.inOut'
        })
        .to(badge2Ref.current, {
          y: '+=15',
          duration: 2.2,
          ease: 'power1.inOut'
        }, '-=1.8');

      // Add mouse event listeners
      const imageContainer = imageContainerRef.current;
      if (imageContainer) {
        imageContainer.addEventListener('mousemove', handleMouseMove);
        imageContainer.addEventListener('mouseleave', handleMouseLeave);
      }

      // Parallax for background layers
      gsap.to(bgLayer1Ref.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 50,
        rotation: 8
      });

      gsap.to(bgLayer2Ref.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: -50,
        rotation: -8
      });

      // CTA button shine effect
      const shineTimeline = gsap.timeline({ paused: true });
      shineTimeline.to(shineRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'power2.inOut'
      });

      const ctaButton = ctaButtonRef.current;
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
          shineTimeline.restart();
        });

        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }

      // Badge hover animations
      const setupBadgeHover = (badge, icon) => {
        if (!badge) return;
        
        badge.addEventListener('mouseenter', () => {
          gsap.to(badge, {
            y: '-=10',
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            duration: 0.3,
            ease: 'power2.out'
          });
          if (icon) {
            gsap.to(icon, {
              rotation: 360,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        });

        badge.addEventListener('mouseleave', () => {
          gsap.to(badge, {
            y: '+=10',
            scale: 1,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
          if (icon) {
            gsap.to(icon, {
              rotation: 0,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        });
      };

      const badge1Icon = badge1Ref.current?.querySelector('svg');
      const badge2Icon = badge2Ref.current?.querySelector('svg');
      setupBadgeHover(badge1Ref.current, badge1Icon);
      setupBadgeHover(badge2Ref.current, badge2Icon);

    }, heroRef);

    return () => {
      ctx.revert();
      // Clean up mouse event listeners
      const imageContainer = imageContainerRef.current;
      if (imageContainer) {
        imageContainer.removeEventListener('mousemove', handleMouseMove);
        imageContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen flex items-center bg-teal-500 dark:bg-slate-900 text-white overflow-hidden transition-colors duration-500">
      {/* Soft Texture Overlay */}
      <div className={`absolute inset-0 bg-[url(${bg})] opacity-10 dark:opacity-5 pointer-events-none transition-opacity duration-500`}></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div>
          <h1 ref={headingRef} className="text-5xl font-bold mb-4 text-white dark:text-slate-100 transition-colors duration-500">
            Welcome to My Portfolio
          </h1>
          <p ref={subheadingRef} className="text-xl mb-8 text-teal-50 dark:text-teal-300 transition-colors duration-500">
            Crafting immersive digital experiences
          </p>

          <div ref={ctaRef} className="relative inline-block overflow-hidden">
            <button
              ref={ctaButtonRef}
            onClick={handleDownload}
              className="relative px-8 py-3 rounded-lg bg-teal-600 dark:bg-teal-700 hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 text-white font-medium shadow-lg flex items-center gap-2 overflow-hidden"
          >
              <span className="relative z-10 flex items-center gap-2">
            <FiDownload /> Download CV
              </span>
              <span
                ref={shineRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                style={{ transform: 'skewX(-20deg)' }}
              />
            </button>
          </div>
          </div>

        {/* Right Section - Image with AboutMe-style treatment */}
        <div ref={imageContainerRef} className="relative w-full flex justify-center">
          {/* Image Container */}
          <div className="relative aspect-square max-w-md">
            {/* Background layers */}
            <div
              ref={bgLayer1Ref}
              className="absolute inset-0 bg-teal-600/20 dark:bg-slate-800/40 rounded-2xl rotate-6 transition-colors duration-500"
            />
            <div
              ref={bgLayer2Ref}
              className="absolute inset-0 bg-teal-600/20 dark:bg-slate-800/40 rounded-2xl -rotate-6 transition-colors duration-500"
            />

            {/* Main Image */}
            <img
              ref={imageRef}
              src={myImage}
              alt="Profile"
              className="relative z-10 bg-teal-600/20 dark:bg-slate-800/50 rounded-2xl w-full h-full object-cover shadow-xl transition-colors duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Floating Badges */}
            <div
              ref={badge1Ref}
              className="absolute -bottom-6 -left-6 bg-teal-600 dark:bg-slate-800 p-4 rounded-lg shadow-lg z-20 max-w-xs cursor-pointer transition-colors duration-500 border border-teal-400/20 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-full transition-colors duration-500">
                  <FiCode className="text-xl text-teal-600 dark:text-teal-400 transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white dark:text-slate-100 transition-colors duration-500">Full-Stack Expert</h4>
                  <p className="text-sm text-teal-50 dark:text-teal-300 transition-colors duration-500">3+ years experience</p>
                </div>
                </div>
              </div>

            <div
              ref={badge2Ref}
              className="absolute -top-6 -right-6 bg-teal-600 dark:bg-slate-800 p-4 rounded-lg shadow-lg z-20 max-w-xs cursor-pointer transition-colors duration-500 border border-teal-400/20 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-full transition-colors duration-500">
                  <FiUser className="text-xl text-teal-600 dark:text-teal-400 transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white dark:text-slate-100 transition-colors duration-500">UI/UX Designer</h4>
                  <p className="text-sm text-teal-50 dark:text-teal-300 transition-colors duration-500">User-first approach</p>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
