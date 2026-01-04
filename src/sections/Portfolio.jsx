import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import ProjectModal from './ProjectModal';
import img1 from '../assets/ecom.png';
import img2 from '../assets/kitchen.png';
import img3 from '../assets/tazQ.png';
import img4 from '../assets/port.png';
import img5 from '../assets/fahracity.png';
import img6 from '../assets/advantureweb.png';

/* =======================
   PROJECT DATA
======================= */

const projects = [
  {
    id: 1,
    title: 'Agencies Web App',
    tags: ['React', 'Firebase'],
    image: img3,
    description: 'A comprehensive task tracking application with real-time updates, user authentication, and seamless collaboration features.',
    link: 'https://www.tazqsolutions.com/',
    github: 'https://github.com/HafizMudassirHusain/TazqFrontend'
  },
  {
    id: 2,
    title: 'Tech Company Platform',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    image: img5,
    description: 'A modern tech company website built with Next.js for optimal performance, featuring server-side rendering and dynamic content management.',
    link: 'https://fahracity-updated.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/faracity'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: img1,
    description: 'Full-featured online store with secure payment integration, shopping cart functionality, and comprehensive product management.',
    link: 'https://furniro1.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/Furniro'
  },
  {
    id: 4,
    title: 'Restaurant Website',
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    image: img2,
    description: 'A modern, responsive restaurant website showcasing menu items, reservations, and an elegant dining experience presentation.',
    link: 'https://al-frontend-eight.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/AL-Frontend'
  },
  {
    id: 5,
    title: 'Portfolio 2.0',
    tags: ['React', 'Firebase'],
    image: img4,
    description: 'A second version portfolio showcasing advanced animations, SEO best practices, and modern web development techniques.',
    link: 'https://hafizmudassirhusain.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/orgnlwhiteport'
  },
  {
    id: 6,
    title: 'Adventure Travel Site',
    tags: ['React', 'GSAP'],
    image: img6,
    description: 'A visually rich adventure travel website with immersive parallax scroll effects and stunning visual storytelling.',
    link: 'https://adventureguidence.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/SecAdvantureweb'
  },
];

/* =======================
   PROJECT PREVIEW COMPONENT
======================= */

function ProjectPreview({ project, isActive }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-950/50 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/95 to-transparent z-20">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =======================
   PROJECT ITEM COMPONENT
======================= */

function ProjectItem({ project, index, isActive, onInView }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: '-40% 0px -40% 0px',
    once: false,
  });

  useEffect(() => {
    if (isInView && onInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`min-h-[70vh] flex flex-col justify-center py-12 lg:py-20 px-6 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div className="max-w-2xl">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {project.title}
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-sm font-medium rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors duration-200"
          >
            <FiExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium transition-colors duration-200"
          >
            <FiGithub className="w-4 h-4" />
            View Code
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =======================
   MAIN PORTFOLIO COMPONENT
======================= */

export default function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const previewContainerRef = useRef(null);

  const handleProjectInView = (index) => {
    setActiveProjectIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 md:py-32 transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-slate-800 rounded-full">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A collection of my recent work showcasing different technologies and design approaches.
          </p>
        </motion.div>

        {/* Desktop Split Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          {/* LEFT COLUMN - Scrollable Projects List */}
          <div className="relative">
            <div className="space-y-0">
              {projects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={activeProjectIndex === index}
                  onInView={handleProjectInView}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Preview */}
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <div ref={previewContainerRef} className="relative w-full h-full">
              {projects.map((project, index) => (
                <ProjectPreview
                  key={project.id}
                  project={project}
                  isActive={activeProjectIndex === index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Compact Grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-snug">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Live</span>
                    <span className="sm:hidden">Demo</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white transition-colors duration-200"
                  >
                    <FiGithub className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Code</span>
                    <span className="sm:hidden">Git</span>
                  </a>
                </div>
              </div>
            </motion.div>
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
