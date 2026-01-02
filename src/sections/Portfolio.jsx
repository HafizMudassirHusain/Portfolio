import { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';
import img1 from '../assets/ecom.png';
import img2 from '../assets/kitchen.png';
import img3 from '../assets/tazQ.png';
import img4 from '../assets/port.png';
import img5 from '../assets/fahracity.png';
import img6 from '../assets/advantureweb.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Agencies Web App',
    tags: ['React', 'Firebase'],
    image: img3,
    description: 'A task tracking app with real-time updates and user authentication.',
    link: 'https://www.tazqsolutions.com/',
    github: 'https://github.com/HafizMudassirHusain/TazqFrontend'
  },
  {
    id: 2,
    title: 'Tech Company',
    tags: ['Next', 'Tailwind','Node.js', 'MongoDB'],
    image: img5,
    description: 'A Tech Company website built with Next.js, Tailwind CSS, Node.js, and MongoDB.',
    link: 'https://fahracity-updated.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/faracity'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: img1,
    description: 'Full-featured online store with payment integration',
    link: 'https://furniro1.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/Furniro'
  },
  {
    id: 4,
    title: 'Restuarent Website',
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    image: img2,
    description: 'A modern, responsive portfolio website to showcase projects and blogs.',
    link: 'https://al-frontend-eight.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/AL-Frontend'
  },
  {
    id: 5,
    title: 'Portfolio 2.0',
    tags: ['React', 'Firebase'],
    image: img4,
    description: 'A second version portfolio showcasing animation and SEO practices.',
    link: 'https://hafizmudassirhusain.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/orgnlwhiteport'
  },
  {
    id: 6,
    title: 'Adventure Travel Site',
    tags: ['React', 'GSAP'],
    image: img6,
    description: 'A visually rich adventure site with parallax scroll effects.',
    link: 'https://adventureguidence.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/SecAdvantureweb'
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const filterButtonsRef = useRef([]);
  const projectCardsRef = useRef([]);
  const projectImagesRef = useRef([]);
  
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

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

      // Filter buttons stagger
      gsap.from(filterButtonsRef.current, {
        scrollTrigger: {
          trigger: filterButtonsRef.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      });

      // Animate projects
      const animateProjects = () => {
        projectCardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            rotation: 2,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
          });

          // Parallax effect for images
          const image = projectImagesRef.current[index];
          if (image) {
            gsap.to(image, {
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              },
              y: -30,
              scale: 1.1,
              ease: 'none'
            });
          }

          // Hover effects
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            if (image) {
              gsap.to(image, {
                scale: 1.15,
                duration: 0.3,
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
            
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
        });
      };

      animateProjects();

      // Filter button hover effects
      filterButtonsRef.current.forEach((button) => {
        if (!button) return;
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleFilterChange = (tag) => {
    setActiveFilter(tag);
    // Reset refs for re-animation
    projectCardsRef.current = [];
    projectImagesRef.current = [];
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            ref={badgeRef}
            className="inline-block py-1 px-3 mb-3 md:mb-4 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-slate-800 rounded-full transition-colors duration-500"
          >
            PORTFOLIO
          </span>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Projects</span>
          </h2>
          <p
            ref={subheadingRef}
            className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 px-4"
          >
            A collection of my recent work showcasing different technologies and design approaches.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {allTags.map((tag, index) => (
            <button
              key={tag}
              ref={el => filterButtonsRef.current[index] = el}
              onClick={() => handleFilterChange(tag)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md md:shadow-lg shadow-cyan-500/20 dark:shadow-teal-500/30'
                  : 'text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectCardsRef.current[index] = el}
              className="group relative overflow-hidden rounded-lg md:rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100 dark:border-slate-700"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 md:h-60 overflow-hidden">
                <img
                  ref={el => projectImagesRef.current[index] = el}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                  <div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs md:text-sm mb-2">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Live Demo
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-white hover:bg-gray-700"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View More Button */}
              <button
                onClick={() => setSelectedProject(project)}
                className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm md:shadow-md hover:bg-white dark:hover:bg-gray-700"
                aria-label="View project details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
